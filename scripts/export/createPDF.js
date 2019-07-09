
function configurePDF(){
  $('#modalpdf').modal('show')
  $('#launchPDF').unbind().click(function(e){//Unbind stop several launchs when cliking
    e.preventDefault();
    const title = $('#pdf-title').val()
    const sources = $('#pdf-sources').val()

    createPDF(title, sources)
    $('#modalpdf').modal('hide')
  })
}



function createPDF(title, sources){
  let SourceText = false
  if (sources !== '') {
    SourceText = true
  }
  const pdfInfos = getSurveyInfos()
  $('#loading-text').html('Génération du PDF en cours')
  $('.overlay-loader').show()
  const doc = new jsPDF({
    orientation: 'landscape',
    format: 'a4'
  })
  // Header
  doc.addImage(pdfimages.header, 'JPEG', 0, 0, 297, 16);
  doc.setFont('courier')
  doc.setFontType('bold')
  doc.setFontSize(23);
  doc.setTextColor(207, 38, 37);
  doc.text(25, 15, 'EPIMAP');
  doc.setTextColor(173, 173, 173);
  doc.setFontSize(14);
  const subtitle = $('#app-subtitle').html()
  doc.text(58, 15, subtitle);
  doc.setFont('times')
  doc.setFontSize(18);
  doc.setTextColor(61, 61, 61);
  doc.text(title, (doc.internal.pageSize.getWidth() / 2), 25, null, null, 'center');

  // Map
  leafletImage(mymap, function(err, canvas) {
    const mapimg = document.createElement('img');
    var dimensions = mymap.getSize();
    mapimg.width = dimensions.x;
    mapimg.height = dimensions.y;
    mapimg.src = canvas.toDataURL();
    const ratio = dimensions.x / 230
    const mapHeight = dimensions.y / ratio
    doc.addImage(mapimg, 'JPEG', 0, 32, 230, mapHeight);
    doc.addImage(pdfimages.north_arrow, 'PNG', 5, 37, 2.3, 13.6);

    //Legend
    doc.setFontSize(12);
    doc.text('Caractéristiques de l\'étude', 263, 35, null, null, 'center');
    doc.setFontSize(10);
    doc.text(235, 45, 'Maladie: '+pdfInfos.disease);
    doc.text(235, 50, 'Indicateur: '+pdfInfos.indicator);
    doc.text(235, 55, 'Niveau géographique: '+pdfInfos.geography);
    doc.text(235, 60, 'Unité temporelle: '+pdfInfos.time);
    doc.text(235, 65, 'Période: '+pdfInfos.range);

    doc.setFontSize(12);
    doc.text('Légende', 263, 75, null, null, 'center');
    // Show legend to render it as image
    if (!$('.legend-panel').is(':visible')) {
      $('.legend-panel').show()
    }
    if (analyser.indicator == 1 || analyser.indicator == 2) {
      html2canvas($('.legend-circle-container')[0]).then(function(legend) {
          const imgData = document.createElement('img');
          imgData.height = $('.legend-circle-container').height();
          imgData.width = $('.legend-circle-container').width();
          const ratio = imgData.width / 67
          imgData.height = imgData.height / ratio
          imgData.width = imgData.width /ratio
          imgData.src = legend.toDataURL();
          doc.addImage(imgData, 'JPEG', 235, 80);


          const endLegendHeight = 80+imgData.height+5
          doc.text('Sources', 263, endLegendHeight, null, null, 'center');
          doc.setFontSize(10)
          if (!SourceText) {
            doc.text(235, endLegendHeight+5, 'Cas et taux: MSF');
            doc.text(235, endLegendHeight+10, 'Limites administratives: OCHA');
            doc.text(235, endLegendHeight+15, 'Fonds de carte: OSM');
          } else {
            doc.text(235, endLegendHeight+5, sources);
          }


          doc.setFontSize(12);
          doc.text('Editée le '+new Date(Date.now()).toLocaleDateString("fr-FR"), 263, endLegendHeight+25, null, null, 'center');

          // Footer
          doc.addImage(pdfimages.bottom_text, 'JPEG', 0, 202, 297, 8);
          doc.addImage(pdfimages.logo_msf, 'JPEG', 242, 185, 45, 20);//45*20
          if ($('.legend-panel').is(':visible')) {
            $('.legend-panel').hide ()
          }
          $('.overlay-loader').hide()
          if (title != '') {
            doc.save(title+'.pdf')
          } else {
            const namePDF = 'WACA-PDF-Export_'+new Date(Date.now()).toLocaleDateString("fr-FR")+'.pdf'
            doc.save(namePDF)
          }

      });
    } else if (analyser.indicator == 3 || analyser.indicator == 4) {
      // Convert legend to image
      html2canvas($('.legend-tresholds')[0]).then(function(legend) {
          const imgData = document.createElement('img');
          imgData.height = $('.legend-tresholds').height()
          imgData.width = $('.legend-tresholds').width()
          const ratio = imgData.width / 67
          imgData.height = imgData.height / ratio
          imgData.width = imgData.width /ratio
          imgData.src = legend.toDataURL();
          // imgData = legend.toDataURL('image/jpeg');
          doc.addImage(imgData, 'JPEG', 230, 80);

          const endLegendHeight = 80+imgData.height+5
          doc.text('Sources', 263, endLegendHeight, null, null, 'center');
          doc.setFontSize(10)
          if (!SourceText) {
            doc.text(235, endLegendHeight+5, 'Cas et taux: MSF');
            doc.text(235, endLegendHeight+10, 'Limites administratives: OCHA');
            doc.text(235, endLegendHeight+15, 'Fonds de carte: OSM');
          } else {
            doc.text(235, endLegendHeight+5, sources);
          }


          doc.setFontSize(12);
          doc.text('Editée le '+new Date(Date.now()).toLocaleDateString("fr-FR"), 263, endLegendHeight+25, null, null, 'center');

          // Footer
          doc.addImage(pdfimages.bottom_text, 'JPEG', 0, 202, 297, 8);
          doc.addImage(pdfimages.logo_msf, 'JPEG', 242, 185, 45, 20);//45*20
          if ($('.legend-panel').is(':visible')) {
            $('.legend-panel').hide ()
          }
          $('.overlay-loader').hide()
          if (title != '') {
            doc.save(title+'.pdf')
          } else {
            const namePDF = 'WACA-PDF-Export_'+new Date(Date.now()).toLocaleDateString("fr-FR")+'.pdf'
            doc.save(namePDF)
          }
      });
    }


  });
}

const doc = new jsPDF({
  orientation: 'landscape',
  format: 'a4'
})
