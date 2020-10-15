

  
  // Adding a tile layer (the background map image) to our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });

var earthquakes = new L.LayerGroup();


// create map layer, centered around San Francisco
var myMap = L.map("map", {
    center: [37.775, -122.49],
    zoom: 4,
    layers: [lightmap, earthquakes]
  });

// add lightmap to myMap
lightmap.addTo(myMap);

// earthquake overlay map 
var overLayMap = {
    Earthquakes: earthquakes
};

// USGS website for past 30 days
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// D3 JSON our url to access the earthquake data
d3.json(url, function(data){

    // switch function for color of circle according too magnitude of quake
    function circleColor(depth){
        switch (true) {
            case depth < 1:
                return "green";
            case depth <2:
                return "lightgreen";
            case depth <3:
                return "yellow";
            case depth <4:
                return "orange";
            case depth <5:
                return "red";
            default:
                return "purple";
        }
    }
    // create the geojson layer to add to map 
    L.geoJson(data, {
        // https://leafletjs.com/examples/geojson/
        // use the pointtolayer function to make circle markers
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: function(feature) {
            return {
                color: "black",
                fillColor: circleColor(feature.properties.mag),
                fillOpacity: 0.75,
                weight: 0.5,
                radius: (feature.properties.mag) * 6
            };
        },
        onEachFeature: function(feature, layer){
            layer.bindPopup(`<strong>Location:</strong> ${feature.properties.place}<br><strong>Time:</strong> ${new Date(feature.properties.time)}<br><strong>Magnitude:</strong> ${feature.properties.mag}`);
        }
    }).addTo(earthquakes);
    earthquakes.addTo(myMap);

    // Set up legend for earthquake depth color scale
    var legend = L.control({ position: "bottomright"});
    legend.onAdd = function() {
        var div = L.DomUtil.create("div","info legend");
        var magnitudeLabels = [0,1,2,3,4,5];

        var legendInfo = "<strong><center>Magnitude<br>Levels</center></strong>" + "<div class=\"labels\">" + "</div>";

        div.innerHTML = legendInfo;

        for ( var i = 0; i <magnitudeLabels.length; i++) {
            div.innerHTML +=
            '<i style="background:'+ circleColor(magnitudeLabels[i]) + '"></i> ' +
            magnitudeLabels[i] + (magnitudeLabels[i + 1] ? ' &ndash; ' + magnitudeLabels[i + 1] + '<br>' : ' +');
        }
        return div;
    };
    legend.addTo(myMap);
});

