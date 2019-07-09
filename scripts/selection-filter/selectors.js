// Change on area list selector (Charts DIV)
let allWasSelected = true
$(document).on('change','#sectorlist',function(){
    let selection = $('#sectorlist').val()
    const allIsSelected = contains.call(selection, '*');
    // If user click on an area -> Deselect the "*" value
    if (selection.length > 1 && allIsSelected && allWasSelected) {
      allWasSelected = false
      const index = selection.indexOf('*')
      selection.splice(index, 1)
      analyser.area_list = selection
      $('#sectorlist').val(analyser.area_list)
      $('#sectorlist').selectpicker('render');
      $('#sectorlist').selectpicker('toggle');
      $('#sectorlist').selectpicker('toggle');
    }
    // If user click on "All" -> Deselect all others area
    else if (selection.length > 1 && allIsSelected  && !allWasSelected) {
      allWasSelected = true
      selection = ['*']
      analyser.area_list = selection
      $('#sectorlist').val(analyser.area_list)
      $('#sectorlist').selectpicker('render');
      $('#sectorlist').selectpicker('toggle');
      $('#sectorlist').selectpicker('toggle');
    } else {
      analyser.area_list = selection
    }
});

// Click on button after selected areas in area list
$('#launchAnalyzer').click(function(e){
  e.preventDefault()
  // Reset Map style
  if (analyser.geo_mode == 2) {
    level2.eachLayer(function(layer){
      layer.feature.properties.selected = false
    })
  } else if (analyser.geo_mode == 3) {
    level3.eachLayer(function(layer){
      layer.feature.properties.selected = false
    })
  }
  analyser.change_disease = true
  analyser.selectMapData()
})


// Load area list according to area mode selector
function setAreaList(){
    $('#sectorlist').selectpicker('destroy')
    const regions = epibase.exec('SELECT DISTINCT adm2, adm2_ID FROM epidata ORDER BY lvl3')
    const municipalities = epibase.exec('SELECT DISTINCT adm2, adm2_ID, adm3, adm3_ID FROM epidata ORDER BY lvl2')
    // BUILD THE PICKER
    let query = '<select class="selectpicker form-control bg-white" title="Secteur" data-live-search="true" multiple id="sectorlist">'
    query += '<option selected value="*">All municipalities</option>'
    // GROUP DISTRICTS BY REGIONS WITH LVL3CODE
    $.each(regions, function(i,v){
      query += '<optgroup label="'+capitalize(v['adm2'])+'">'
      $.each(municipalities, function(item, value){
        if (value['adm2_ID'] == v['adm2_ID']) {
          query += '<option value="'+value['adm3_ID']+'">'+capitalize(value['adm3'])+'</option>'
        }
      })
      query += '</optgroup>'
    })
    query += '</select>'
    $('#sectorSelector').html(query)
    $('#sectorlist').selectpicker();
}
