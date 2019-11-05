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
    center: [43.6629, -79.3957],  // initial lat long
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
    const lc = new Locate({position: 'bottomright', keepCurrentZoomLevel: true});
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
        console.log(this.state.center);
      });
    }.bind(this));

    // fix marker position to center for zoom event
    map.on('zoomend', function (e) {
      this.setState({
        center: map.getCenter()
      }, () => {
        marker.setLatLng(this.state.center);
        console.log(this.state.center);
      });
    }.bind(this));
  }

  // when user clicks the marker, get lat and lng  
  getCenter() {
    marker.on("click", (e) => {
      console.log("selected");
      let updatedUserInfo = {
        userId: socket.id,
        lat: this.state.center[0],
        lon: this.state.center[1],
        status: "Selected!"
      }
      // send updated info to server
      socket.emit("selected", updatedUserInfo);
    });
  }


  render() {
    return (
      <>
        <UserStatus />
        <div id="map"></div>
      </>
    )
  }
}

export default Map;
