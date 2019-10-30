import React, { Component } from 'react'
import L from 'leaflet';
import './style.css'

let map = "";
let marker = "";

class Tmap extends Component {

  state = {
    center: [this.props.match.params.lat, -79.3957]  // initial lat long
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
      console.log(`${this.state.center}`);
    });
  }


  render() {
    return (
      <>
        <div id="map"></div>
      </>
    )
  };
}

export default Tmap;
