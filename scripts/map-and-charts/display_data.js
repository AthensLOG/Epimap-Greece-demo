const analyser = {
  time_mode: 2,
  time_range: [],
  start_time: {},
  end_time: {},
  geo_mode: 4,
  area_list: ['*'],
  disease: 'mgt',
  indicator: 2,
  //If this parameter is set to True, a sql request will return the max value for this disease, setted to false after the first call
  change_disease: true,
  // This parameter determine max proportionnal circle radius, it is changed each time a new disease is selected
  disease_MaxValue: 0,
  circleMaxRadius: 100,
  circleFill: '#e91625',
  circleContour: '#000',
  swatchsFill:{
    '0':"#FFF",
    '1':"#FFE9E0",
    '2':"#FFC7B4",
    '3':"#FFA791",
    '4':"#FF8875",
    '5':"#E75B5B",
    '6':"#B8474F"
  },
  tresholds: {
    'mgt_1': 'No tresholds',
    'mgt_2': 'No tresholds',
    'mgt_3': [0.1,0.2,0.5,0.8,1],
    'mgt_4': [0.0001,0.0002,0.0003,0.0005,0.001],
    'chl_1': 'No tresholds',
    'chl_2': 'No tresholds',
    'chl_3': [0.2,0.5,0.8,1.5,2],
    'chl_4': [0.0001,0.0002,0.0003,0.0005,0.001],
    'rgl_1': 'No tresholds',
    'rgl_2': 'No tresholds',
    'rgl_3': [0.2,0.5,0.8,1.5,2],
    'rgl_4': [0.00001,0.00002,0.00003,0.00005,0.0001],
    'hpe_1': 'No tresholds',
    'hpe_2': 'No tresholds',
    'hpe_3': [0.02,0.05,0.08,0.15,0.2],
    'hpe_4': [0.05,0.1,0.2,0.5,1],
    'fvj_1': 'No tresholds',
    'fvj_2': 'No tresholds',
    'fvj_3': [0.002,0.005,0.008,0.015,0.02],
    'fvj_4': [0.00001,0.00002,0.00003,0.00005,0.0001],
    'plu_1': 'No tresholds',
    'plu_2': 'No tresholds',
    'plu_3': [100,200,400,600,1000],
    'plu_4': [0.001,0.002,0.004,0.005,0.01],
    'dng_1': 'No tresholds',
    'dng_2': 'No tresholds',
    'dng_3': [2,5,10,20,50],
    'dng_4': [0.05,0.1,0.2,0.5,1],
    'lsa_1': 'No tresholds',
    'lsa_2': 'No tresholds',
    'lsa_3': [2,5,10,20,50],
    'lsa_4': [0.05,0.1,0.2,0.5,1],
  },
  mapDataSet:[],
  chartsDataSet: [],
  selectMapData(){
    const diseaseColumn = 'patients'
    let geoColumn = 'adm3_ID'

    let sqlRequest = `SELECT SUM(${diseaseColumn}) AS result, COUNT(${diseaseColumn}) AS occurence, ${geoColumn} AS pcode, adm3 FROM epidata `
    sqlRequest += `WHERE ${diseaseColumn} IS NOT NULL`

    // TIME clause
    if (this.time_mode === 1) {
      sqlRequest += ` AND (year >= ${this.start_time['year']} AND year <= ${this.end_time['year']})`
    } else if (this.time_mode === 2) {
      // Get filtered months for first and last year, and all the months for intermediate years
      sqlRequest += ` AND ((year = ${this.start_time['year']} AND month >= ${this.start_time['month']})`
      const range = this.end_time['year'] - this.start_time['year']
      if (range > 0) {
        let year = this.start_time['year']
        for (var i = 0; i < range-1; i++) {
          year += 1
          sqlRequest += ` OR (year = ${year})`
        }
        sqlRequest += ` OR (year = ${this.end_time['year']} AND month <= ${this.end_time['month']}))`
      } else {
        sqlRequest += ` AND (year = ${this.end_time['year']} AND month <= ${this.end_time['month']}))`
      }

    } else if (this.time_mode === 3) {
      // Get filtered weeks for first and last year, and all the weeks for intermediate years
      sqlRequest += ` AND ((year = ${this.start_time['year']} AND week >= ${this.start_time['week']})`
      const range = this.end_time['year'] - this.start_time['year']
      if (range > 0) {
        let year = this.start_time['year']
        for (var i = 0; i < range-1; i++) {
          year += 1
          sqlRequest += ` OR (year = ${year})`
        }
        sqlRequest += ` OR (year = ${this.end_time['year']} AND week <= ${this.end_time['week']}))`
      } else {
        sqlRequest += ` AND (year = ${this.end_time['year']} AND week <= ${this.end_time['week']}))`
      }
    }


    //Location clause
    // Check if '*' is in area_list
    const allArea = contains.call(this.area_list, '*');
    // Several area are selectionned
    if (this.area_list.length > 1 && !allArea) {
      $.each(this.area_list, function(i, v){
        if (i == 0) {
          sqlRequest += ` AND (${geoColumn} LIKE '${v}'`
        } else {
          sqlRequest += ` OR ${geoColumn} LIKE '${v}'`
        }
      })
      sqlRequest += ')'
    }
    // All area are selectionned
    else if (this.area_list.length == 1 && allArea) {
      // No spatial condition
    }
    // Only one area is selectionned
    else if (this.area_list.length == 1 && !allArea) {
      sqlRequest += ` AND ${geoColumn} LIKE '${this.area_list[0]}'`
    }

    sqlRequest += ` GROUP BY ${geoColumn}, adm3`
    if (analyser.indicator == 3) {
      sqlRequest +=  `,year`
    }
    const sqlResult = epibase.exec(sqlRequest)
    // Initalise default values
    let maxvalue = 0
    this.mapDataSet = []
    // Check if sql result is not empty, if not, create mapDataSet
    if (typeof sqlResult[0].pcode !== 'undefined') {
      $.each(sqlResult, function(i, data){
        //Set max value for a proportionnal circle
        if (data.result > maxvalue) {
          maxvalue = data.result
        }
        // Build the map dataset
        analyser.mapDataSet.push({
          result: data.result,
          occurence: data.occurence,
          pcode: data.pcode,
          name: data.adm3
        })
      })
    }


    if (this.change_disease) {
      this.disease_MaxValue = maxvalue
    }
    //Set change_disease to false, max value for propotionnal circle are now setted for this disease
    this.change_disease = false
    this.selectChartsData()
  },
  selectChartsData(){
    // Build Table with mapDataSet
    $("#table-body").html('')
    if (this.mapDataSet.length > 0) {
      for (i of this.mapDataSet) {
        const chain = `<tr>
          <td>${i.name}</td>
          <td>${i.result}</td>
        </tr>`
        $("#table-body").append(chain)
      }
      $('#table-data').DataTable();
    } else {
      $("#table-body").html('<tr><td colspan=2>No result<td></tr>')
    }


    // $('.dataTables_length').addClass('bs-select');


    // Select Charts Data
    const diseaseColumn = 'patients'
    const geoColumn = 'adm3_ID'

    let sqlRequest = `SELECT month AS time, year, SUM(patients) AS patients, COUNT(patients) AS occurence FROM epidata `
    sqlRequest += `WHERE ${diseaseColumn} IS NOT NULL`
    let groupBy = ''
    let orderBy = ''

    sqlRequest += ` AND ((year = ${this.start_time['year']} AND month >= ${this.start_time['month']})`
    const range = this.end_time['year'] - this.start_time['year']
    if (range > 0) {
      let year = this.start_time['year']
      for (var i = 0; i < range-1; i++) {
        year += 1
        sqlRequest += ` OR (year = ${year})`
      }
      sqlRequest += ` OR (year = ${this.end_time['year']} AND month <= ${this.end_time['month']}))`
    } else {
      sqlRequest += ` AND (year = ${this.end_time['year']} AND month <= ${this.end_time['month']}))`
    }

    // Check if '*' is in area_list
    const allArea = contains.call(this.area_list, '*');
    // Several area are selectionned
    if (this.area_list.length > 1 && !allArea) {
      $.each(this.area_list, function(i, v){
        if (i == 0) {
          sqlRequest += ` AND (${geoColumn} LIKE '${v}'`
        } else {
          sqlRequest += ` OR ${geoColumn} LIKE '${v}'`
        }
      })
      sqlRequest += ')'
    }
    // All area are selectionned
    else if (this.area_list.length == 1 && allArea) {
      // No spatial condition
    }
    // Only one area is selectionned
    else if (this.area_list.length == 1 && !allArea) {
      sqlRequest += ` AND ${geoColumn} LIKE '${this.area_list[0]}'`
    }
    sqlRequest += ' GROUP BY month, year ORDER BY year, month'

    const sqlResult = epibase.exec(sqlRequest)

    this.chartsDataSet = []
    $.each(sqlResult, function(i, data){
      const attributes = data
      // Build the map dataset
      analyser.chartsDataSet.push({
        month: data.time,
        year: data.year,
        patients: data.patients,
        occurence: data.occurence
      })
    })

    this.displayData()
  },
  displayData(){
    // DISPLAY CHART
    let patients = [], months = []
    $.each(this.chartsDataSet, function(i, v) {
      months.push(numb2Month[v['month']]+' '+v['year'])
      patients.push(v['patients'])
    })
    makeCharts(months, patients)

    // DISPLAY MAP
    boundarieslayers.eachLayer(function(layer){
      if (mymap.hasLayer(layer)) {
        mymap.removeLayer(layer)
      }
    })
    eval('level'+this.geo_mode+'.addTo(mymap)')
    // Get tresholds for map representation
    const tresholds = this.tresholds[this.disease+"_"+this.indicator]
    // Set min/max of dataset for circles legend
    legend.circles.min = Infinity
    legend.circles.max = -Infinity
    $.each(this.mapDataSet, function(i,v){
      if (v['result'] < legend.circles.min) {
        legend.circles.min = parseInt(v['result'])
      }
      if (v['result'] > legend.circles.max) {
        legend.circles.max = parseInt(v['result'])
      }
    })
    // Call Mapper method to display data
    if (this.indicator == 1 || this.indicator == 2) {
      Mapper.displayCaseOrDeath(this.mapDataSet, this.disease_MaxValue)
    } else if (this.indicator == 3 || this.indicator == 4) {
      Mapper.displayMortalityOrAttack(this.mapDataSet, tresholds)
    }
    legend.setLegend(tresholds)
  }
}

// Watch for changes on the analyser object
function watchAnalyser(){
  watch(analyser, ["geo_mode", "time_range", "disease", "indicator", "circleMaxRadius", 'circleFill', 'circleContour', 'swatchsFill', 'tresholds'], function(){
    analyser.selectMapData()
  })
}
