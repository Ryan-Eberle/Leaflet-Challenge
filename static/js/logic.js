// USGS website for past 30 days
// var url = https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson


  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });

var earthquakes = new L.LayerGroup();


  // create map layer, centered around
var myMap = L.map("map", {
    center: [37.775, -122.49],
    zoom: 4,
    layers: [lightmap, earthquakes]
  });

lightmap.addTo(myMap);
