const legend = {
  circles: {
    min: Infinity,//defined by analyser according to dataset
    max: -Infinity,//defined by analyser according to dataset
    size: 1,
    slider: null,
  },
  setLegend(treshold){
    // Legend for proportionnal circles
    if (analyser.indicator == 1 || analyser.indicator == 2) {
      $('.legend-circle').show()
      $('.legend-rectangle').hide()
      if (this.circles.min < 1) {
      			this.circles.min = 1;
      }
      // Title
      let title = ''
      if (analyser.indicator == 1) {
        title += 'Patients '
      } else {
        title += 'Décès '
      }
      if (analyser.geo_mode == 4) {
        title += 'by municipality'
      }
      if (analyser.geo_mode == 3) {
        title += '(par région)'
      }
      if (analyser.geo_mode == 2) {
        title += '(par district)'
      }
      if (analyser.geo_mode == 1) {
        title += '(par zone)'
      }
      $('#circle-title').html(title)
      // Defines classes from min/max circles values;
      const classes = [this.circles.min, roundNumber((this.circles.max+this.circles.min)/2), this.circles.max];
      for (var i = 0; i < classes.length; i++) {
        classes[i] = parseInt(Mapper.getCircleRadius(classes[i],analyser.disease_MaxValue,analyser.circleMaxRadius))
      }
      //Set SVG symbols
      // Based on https://codepen.io/anon/pen/jJEpva?&editable=true
      const cx = classes[2] + 5
      const cy1 = classes[2] + 5
      const cy2 = cy1 + (classes[2] - classes[1])
      const cy3 = cy2 + (classes[1] - classes[0])
      const svgWidth = ((classes[2] * 2.5) + 35)
      const svgHeight = (cy1*2) + 5
      $(".box").height(svgHeight);
      let legendTextChain = `<svg height="${svgHeight}" width="${svgWidth}" xmlns="http://www.w3.org/2000/svg">`
      // Circles
      legendTextChain += `<circle cx="${cx}" cy="${cy1}" r="${classes[2]}" fill="${hex2rgb(analyser.circleFill)}" stroke="${analyser.circleContour}" stroke-width="0.7"/>`
      legendTextChain += `<circle cx="${cx}" cy="${cy2}" r="${classes[1]}" fill="${hex2rgb(analyser.circleFill)}" stroke="${analyser.circleContour}" stroke-width="0.7"/>`
      legendTextChain += `<circle cx="${cx}" cy="${cy3}" r="${classes[0]}" fill="${hex2rgb(analyser.circleFill)}" stroke="${analyser.circleContour}" stroke-width="0.7"/>`
      // Lines
      legendTextChain += `<line x1="${cx}" y1="${cy1 - classes[2]}" x2="${classes[2] * 2.5}" y2="${cy1 - classes[2]}" stroke="black" stroke-width="0.7"/>`
      legendTextChain += `<line x1="${cx}" y1="${cy2 - classes[1]}" x2="${classes[2] * 2.5}" y2="${cy2 - classes[1]}" stroke="black" stroke-width="0.7"/>`
      legendTextChain += `<line x1="${cx}" y1="${cy3 - classes[0]}" x2="${classes[2] * 2.5}" y2="${cy3 - classes[0]}" stroke="black" stroke-width="0.7"/>`
      // Texts
      legendTextChain += `<text x="${(classes[2] * 2.5) + 5}" y="${(cy1 - classes[2]) + 3}" font-size="10">${this.circles.max}</text>`
      legendTextChain += `<text x="${(classes[2] * 2.5) + 5}" y="${(cy2 - classes[1]) + 5}" font-size="10">${roundNumber((this.circles.max+this.circles.min)/2)}</text>`
      legendTextChain += `<text x="${(classes[2] * 2.5) + 5}" y="${(cy3 - classes[0]) + 6}" font-size="10">${this.circles.min}</text>`
      legendTextChain += '</svg>'
      $('#circles-container').html(legendTextChain)

      // Color picker for circles colors
      $('#circle-inside-color').minicolors({
        defaultValue: analyser.circleFill,
        control: 'wheel',
        change: function(value, opacity) {
          analyser.circleFill = value
        }
      })
      $('#circle-outside-color').minicolors({
        defaultValue: analyser.circleContour,
        control: 'wheel',
        change: function(value, opacity) {
          analyser.circleContour = value
        }
      })
      // Circle radius Modifier
      $('#circleSmaller').unbind().click(e => analyser.circleMaxRadius = analyser.circleMaxRadius * 0.9)
      $('#circleBigger').unbind().click(e => analyser.circleMaxRadius = analyser.circleMaxRadius * 1.1)
    }

    // Legend for color swatchs
    else if (analyser.indicator == 3 || analyser.indicator == 4) {
      $('.legend-circle').hide()
      $('.legend-rectangle').show()
      // Title
      let title = ''
      if (analyser.indicator == 3) {
        title += "Taux d'attaque "
      } else {
        title += "Létalité "
      }
      if (analyser.geo_mode == 4) {
        title += '(par pays)'
      }
      if (analyser.geo_mode == 3) {
        title += '(par région)'
      }
      if (analyser.geo_mode == 2) {
        title += '(par district)'
      }
      if (analyser.geo_mode == 1) {
        title += '(par zone)'
      }
      $('#rectangle-title').html(title)
      // Legend with color picker
      const tempSwatchFill = {
        '0':analyser.swatchsFill['0'],
        '1':analyser.swatchsFill['1'],
        '2':analyser.swatchsFill['2'],
        '3':analyser.swatchsFill['3'],
        '4':analyser.swatchsFill['4'],
        '5':analyser.swatchsFill['5'],
        '6':analyser.swatchsFill['6']
      }
      $('#treshold0').html('0')
      $('#treshold0-inside-color').minicolors({
        defaultValue: analyser.swatchsFill['0'],
        control: 'wheel',
        change: function(value, opacity) {
          tempSwatchFill['0'] = value
        }
      })
      $('#treshold0-color').css("background-color",analyser.swatchsFill['0']);
      $('#treshold1').html('0 - '+treshold[0])
      $('#treshold1-inside-color').minicolors({
        defaultValue: analyser.swatchsFill['1'],
        control: 'wheel',
        change: function(value, opacity) {
          tempSwatchFill['1'] = value
        }
      })
      $('#treshold1-color').css("background-color",analyser.swatchsFill['1']);
      $('#treshold2').html(treshold[0]+' - '+treshold[1])
      $('#treshold2-inside-color').minicolors({
        defaultValue: analyser.swatchsFill['2'],
        control: 'wheel',
        change: function(value, opacity) {
          tempSwatchFill['2'] = value
        }
      })
      $('#treshold2-color').css("background-color",analyser.swatchsFill['2']);
      $('#treshold3').html(treshold[1]+' - '+treshold[2])
      $('#treshold3-inside-color').minicolors({
        defaultValue: analyser.swatchsFill['3'],
        control: 'wheel',
        change: function(value, opacity) {
          tempSwatchFill['3'] = value
        }
      })
      $('#treshold3-color').css("background-color",analyser.swatchsFill['3']);
      $('#treshold4').html(treshold[2]+' - '+treshold[3])
      $('#treshold4-inside-color').minicolors({
        defaultValue: analyser.swatchsFill['4'],
        control: 'wheel',
        change: function(value, opacity) {
          tempSwatchFill['4'] = value
        }
      })
      $('#treshold4-color').css("background-color",analyser.swatchsFill['4']);
      $('#treshold5').html(treshold[3]+' - '+treshold[4])
      $('#treshold5-inside-color').minicolors({
        defaultValue: analyser.swatchsFill['5'],
        control: 'wheel',
        change: function(value, opacity) {
          tempSwatchFill['5'] = value
        }
      })
      $('#treshold5-color').css("background-color",analyser.swatchsFill['5']);
      $('#treshold6').html('> '+treshold[4])
      $('#treshold6-inside-color').minicolors({
        defaultValue: analyser.swatchsFill['6'],
        control: 'wheel',
        change: function(value, opacity) {
          tempSwatchFill['6'] = value
        }
      })
      $('#treshold6-color').css("background-color",analyser.swatchsFill['6']);
      // Modify tresholds
      $('#legendModifier').unbind().click(e => {
        e.preventDefault
        $('#formTreshold0').val(treshold[0])
        $('#formTreshold1').val(treshold[1])
        $('#formTreshold2').val(treshold[2])
        $('#formTreshold3').val(treshold[3])
        $('#formTreshold4').val(treshold[4])

        $('#tresholdModal').modal('show')

        $('#saveTresholds').unbind().click(action => {
          action.preventDefault
          const tresholds = [$('#formTreshold0').val(),$('#formTreshold1').val(),$('#formTreshold2').val(),$('#formTreshold3').val(),$('#formTreshold4').val(),]
          analyser.swatchsFill = {
            '0':tempSwatchFill['0'],
            '1':tempSwatchFill['1'],
            '2':tempSwatchFill['2'],
            '3':tempSwatchFill['3'],
            '4':tempSwatchFill['4'],
            '5':tempSwatchFill['5'],
            '6':tempSwatchFill['6']
          }
          analyser.tresholds[analyser.disease+"_"+analyser.indicator] = tresholds
          $('#tresholdModal').modal('hide')
        })
      })
    }
  }
}
