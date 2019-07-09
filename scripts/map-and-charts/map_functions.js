// THESE FUNCTIONS DEFINE WHAT HAPPENS WHEN A USER CLICK ON A LAYER
function MapInteraction(feature, layer){
  // layer.on('click', function (e) {
  //   // If user click on selected area, area gets deselected
  //   if (e.target.feature.properties.selected) {
  //     e.target.feature.properties.selected = false;
  //     // Get the index of this pcode in the area_list and remove it
  //     const index = analyser.area_list.indexOf(e.target.feature.properties.pcode)
  //     analyser.area_list.splice(index, 1)
  //   }
  //   // Area gets selected
  //   else {
  //     e.target.feature.properties.selected = true;
  //   }
  //   // Loop on each layer to set analyser.area_list
  //   const grouplayer = eval('level'+analyser.geo_mode)
  //   analyser.area_list = []
  //   grouplayer.eachLayer(function(layer){
  //     if (layer.feature.properties.selected) {
  //       analyser.area_list.push(layer.feature.properties.pcode)
  //     }
  //   })
  //   if (analyser.area_list == 0) {
  //     analyser.area_list = ['*']
  //   }
  //   // Refresh the sector list
  //   $("#sectorlist").val(analyser.area_list);
  //   $('#sectorlist').selectpicker('render');
  //   analyser.selectMapData()
  // })
}

