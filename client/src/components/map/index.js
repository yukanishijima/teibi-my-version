import React, { Component } from 'react'
import UserStatus from '../userStatus';
import L from 'leaflet';
import Locate from "leaflet.locatecontrol";
// import Paper from '@material-ui/core/Paper';
import './style.css'

// initialize socket
import { socket } from "../socket";

let map = "";
let marker = "";

class Map extends Component {

  state = {
    // Toronto City Hall
    // 100 Queen St W, Toronto, ON M5H 2N2
    center: [43.6534399,-79.3840901]
  }

  componentDidMount() {
    this.initMap();
  }

  initMap() {
    // add map
    map = L.map('map', {
      center: this.state.center,
      zoom: 13,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
      zoomControl: false
    });
    //Reference: https://medium.com/@annaian/adding-leaflet-and-leaflet-locatecontrol-to-react-component-c864262811e8
    //find user location and update based on that
    const lc = new Locate({ position: 'bottomright', keepCurrentZoomLevel: true, flyTo: 'setView' });
    lc.addTo(map);
    //set zoom controller to bottom right
    L.control.zoom({ position: "bottomright" }).addTo(map);
    // add marker
    marker = L.marker(this.state.center).addTo(map);
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
      // console.log("selected");
      // console.log(this.state.center)
      // this.setState({
      //   center: map.getCenter()
      // });
      let updatedUserInfo = {
        userId: socket.id,
        lat: this.state.center.lat,
        lon: this.state.center.lng,
        status: "Selected!"
      }
      // console.log(updatedUserInfo)
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
