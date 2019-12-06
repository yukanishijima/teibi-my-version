import React, { Component } from 'react'
import UserStatus from '../userStatus';
import L from 'leaflet';
import Locate from "leaflet.locatecontrol";
import { myTheme } from '../../utils/myTheme';
import './style.css'

// initialize socket
import { socket } from "../socket";

let map = "";
let marker = "";

class Map extends Component {

  state = {
    // Toronto City Hall
    // 100 Queen St W, Toronto, ON M5H 2N2
    center: [43.6534399, -79.3840901]
  }

  componentDidMount() {
    this.initMap();
  }

  initMap() {
    // add map
    map = L.map('map', {
      center: this.state.center,
      zoom: 13,
      zoomControl: false
    });

    // add layer to map

    var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
    });
    map.addLayer(OpenStreetMap_HOT);

    //Reference: https://medium.com/@annaian/adding-leaflet-and-leaflet-locatecontrol-to-react-component-c864262811e8
    //find user location and update based on that
    const lc = new Locate({ position: 'bottomright', keepCurrentZoomLevel: true, flyTo: 'setView' });
    lc.addTo(map);
    //set zoom controller to bottom right
    L.control.zoom({ position: "bottomright" }).addTo(map);
    // add marker
    var icon = L.icon({
      iconUrl: "/images/marker-icon-green.png",
      iconSize: [35, 35],
      iconAnchor: [15, 35],
    });
    marker = L.marker(this.state.center, { icon: icon }).addTo(map);
    this.updateMarker();
    this.getCenter();
  }

  updateMarker() {
    // fix marker position to center for drag event
    map.on('drag', function (e) {
      this.setState({
        center: map.getCenter()
      }, () => {
        marker.setLatLng(this.state.center);
        // console.log(this.state.center);
      });
    }.bind(this));

    // fix marker position to center for zoom event
    map.on('zoomend', function (e) {
      this.setState({
        center: map.getCenter()
      }, () => {
        marker.setLatLng(this.state.center);
        // console.log(this.state.center);
      });
    }.bind(this));
  }

  // when user clicks the marker, get lat and lng  
  getCenter() {
    this.setState({
      center: map.getCenter()
    });
    marker.on("click", (e) => {
      let updatedUserInfo = {
        userId: socket.id,
        lat: this.state.center.lat,
        lon: this.state.center.lng,
        status: "Selected!"
      }
      // send updated info to server
      socket.emit("selected", updatedUserInfo);
    });
  }

  // show marker of result locations on map
  addNewMarker(dataFromYelp) {
    console.log(dataFromYelp);
    let newMarker = "";

    // prepare marker icon
    const myIcon = L.icon({
      iconUrl: '/images/marker-icon-cream-edge.png',
      iconSize: [35, 35],
      iconAnchor: [15, 35],
      popupAnchor: [-3, -76],
    });

    for (let i = 0; i < dataFromYelp.total; i++) {

      // get lat and lng for each location
      let latlng = dataFromYelp.businesses[i].coordinates; // {latitude: XXX, longitude:XXX}
      latlng = L.latLng(latlng.latitude, latlng.longitude);
      console.log(latlng);

      // add marker to map
      newMarker = L.marker(latlng, { icon: myIcon }).addTo(map);

      // when marker is clicked, popup will be shown
      newMarker.addEventListener("click", function (e) {
        let markerClicked = this;
        let content = "";

        dataFromYelp.businesses.map((e, k) => {
          console.log(e.name);
          // define content
          content =
            `<div key=${e.name}  id="lo-list-item">

                <div id="lo-img">
                  <img alt=${e.name} src=${e.image_url} />
                </div>

                <div id="lo-content"> 
                    <p id="lo-placeName" style={{ color: ${myTheme.palette.primary.main} }}>${e.name}</p>
                    <p><a href={"tel:" + ${e.phone}} id="lo-placePhone" style={{ color: ${myTheme.palette.primary.grey} }}>${e.phone}</a></p>
                    <p id="lo-placeAddress">${e.location.address1}</p>        
                </div>
                
            </div>`;
        })

        // define popup window
        L.popup({
          offset: [4, -24], //adjust the distance from the marker
          maxWidth: 500,
          maxHeight: 280
        })
          .setLatLng(markerClicked.getLatLng())
          .setContent(content)
          .openOn(map);
      });

      // when the green marker is clicked, remove location markers
      marker.addEventListener("click", function () {
        map.removeLayer(newMarker);
      });

    }

  }


  render() {
    return (
      <>
        <UserStatus addNewMarker={this.addNewMarker} />
        <div id="map"></div>
      </>
    )
  }
}

export default Map;