// This global variable is used to define group layer of proportionnal circles,
// It has to be define before the creation of the group layer.
let propCircles
// Functions for map: Set Circle Radius / Set PopUp Content / Display Swatchs and Circles
class Mapper {
  // Return the radius for a circle according to analyser.maxValue and analyser.maxRadius
	static getCircleRadius(value, maxValue, maxRadius){
    const radius = (maxRadius / 2 ) * Math.sqrt(value/maxValue)
    return radius
	}
  // Define pop up content for area in the area_list
  static setPopUpContent(value, name){
    value = Math.round(value*10000)/10000
    let content
    content = '<table class="table table-bordered">'
    if (analyser.geo_mode == 1) {
      content += '<tr><th>Zone</th><td>'+name+'</td></tr>'
     }
    else if (analyser.geo_mode == 2) {
      content += '<tr><th>District</th><td>'+name.toUpperCase()+'</td></tr>'
    } else if (analyser.geo_mode == 3) {
      content += "<tr><th>Région</th><td>"+name.toUpperCase()+'</td></tr>'
    } else if (analyser.geo_mode == 4) {
      content += "<tr><th>Municipality</th><td>"+name.toUpperCase()+'</td></tr>'
    }
    if (analyser.indicator == 1) {
      content += "<tr><th>Patient(s)</th><td>"+parseInt(value)+'</td></tr>'
    } else if (analyser.indicator == 2) {
      content += "<tr><th>Décès</th><td>"+parseInt(value)+'</td></tr>'
    } else if (analyser.indicator == 3) {
      content += "<tr><th>Taux d'attaque / 10000</th><td>"+value+'</td></tr>'
    } else if (analyser.indicator == 4) {
      content += "<tr><th>Létalité / 100</th><td>"+value+'</td></tr>'
    } else if (analyser.indicator == 5) {
      content += "<tr><th>Vaccination / 100</th><td>"+value+'</td></tr>'
    }
    content += '</table>'
    return content
  }
  // PopUp for area without data or not it the analyser.area_list
  static setNoDataPopUp(name){
    let content
    if (analyser.geo_mode == 1) {
      content = '<span class="popup-span">'+name.toUpperCase()+"</span> : Cette zone n'est pas selectionnée ou ne contient pas de données"
     }
    else if (analyser.geo_mode == 2) {
      content = '<span class="popup-span">'+name.toUpperCase()+"</span> : Ce district n'est pas selectionné ou ne contient pas de données"
    } else if (analyser.geo_mode == 3) {
      content = '<span class="popup-span">'+name.toUpperCase()+"</span> : Cette région n'est pas selectionnée ou ne contient pas de données"
    } else if (analyser.geo_mode == 4) {
      content = '<span class="popup-span">'+name.toUpperCase()+"</span> : This municipality is not selected or doesn't have any data"
    }
    return content
  }
  //Add a proportionnal circle to a layer
  static displayCircles(layer, pcode, result, maxValue){
    if (layer.feature.properties.adm3_ID == pcode && result > 0) {
      layer.feature.properties.selected = true
      layer.feature.properties.result = result
      // Turf is used to calculate the centroid of a layer
      if (layer.feature.properties.father_id != null) {
        var centroid = turf.pointOnFeature(layer.feature);
        var lon = centroid.geometry.coordinates[0];
        var lat = centroid.geometry.coordinates[1];
        let circle
        const radius = Mapper.getCircleRadius(result, maxValue, analyser.circleMaxRadius)
        circle = L.circleMarker([lat, lon], {
          "weight": 1,
          "color": analyser.circleContour,
          "opacity": 0.7,
          "fillColor": analyser.circleFill,
          "fillOpacity": 0.7,
          "radius": radius
        })
        propCircles.addLayer(circle)
        circle.bindPopup(Mapper.setPopUpContent(result, layer.feature.properties.adm3_name));
        circle.on('mouseover', function (e) {
          level4.eachLayer(l => {
            if (l.feature.properties.adm3_ID == layer.feature.properties.adm3_ID) {
              l.setStyle({
                "weight": 3,
                "color": "#e91625",
                "opacity": 0.7,
                "fillColor": "#FFF",
                "fillOpacity": 0
              });
            }
          })
            this.openPopup();
        });
        circle.on('mouseout', function (e) {
            level4.eachLayer(l => {
              if (l.feature.properties.selected == true) {
                l.setStyle({
                  "weight": 1,
                  "color": "#000",
                  "opacity": 0.7,
                  "fillColor": "#FFF",
                  "fillOpacity": 0
                });
              }
            })
            this.closePopup();
        });
      }


    } else if (layer.feature.properties.pcode == pcode && result == 0) {
      layer.feature.properties.selected = true
      layer.setStyle({
        "weight": 1,
        "color": "#000",
        "opacity": 0.7,
        "fillColor": "#FFF",
        "fillOpacity": 0
      });
      layer.bindPopup(Mapper.setPopUpContent(result, layer.feature.properties.adm3_name));
      layer.on('mouseover', function (e) {
          this.openPopup();
      });
      layer.on('mouseout', function (e) {
          this.closePopup();
      });
    }
  }
  // Add color swatch to a layer
  static displayColorSwatchs(layer, pcode, value, occurence, tresholds){
    let rate;
    if (analyser.indicator == 3) {
      rate = value
    } else {
      rate = value / occurence
      if (value == 0 && occurence == 0) {
        rate = 0
      }
    }
    if (layer.feature.properties.pcode == pcode) {
      layer.feature.properties.selected = true
      layer.bindPopup(Mapper.setPopUpContent(rate, layer.feature.properties.name));
      layer.on('mouseover', function (e) {
          this.openPopup();
      });
      layer.on('mouseout', function (e) {
          this.closePopup();
      });
      if (value == 0) {
        layer.setStyle({
          "weight": 1,
          "color": "#000",
          "opacity": 0.7,
          "fillColor": analyser.swatchsFill['0'],
          "fillOpacity": 0.9
        });
      }
      if (rate <= tresholds[0] && value != 0) {
        layer.setStyle({
          "weight": 1,
          "color": "#000",
          "opacity": 0.7,
          "fillColor": analyser.swatchsFill['1'],
          "fillOpacity": 0.7
        });
      } else if (rate > tresholds[0] && rate <= tresholds[1]) {
        layer.setStyle({
          "weight": 1,
          "color": "#000",
          "opacity": 0.7,
          "fillColor": analyser.swatchsFill['2'],
          "fillOpacity": 0.7
        });
      } else if (rate > tresholds[1] && rate <= tresholds[2]) {
        layer.setStyle({
          "weight": 1,
          "color": "#000",
          "opacity": 0.7,
          "fillColor": analyser.swatchsFill['3'],
          "fillOpacity": 0.7
        });
      } else if (rate > tresholds[2] && rate <= tresholds[3]) {
        layer.setStyle({
          "weight": 1,
          "color": "#000",
          "opacity": 0.7,
          "fillColor": analyser.swatchsFill['4'],
          "fillOpacity": 0.7
        });
      } else if (rate > tresholds[3] && rate <= tresholds[4]) {
        layer.setStyle({
          "weight": 1,
          "color": "#000",
          "opacity": 0.7,
          "fillColor": analyser.swatchsFill['5'],
          "fillOpacity": 0.7
        });
      } else if (rate > tresholds[4]) {
        layer.setStyle({
          "weight": 1,
          "color": "#000",
          "opacity": 0.7,
          "fillColor": analyser.swatchsFill['6'],
          "fillOpacity": 0.7
        });
      }
    }
  }
  //Applied to layer without data or not in the analyser.area_list
  static setNoDataStyle(layer){
    layer.unbindPopup();
    layer.setStyle({
      "weight": 1,
      "color": "#000",
      "opacity": 0.7,
      "fillColor": "#a4a4a5",
      "fillOpacity": 0.8
    });
    layer.bindPopup(Mapper.setNoDataPopUp(layer.feature.properties.adm3_name));
    layer.on('mouseover', function (e) {
        this.openPopup();
    });
    layer.on('mouseout', function (e) {
        this.closePopup();
    });
  }
  //Remove polygon style (called before add proportionnal circles)
  static resetStyle(layer){
    layer.feature.properties.selected = false
    layer.unbindPopup();
    layer.setStyle({
      "weight": 1,
      "color": "#000",
      "opacity": 0.7,
      "fillColor": "#fff",
      "fillOpacity": 0.3
    });
  }
  static async displayCaseOrDeath(dataset, maxValue){
    if (mymap.hasLayer(propCircles)) {
      mymap.removeLayer(propCircles)
    }
    propCircles = L.layerGroup()
    const grouplayer = await eval('level'+analyser.geo_mode)
    grouplayer.eachLayer(function(layer){
      // Reset layer style
      Mapper.resetStyle(layer)
      $.each(dataset, function(i, v){
        Mapper.displayCircles(layer, v['pcode'], v['result'], maxValue)
      })
      propCircles.addTo(mymap)
    })
    grouplayer.eachLayer(function(layer){
      if (!layer.feature.properties.selected) {
        Mapper.setNoDataStyle(layer)
      }
    })
  }
  static async displayMortalityOrAttack(dataset, tresholds){
    if (mymap.hasLayer(propCircles)) {
      mymap.removeLayer(propCircles)
    }
    const grouplayer = await eval('level'+analyser.geo_mode)
    grouplayer.eachLayer(function(layer){
      Mapper.resetStyle(layer)
      if (analyser.indicator == 3) {
        $.each(dataset, function(i, v){
            Mapper.displayColorSwatchs(layer, v['pcode'], v['result'], 0, tresholds)
        })
      } else if (analyser.indicator == 4) {
        $.each(dataset, function(i, v){
            Mapper.displayColorSwatchs(layer, v['pcode'], v['deces'], v['cas'], tresholds)
        })
      }

    })
    grouplayer.eachLayer(function(layer){
      if (!layer.feature.properties.selected) {
        Mapper.setNoDataStyle(layer)
      }
    })
  }
}
