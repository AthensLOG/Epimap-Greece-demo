const offliner = {
  configuration: {
    name: '',
    area: {
      country: false,
      region: false,
      district: false,
      zone: false
    },
    time: {
      year: false,
      month: false,
      week: false
    },
    disease:{
      mgt: false,
      chl: false,
      rgl: false,
      hpe: false,
      fvj: false,
      plu: false,
      dng: false,
      lsa: false
    },
    indicator:{
      case: false,
      death: false,
      attack: false,
      letality: false,
      vaccination: false
    },
    default_selection:{
      init_area: 1,
      init_time: 1,
      init_disease: 'mgt',
      init_indicator:1
    },
    dataSelection:{
      countries:[],
      levels:[],
      disease:'',
      indicators:[]
    }
  },
  configure(){
    // Get countries list and build select picker
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: 'https://gis.msf.org/arcgis/rest/services/dkr/dkr_view/MapServer/2/query?where=1%3D1&outFields=pcode%2C+name&returnGeometry=false&f=pjson'
    }).done(countries => {
      $('#offline-country-picker').html()
      $('#offline-country-picker').selectpicker('destroy')
      for (country of countries.features) {
        $('#offline-country-picker').append(`<option value="${country.attributes.pcode}">${country.attributes.name}</option>`)
      }
      $('#offline-country-picker').selectpicker();
    })
    // Set Export Name
    $(document).on('change','#offline-app-name',function(){
        const selection = $('#offline-app-name').val();
        $('#offline-app-name').removeClass("error-validation")//if validation error, remove error style when user write something
        offliner.configuration.name = selection
    });
    // Set selected countries
    $(document).on('change','#offline-country-picker',function(){
        const selection = $('#offline-country-picker').val();
        $('#offline-country-picker-title').removeClass("error-validation")//if validation error, remove error style when user write something
        offliner.configuration.dataSelection.countries = selection
    });
    // Set selected geographic levels
    $(document).on('change','#offline-area-picker',function(){
        const selection = $('#offline-area-picker').val();
        $('#offline-area-picker-title').removeClass("error-validation")//if validation error, remove error style when user write something
        $('#init-offline-area-picker').selectpicker('destroy')
        // Update the default selection picker
        let initpicker = '<select class="selectpicker form-control" title="Echelle" id="init-offline-area-picker">'
        offliner.configuration.dataSelection.levels = []
        if (selection.includes('country')) {
          offliner.configuration.area.country = true
          offliner.configuration.dataSelection.levels.push('lvl4', 'lvl4code')
          initpicker += '<option value="4">Pays</option>'
        } else {
          offliner.configuration.area.country = false
        }
        if (selection.includes('region')) {
          offliner.configuration.area.region = true
          offliner.configuration.dataSelection.levels.push('lvl3', 'lvl3code')
          initpicker += '<option value="3">Régions</option>'
        } else {
          offliner.configuration.area.region = false
        }
        if (selection.includes('district')) {
          offliner.configuration.area.district = true
          offliner.configuration.dataSelection.levels.push('lvl2', 'lvl2code')
          initpicker += '<option value="2">Districts</option>'
        } else {
          offliner.configuration.area.district = false
        }
        if (selection.includes('zone')) {
          offliner.configuration.area.zone = true
          offliner.configuration.dataSelection.levels.push('lvl1', 'lvl1code')
          initpicker += '<option value="1">Zones</option>'
        } else {
          offliner.configuration.area.zone = false
        }
        initpicker += '</select>'
        $('#init-offline-area').html(initpicker)
        $('#init-offline-area-picker').selectpicker();
    });

    // Set selected time ranges
    $(document).on('change','#offline-time-picker',function(){
        const selection = $('#offline-time-picker').val();
        $('#offline-time-picker-title').removeClass("error-validation")//if validation error, remove error style when user write something
        $('#init-offline-time-picker').selectpicker('destroy')
        // Update the default selection picker
        let initpicker = '<select class="selectpicker form-control" title="Temps" id="init-offline-time-picker">'
        selection.includes('year') ? (offliner.configuration.time.year = true, initpicker += '<option value="1">Années</option>') : offliner.configuration.time.year = false
        selection.includes('month') ? (offliner.configuration.time.month = true, initpicker += '<option value="2">Mois</option>') : offliner.configuration.time.month = false
        selection.includes('week') ? (offliner.configuration.time.week = true, initpicker += '<option value="3">Semaines</option>') : offliner.configuration.time.week = false
        initpicker += '</select>'
        $('#init-offline-time').html(initpicker)
        $('#init-offline-time-picker').selectpicker();
    });

    $(document).on('change','#offline-disease-picker',function(){
        const selection = $('#offline-disease-picker').val();
        $('#offline-disease-picker-title').removeClass("error-validation")//if validation error, remove error style when user write something
        selection.includes('mgt') ? (offliner.configuration.disease.mgt = true, offliner.configuration.default_selection.init_disease = 'mgt') : offliner.configuration.disease.mgt = false
        selection.includes('chl') ? (offliner.configuration.disease.chl = true, offliner.configuration.default_selection.init_disease = 'chl') : offliner.configuration.disease.chl = false
        selection.includes('rgl') ? (offliner.configuration.disease.rgl = true, offliner.configuration.default_selection.init_disease = 'rgl') : offliner.configuration.disease.rgl = false
        selection.includes('hpe') ? (offliner.configuration.disease.hpe = true, offliner.configuration.default_selection.init_disease = 'hpe') : offliner.configuration.disease.hpe = false
        selection.includes('fvj') ? (offliner.configuration.disease.fvj = true, offliner.configuration.default_selection.init_disease = 'fvj') : offliner.configuration.disease.fvj = false
        selection.includes('plu') ? (offliner.configuration.disease.plu = true, offliner.configuration.default_selection.init_disease = 'plu') : offliner.configuration.disease.plu = false
        selection.includes('dng') ? (offliner.configuration.disease.dng = true, offliner.configuration.default_selection.init_disease = 'dng') : offliner.configuration.disease.dng = false
        selection.includes('lsa') ? (offliner.configuration.disease.lsa = true, offliner.configuration.default_selection.init_disease = 'lsa') : offliner.configuration.disease.lsa = false
    });

    $(document).on('change','#offline-indicator-picker',function(){
        const selection = $('#offline-indicator-picker').val();
        $('#offline-indicator-picker-title').removeClass("error-validation")//if validation error, remove error style when user write something
        offliner.configuration.dataSelection.indicators = []
        $('#init-offline-indicator-picker').selectpicker('destroy')
        // Update the default selection picker
        let initpicker = '<select class="selectpicker form-control" title="Indicateur" id="init-offline-indicator-picker">'
        if (selection.includes('case')) {
          offliner.configuration.indicator.case = true
          offliner.configuration.dataSelection.indicators.push('1')
          initpicker += '<option value="1">Cas</option>'
        } else {
          offliner.configuration.indicator.case = false
        }
        if (selection.includes('death')) {
          offliner.configuration.indicator.death = true
          offliner.configuration.dataSelection.indicators.push('2')
          initpicker += '<option value="2">Décès</option>'
        } else {
          offliner.configuration.indicator.death = false
        }
        if (selection.includes('attack')) {
          offliner.configuration.indicator.attack = true
          offliner.configuration.dataSelection.indicators.push('3')
          initpicker += `<option value="3">Taux d'attaque / 10000</option>`
        } else {
          offliner.configuration.indicator.attack = false
        }
        if (selection.includes('letality')) {
          offliner.configuration.indicator.letality = true
          offliner.configuration.dataSelection.indicators.push('4')
          initpicker += `<option value="4">Létalité / 100</option>`
        } else {
          offliner.configuration.indicator.letality = false
        }
        if (selection.includes('vaccination')) {
          offliner.configuration.indicator.vaccination = true
          offliner.configuration.dataSelection.indicators.push('5')
          initpicker += `<option value="5">Taux de vaccination / 100</option>`
        } else {
          offliner.configuration.indicator.vaccination = false
        }
        initpicker += '</select>'
        $('#init-offline-indicator').html(initpicker)
        $('#init-offline-indicator-picker').selectpicker();
    });

    $(document).on('change','#init-offline-area-picker',function(){
      $('#init-offline-area-picker-title').removeClass("error-validation")//if validation error, remove error style when user write something
      offliner.configuration.default_selection.init_area = $('#init-offline-area-picker').val()
    });
    $(document).on('change','#init-offline-time-picker',function(){
      $('#init-offline-time-picker-title').removeClass("error-validation")//if validation error, remove error style when user write something
      offliner.configuration.default_selection.init_time = $('#init-offline-time-picker').val()
    });
    $(document).on('change','#init-offline-indicator-picker',function(){
      $('#init-offline-indicator-picker-title').removeClass("error-validation")//if validation error, remove error style when user write something
      offliner.configuration.default_selection.init_indicator = $('#init-offline-indicator-picker').val()
    });

    $('#exportOffline').unbind().click(e => {
      e.preventDefault
      this.checkConfiguration()
    })
  },
  // Check if all fields are correctly filled
  checkConfiguration(){
    let formChecked = true
    if ($('#offline-app-name').val() == '') {
      $('#offline-app-name').addClass("error-validation")
      addNotify("Veuillez saisir un nom pour l'export", 'danger')
      formChecked = false
    }
    if ($('#offline-country-picker').val() == '') {
      $('#offline-country-picker-title').addClass("error-validation")
      addNotify("Veuillez sélectionner au moins un pays", 'danger')
      formChecked = false
    }
    if ($('#offline-area-picker').val() == '') {
      $('#offline-area-picker-title').addClass("error-validation")
      addNotify("Veuillez sélectionner au moins un niveau géographique", 'danger')
      formChecked = false
    }
    if ($('#offline-time-picker').val() == '') {
      $('#offline-time-picker-title').addClass("error-validation")
      addNotify("Veuillez sélectionner au moins une unité temporelle", 'danger')
      formChecked = false
    }
    if ($('#offline-disease-picker').val() == '') {
      $('#offline-disease-picker-title').addClass("error-validation")
      addNotify("Veuillez sélectionner une maladie", 'danger')
      formChecked = false
    }
    if ($('#offline-indicator-picker').val() == '') {
      $('#offline-indicator-picker-title').addClass("error-validation")
      addNotify("Veuillez sélectionner au moins un indicateur", 'danger')
      formChecked = false
    }
    if ($('#init-offline-area-picker').val() == '') {
      $('#init-offline-area-picker-title').addClass("error-validation")
      addNotify("Veuillez sélectionner le niveau géographique par défaut", 'danger')
      formChecked = false
    }
    if ($('#init-offline-time-picker').val() == '') {
      $('#init-offline-time-picker-title').addClass("error-validation")
      addNotify("Veuillez sélectionner l'unité temporelle par défaut", 'danger')
      formChecked = false
    }
    if ($('#init-offline-indicator-picker').val() == '') {
      $('#init-offline-indicator-picker-title').addClass("error-validation")
      addNotify("Veuillez sélectionner l'indicateur par défaut", 'danger')
      formChecked = false
    }

    // IF form is validate, launch export
    if (formChecked) {
      this.saveConfiguration()
      $('#modaloffline').modal('hide')
      $('.overlay-loader').show()
      $('#loading-text').html("Génération de l'archive en cours")
    }
  },
  saveConfiguration(){
    const config = {
      nom: this.configuration.name,
      pays: this.configuration.area.country.toString().toUpperCase(),
      region: this.configuration.area.region.toString().toUpperCase(),
      district: this.configuration.area.district.toString().toUpperCase(),
      zone: this.configuration.area.zone.toString().toUpperCase(),
      annee: this.configuration.time.year.toString().toUpperCase(),
      mois: this.configuration.time.month.toString().toUpperCase(),
      semaine: this.configuration.time.week.toString().toUpperCase(),
      jour: "FALSE",
      meningite: this.configuration.disease.mgt.toString().toUpperCase(),
      cholera: this.configuration.disease.chl.toString().toUpperCase(),
      rougeole: this.configuration.disease.rgl.toString().toUpperCase(),
      hepatite_e: this.configuration.disease.hpe.toString().toUpperCase(),
      fievre_jaune: this.configuration.disease.fvj.toString().toUpperCase(),
      paludisme: this.configuration.disease.plu.toString().toUpperCase(),
      dengue: this.configuration.disease.dng.toString().toUpperCase(),
      lassa: this.configuration.disease.lsa.toString().toUpperCase(),
      cas: this.configuration.indicator.case.toString().toUpperCase(),
      deces: this.configuration.indicator.death.toString().toUpperCase(),
      taux_attaque: this.configuration.indicator.attack.toString().toUpperCase(),
      letalite: this.configuration.indicator.letality.toString().toUpperCase(),
      taux_vaccination: this.configuration.indicator.vaccination.toString().toUpperCase(),
      init_area: this.configuration.default_selection.init_area,
      init_time: this.configuration.default_selection.init_time,
      init_disease: this.configuration.default_selection.init_disease,
      init_indicator: this.configuration.default_selection.init_indicator,
      circles_radius: analyser.circleMaxRadius,
      circles_fill: analyser.circleFill,
      circles_contour: analyser.circleContour,
      swatchsFill: analyser.swatchsFill,
      tresholds: analyser.tresholds
    }
    // A STOCKER DANS FICHIER PAR MAPCENTER

    // GET EPIDATA
    const options = {
      url: 'https://gis.msf.org/arcgis/rest/services/dkr/dkr_view/MapServer/4'
    }
    let whereClause = ''
    for (var i = 0; i < this.configuration.dataSelection.countries.length; i++) {
      i == 0 ? whereClause += `lvl4code='${this.configuration.dataSelection.countries[i]}'` :  whereClause += ` OR lvl4code='${this.configuration.dataSelection.countries[i]}'`
    }

    let outFields = 'week, month, year'
    for (level of this.configuration.dataSelection.levels) {
      outFields += ', '+level
    }
    for (indicator of this.configuration.dataSelection.indicators) {
      outFields += ', '+this.configuration.default_selection.init_disease+'_'+indicator
    }
    const datasetGetter = new CartONG.ArcgisService(options)
    $.when(datasetGetter.loadDefinition())
      .done(function(serviceDefinition) {
        console.log(serviceDefinition);
        const params = {
          returnGeometry: false,
          f: 'json',
          where: whereClause,
          outFields: outFields
        }
        datasetGetter.getData(params)
              .done(function(data) {
                const arrayData = []
                for (item of data.features) {
                  arrayData.push(item.attributes)
                }
                const csv = Papa.unparse(arrayData)
                // A STOCKER DANS FICHIER PAR MAPCENTER
                console.log(csv);
                const blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'dataset.csv';
                link.click();
                $('.overlay-loader').hide()
              })
      })

    // console.log(dataSetGetter);
    const dataset = {
      data: [],
      timeRange:{
        year:[],
        month:[],
        week:[]
      }
    }

    // GET GEOGRAPHIC LAYERS
    // if (this.configuration.area.country) {
    //   const options = {
    //     url: 'https://gis.msf.org/arcgis/rest/services/dkr/dkr_view/MapServer/2'
    //   }
    //   let whereClause = ''
    //   for (var i = 0; i < this.configuration.dataSelection.countries.length; i++) {
    //     i == 0 ? whereClause += `pcode='${this.configuration.dataSelection.countries[i]}'` :  whereClause += ` OR pcode='${this.configuration.dataSelection.countries[i]}'`
    //   }
    //   const countriesGetter = new CartONG.ArcgisService(options)
    //   $.when(countriesGetter.loadDefinition())
    //     .done(function(serviceDefinition) {
    //       const params = {
    //         returnGeometry: true,
    //         f: 'GeoJSON',
    //         where: whereClause
    //       }
    //       countriesGetter.getData(params)
    //             .done(function(data) {
    //               console.log(data);
    //             })
    //     })
    // }
    // if (this.configuration.area.region) {
    //   const options = {
    //     url: 'https://gis.msf.org/arcgis/rest/services/dkr/dkr_view/MapServer/1'
    //   }
    //   let whereClause = ''
    //   for (var i = 0; i < this.configuration.dataSelection.countries.length; i++) {
    //     i == 0 ? whereClause += `pcode like '${this.configuration.dataSelection.countries[i]}%'` :  whereClause += ` OR pcode like '${this.configuration.dataSelection.countries[i]}%'`
    //   }
    //   const regionsGetter = new CartONG.ArcgisService(options)
    //   $.when(regionsGetter.loadDefinition())
    //     .done(function(serviceDefinition) {
    //       const params = {
    //         returnGeometry: true,
    //         f: 'GeoJSON',
    //         where: whereClause
    //       }
    //       regionsGetter.getData(params)
    //             .done(function(data) {
    //               console.log(data);
    //             })
    //     })
    // }
    // if (this.configuration.area.district) {
    //   const options = {
    //     url: 'https://gis.msf.org/arcgis/rest/services/dkr/dkr_view/MapServer/0'
    //   }
    //   let whereClause = ''
    //   for (var i = 0; i < this.configuration.dataSelection.countries.length; i++) {
    //     i == 0 ? whereClause += `pcode like '${this.configuration.dataSelection.countries[i]}%'` :  whereClause += ` OR pcode like '${this.configuration.dataSelection.countries[i]}%'`
    //   }
    //   const districtsGetter = new CartONG.ArcgisService(options)
    //   $.when(districtsGetter.loadDefinition())
    //     .done(function(serviceDefinition) {
    //       const params = {
    //         returnGeometry: true,
    //         f: 'GeoJSON',
    //         where: whereClause
    //       }
    //       districtsGetter.getData(params)
    //             .done(function(data) {
    //               console.log(data);
    //             })
    //     })
    // }


    console.log(config);
  }
}
