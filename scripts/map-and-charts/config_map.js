// THIS IS A DEMO MAP POWERED WITH LEAFLET
const mymap = L.map('map', {
  zoomControl: false,
  preferCanvas: true
 }).setView([10.832, 7.427], 5)
// SET THE ZOOM ICONS TO THE TOPRIGHT CORNER
new L.Control.Zoom({ position: 'topright' }).addTo(mymap)

// ADD A BASEMAP
const light = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1IjoiY2FydG9saXZpZXIiLCJhIjoiY2ptN2F4Y2huMDFqMjNrbW1oM2Z0cmJnayJ9.hgdKRVi2rOaI1LRAq-oj7A'
})
const dark = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.dark',
    accessToken: 'pk.eyJ1IjoiY2FydG9saXZpZXIiLCJhIjoiY2ptN2F4Y2huMDFqMjNrbW1oM2Z0cmJnayJ9.hgdKRVi2rOaI1LRAq-oj7A'
})
const streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiY2FydG9saXZpZXIiLCJhIjoiY2ptN2F4Y2huMDFqMjNrbW1oM2Z0cmJnayJ9.hgdKRVi2rOaI1LRAq-oj7A'
}).addTo(mymap)
const satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.satellite',
    accessToken: 'pk.eyJ1IjoiY2FydG9saXZpZXIiLCJhIjoiY2ptN2F4Y2huMDFqMjNrbW1oM2Z0cmJnayJ9.hgdKRVi2rOaI1LRAq-oj7A'
})

const baselayers = L.layerGroup([light, dark, streets, satellite])

// Change baselayer
$('.baselayer-icon').click(function(e){
  $('.baselayer-icon').each(function(i, v){
    if ($(this).hasClass('selected-layer')) {
      $(this).removeClass('selected-layer')
    }
  })
  $(this).addClass('selected-layer')
  const selectedLayer = e.target.id
  baselayers.eachLayer(function(layer){
    if (mymap.hasLayer(layer)) {
      mymap.removeLayer(layer)
    }
  })
  eval(selectedLayer+'.addTo(mymap)')
})


// Boundaries Layers
const myStyle = {
  "weight": 1,
  "color": "#000",
  "opacity": 0.7,
  "fillColor": "#fff",
  "fillOpacity": 0.5
};


const boundarieslayers = L.layerGroup()
let level1
let level2
let level3
let level4

let labels
$('#cbx-labels').change(
    function(){
        if ($(this).is(':checked')) {
            labels = L.layerGroup()
            level4.eachLayer(layer => {
              if (layer.feature.properties.father_id != null) {
                var centroid = turf.pointOnFeature(layer.feature);
                var lon = centroid.geometry.coordinates[0];
                var lat = centroid.geometry.coordinates[1];
                var marker = new L.marker([lat, lon], { opacity: 0 });
                marker.bindTooltip(layer.feature.properties.adm3_name, {permanent: true, className: "my-label", offset: [0, 0] });
                marker.addTo(labels);
              }
            })
            labels.addTo(mymap)
        } else {
          if (mymap.hasLayer(labels)) {
            mymap.removeLayer(labels)
          }
        }
    });


// const boundarieslayers = L.layerGroup([level1, level2, level3, level4])
