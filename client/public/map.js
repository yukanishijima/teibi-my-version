$(function () {
  console.log("hi");

  var mymap = L.map('mapid').setView([43.706635, -79.388750], 12);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiY2lubmFtb21lIiwiYSI6ImNrMjd0MDJhcDAzaG0zY25yMWEybHgza2wifQ.-j-3-maoWoV179edZDljfg'
  }).addTo(mymap);
});

