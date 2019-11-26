import React, { Component } from 'react'
import UserStatus from '../userStatus';
import L from 'leaflet';
import Locate from "leaflet.locatecontrol";
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

    // option - 1
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

  render() {
    return (
      <>
        <UserStatus elevation={4} />
        <div id="map"></div>
      </>
    )
  }
}

export default Map;
