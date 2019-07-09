const administrator = {
  logged: false,
  token: '',
  configuration: {
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
    }
  },
  manage(){
    //Manage geographic filters
    $('#admin-area-picker').selectpicker('destroy')
    let geoChain = '<select class="selectpicker form-control" multiple title="Maladie" id="admin-area-picker">'
    this.configuration.area.country ? geoChain += '<option value="country" selected>Pays</option>' : geoChain += '<option value="country">Pays</option>'
    this.configuration.area.region ? geoChain += '<option value="region" selected>Région</option>' : geoChain += '<option value="region">Région</option>'
    this.configuration.area.district ? geoChain += '<option value="district" selected>District</option>' : geoChain += '<option value="district">District</option>'
    this.configuration.area.zone ? geoChain += '<option value="zone" selected>Zone</option>' : geoChain += '<option value="zone">Zone</option>'
    geoChain += '</select>'
    $('#admin-area').html(geoChain)
    $('#admin-area-picker').selectpicker();
    // Update Adminstrator.configuration when user change settings
    $(document).on('change','#admin-area-picker',function(){
        const selection = $('#admin-area-picker').val();
        selection.includes('country') ? administrator.configuration.area.country = true : administrator.configuration.area.country = false
        selection.includes('region') ? administrator.configuration.area.region = true : administrator.configuration.area.region = false
        selection.includes('district') ? administrator.configuration.area.district = true : administrator.configuration.area.district = false
        selection.includes('zone') ? administrator.configuration.area.zone = true : administrator.configuration.area.zone = false
    });

    //Manage time filters
    $('#admin-time-picker').selectpicker('destroy')
    let timeChain = '<select class="selectpicker form-control" multiple title="Temps" id="admin-time-picker">'
    this.configuration.time.year ? timeChain += '<option value="year" selected>Années</option>' : timeChain += '<option value="year">Années</option>'
    this.configuration.time.month ? timeChain += '<option value="month" selected>Mois</option>' : timeChain += '<option value="month">Mois</option>'
    this.configuration.time.week ? timeChain += '<option value="week" selected>Semaines</option>' : timeChain += '<option value="week">Semaines</option>'
    timeChain += '</select>'
    $('#admin-time').html(timeChain)
    $('#admin-time-picker').selectpicker();
    // Update Adminstrator.configuration when user change settings
    $(document).on('change','#admin-time-picker',function(){
        const selection = $('#admin-time-picker').val();
        selection.includes('year') ? administrator.configuration.time.year = true : administrator.configuration.time.year = false
        selection.includes('month') ? administrator.configuration.time.month = true : administrator.configuration.time.month = false
        selection.includes('week') ? administrator.configuration.time.week = true : administrator.configuration.time.week = false
    });

    //Manage disease filters
    $('#admin-disease-picker').selectpicker('destroy')
    let diseaseChain = '<select class="selectpicker form-control" multiple title="Temps" id="admin-disease-picker">'
    this.configuration.disease.mgt ? diseaseChain += '<option value="mgt" selected>Méningite</option>' : diseaseChain += '<option value="mgt">Méningite</option>'
    this.configuration.disease.chl ? diseaseChain += '<option value="chl" selected>Cholera</option>' : diseaseChain += '<option value="chl">Cholera</option>'
    this.configuration.disease.rgl ? diseaseChain += '<option value="rgl" selected>Rougeole</option>' : diseaseChain += '<option value="rgl">Rougeole</option>'
    this.configuration.disease.hpe ? diseaseChain += '<option value="hpe" selected>Hépatite E</option>' : diseaseChain += '<option value="hpe">Hépatite E</option>'
    this.configuration.disease.fvj ? diseaseChain += '<option value="fvj" selected>Fièvre Jaune</option>' : diseaseChain += '<option value="fvj">Fièvre Jaune</option>'
    this.configuration.disease.plu ? diseaseChain += '<option value="plu" selected>Paludisme</option>' : diseaseChain += '<option value="plu">Paludisme</option>'
    this.configuration.disease.dng ? diseaseChain += '<option value="dng" selected>Dengue</option>' : diseaseChain += '<option value="dng">Dengue</option>'
    this.configuration.disease.lsa ? diseaseChain += '<option value="lsa" selected>Lassa</option>' : diseaseChain += '<option value="lsa">Lassa</option>'
    diseaseChain += '</select>'
    $('#admin-disease').html(diseaseChain)
    $('#admin-disease-picker').selectpicker();
    // Update Adminstrator.configuration when user change settings
    $(document).on('change','#admin-disease-picker',function(){
        const selection = $('#admin-disease-picker').val();
        selection.includes('mgt') ? administrator.configuration.disease.mgt = true : administrator.configuration.disease.mgt = false
        selection.includes('chl') ? administrator.configuration.disease.chl = true : administrator.configuration.disease.chl = false
        selection.includes('rgl') ? administrator.configuration.disease.rgl = true : administrator.configuration.disease.rgl = false
        selection.includes('hpe') ? administrator.configuration.disease.hpe = true : administrator.configuration.disease.hpe = false
        selection.includes('fvj') ? administrator.configuration.disease.fvj = true : administrator.configuration.disease.fvj = false
        selection.includes('plu') ? administrator.configuration.disease.plu = true : administrator.configuration.disease.plu = false
        selection.includes('dng') ? administrator.configuration.disease.dng = true : administrator.configuration.disease.dng = false
        selection.includes('lsa') ? administrator.configuration.disease.lsa = true : administrator.configuration.disease.lsa = false
    });

    //Manage indicator filters
    $('#admin-indicator-picker').selectpicker('destroy')
    let indicatorChain = '<select class="selectpicker form-control" multiple title="Maladie" id="admin-indicator-picker">'
    this.configuration.indicator.case ? indicatorChain += '<option value="case" selected>Cas</option>' : indicatorChain += '<option value="case">Cas</option>'
    this.configuration.indicator.death ? indicatorChain += '<option value="death" selected>Décès</option>' : indicatorChain += '<option value="death">Décès</option>'
    this.configuration.indicator.attack ? indicatorChain += '<option value="attack" selected>Taux d\'attaque /100000</option>' : indicatorChain += '<option value="attack">Taux d\'attaque /100000</option>'
    this.configuration.indicator.letality ? indicatorChain += '<option value="letality" selected>Létalité /100</option>' : indicatorChain += '<option value="letality">Létalité /100<</option>'
    this.configuration.indicator.vaccination ? indicatorChain += '<option value="vaccination" selected>Taux de vaccination /100<</option>' : indicatorChain += '<option value="vaccination">Taux de vaccination /100<</option>'
    indicatorChain += '</select>'
    $('#admin-indicator').html(indicatorChain)
    $('#admin-indicator-picker').selectpicker();
    // Update Adminstrator.configuration when user change settings
    $(document).on('change','#admin-indicator-picker',function(){
        const selection = $('#admin-indicator-picker').val();
        selection.includes('case') ? administrator.configuration.indicator.case = true : administrator.configuration.indicator.case = false
        selection.includes('death') ? administrator.configuration.indicator.death = true : administrator.configuration.indicator.death = false
        selection.includes('attack') ? administrator.configuration.indicator.attack = true : administrator.configuration.indicator.attack = false
        selection.includes('letality') ? administrator.configuration.indicator.letality = true : administrator.configuration.indicator.letality = false
        selection.includes('vaccination') ? administrator.configuration.indicator.vaccination = true : administrator.configuration.indicator.vaccination = false
    });

    // Update Adminstrator.default_selection when user change settings
    $(document).on('change','#init-area-picker',function(){
        administrator.configuration.default_selection.init_area = $('#init-area-picker').val()
      });
    $(document).on('change','#init-time-picker',function(){
        administrator.configuration.default_selection.init_time = $('#init-time-picker').val()
      });
    $(document).on('change','#init-disease-picker',function(){
        administrator.configuration.default_selection.init_disease = $('#init-disease-picker').val()
      });
    $(document).on('change','#init-indicator-picker',function(){
        administrator.configuration.default_selection.init_indicator = $('#init-indicator-picker').val()
      });
    // User click on the save button
    $("#saveFilters").click((e)=>{
      e.preventDefault()
      this.saveFilters()
    })
    // USER ADD A NEW DATASET
    const inputElement = document.getElementById("newdataset")
    inputElement.addEventListener("change", this.addData, false)
  },
  saveFilters(){
    const config = [{"attributes": {
      objectid: 1,
      id: 1,
      nom: "Western and Central Africa",
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
      init_indicator: this.configuration.default_selection.init_indicator
    }}]
    // UPDATE APPLICATION PARAMETERS
    $.ajax({
        url: `https://gis.msf.org/arcgis/rest/services/dkr/dkr_edit/FeatureServer/3/updateFeatures?token=${this.token}`,
        type: "POST",
        data: {
            "features": JSON.stringify(config),
            "f": "json",
            rollbackOnFailure: true
        }
    }).done(function(response){
      response.updateResults ? location.reload() : addNotify('Erreur','danger')
    }).fail(function(error){
      console.log(response);
    })
  },
  addData(data){
    $('#loading-text').html('Lecture du jeu de données')
    $('.overlay-loader').show()
    const file= this.files[0]
    const resultTable = []
    Papa.parse(file, {
      download: true,
      header: true,
    	step: function(row) {
        const formatedData = {
          lvl1: row.data[0].lvl1_name,
          lvl1code: row.data[0].lvl1_pcode,
          lvl2: row.data[0].lvl2_name,
          lvl2code: row.data[0].lvl2_pcode,
          lvl3: row.data[0].lvl3_name,
          lvl3code: row.data[0].lvl3_pcode,
          year: parseInt(row.data[0].year),
          month: parseInt(row.data[0].month),
          week: parseInt(row.data[0].week),
          mgt_1: stringToNumber(row.data[0].mgt_cas),
          mgt_2: stringToNumber(row.data[0].mgt_deces),
          mgt_3: stringToNumber(row.data[0].mgt_ta),
          mgt_4: stringToNumber(row.data[0].mgt_tm),
          mgt_5: stringToNumber(row.data[0].mgt_vacci),
          chl_1: stringToNumber(row.data[0].chl_cas),
          chl_2: stringToNumber(row.data[0].chl_deces),
          chl_3: stringToNumber(row.data[0].chl_ta),
          chl_4: stringToNumber(row.data[0].chl_tm),
          chl_5: stringToNumber(row.data[0].chl_vacci),
          rgl_1: stringToNumber(row.data[0].rgl_cas),
          rgl_2: stringToNumber(row.data[0].rgl_deces),
          rgl_3: stringToNumber(row.data[0].rgl_ta),
          rgl_4: stringToNumber(row.data[0].rgl_tm),
          rgl_5: stringToNumber(row.data[0].rgl_vacci),
          hpe_1: stringToNumber(row.data[0].hpe_cas),
          hpe_2: stringToNumber(row.data[0].hpe_deces),
          hpe_3: stringToNumber(row.data[0].hpe_ta),
          hpe_4: stringToNumber(row.data[0].hpe_tm),
          hpe_5: stringToNumber(row.data[0].hpe_vacci),
          fvj_1: stringToNumber(row.data[0].fvj_cas),
          fvj_2: stringToNumber(row.data[0].fvj_deces),
          fvj_3: stringToNumber(row.data[0].fvj_ta),
          fvj_4: stringToNumber(row.data[0].fvj_tm),
          fvj_5: stringToNumber(row.data[0].fvj_vacci),
          plu_1: stringToNumber(row.data[0].plu_cas),
          plu_2: stringToNumber(row.data[0].plu_deces),
          plu_3: stringToNumber(row.data[0].plu_ta),
          plu_4: stringToNumber(row.data[0].plu_tm),
          plu_5: stringToNumber(row.data[0].plu_vacci),
          dng_1: stringToNumber(row.data[0].dng_cas),
          dng_2: stringToNumber(row.data[0].dng_deces),
          dng_3: stringToNumber(row.data[0].dng_ta),
          dng_4: stringToNumber(row.data[0].dng_tm),
          dng_5: stringToNumber(row.data[0].dng_vacci),
          lsa_1: stringToNumber(row.data[0].lsa_cas),
          lsa_2: stringToNumber(row.data[0].lsa_deces),
          lsa_3: stringToNumber(row.data[0].lsa_ta),
          lsa_4: stringToNumber(row.data[0].lsa_tm),
          lsa_5: stringToNumber(row.data[0].lsa_vacci)
        }
        // Check if dataset contains empty line:
        if (formatedData.week === null || formatedData.week === undefined) {
          console.log('A null value has been detected:', formatedData);
        } else if (isNaN(formatedData.week) || isNaN(formatedData.month) || isNaN(formatedData.year)) {
          console.log('A wrong value has been detected on columns Year/Month/Week');
        } else {
          resultTable.push(formatedData)
        }
    	},
    	complete: async function() {
        console.log(resultTable);
        const backup = await saveData(administrator.token)
        let insert = false
        if (backup) {
          insert = await insertData(resultTable, administrator.token)
        }
        if (insert) {
           $('#loading-text').html('Sauvegarde réussie, redémarrage en cours')
           setTimeout(location.reload(), 3000);
        } else {
          $('.overlay-loader').hide()
          addNotify('Une erreur a eu lieu, contactez l\'administrateur pour réinitialiser l\'application','danger', 10000)
        }
    	}
    });
  }
}





async function saveData(token) {
 $('#loading-text').html('Sauvegarde des données antérieures')
 const tresholds = await setAPITresholds(token);
 const records = await getRecords(tresholds);
 const backup = await saveBackUp(records, token)
 let purge
 if (backup) {
   purge = await purgeTable(token)
 }
 console.log(purge);
 return purge.success
}


async function setAPITresholds(token){
  const count = await $.ajax({
    type: 'GET',
    dataType: 'json',
    url:'https://gis.msf.org/arcgis/rest/services/dkr/dkr_edit/FeatureServer/1/query?where=1%3D1&returnGeometry=false&outStatistics=%5B%0D%0A%7B%0D%0A++++%22statisticType%22%3A+%22min%22%2C%0D%0A++++%22onStatisticField%22%3A+%22objectid%22%2C%0D%0A++++%22outStatisticFieldName%22%3A+%22MinID%22%0D%0A++%7D%2C%0D%0A%7B%0D%0A++++%22statisticType%22%3A+%22max%22%2C%0D%0A++++%22onStatisticField%22%3A+%22objectid%22%2C%0D%0A++++%22outStatisticFieldName%22%3A+%22MaxID%22%0D%0A++%7D%0D%0A%5D &token='+token+'&f=json'
  })
  const min = count.features[0].attributes.minid
  const max = count.features[0].attributes.maxid
  const tresholds = []
  let i = min
  while (i < max) {
    tresholds.push(i)
    i += 999
  }
  tresholds.push(max)
  return tresholds
}

async function getRecords(tresholds){
  const records = []
  for (var i = 0; i < tresholds.length -1; i++) {
    const query = `https://gis.msf.org/arcgis/rest/services/dkr/dkr_view/MapServer/4/query?where=objectid+>=+${tresholds[i]}+AND+objectid+%3C+${tresholds[i+1]}&outFields=*&returnGeometry=false&f=json`
    const results = await $.ajax({
      type: 'POST',
      dataType: 'json',
      url: query
    })
    for (result of results.features) {
      result.attributes.backup_date = new Date(Date.now()).toLocaleString()
      records.push(result.attributes)
    }
  }
  return records
}

async function saveBackUp(records, token){
  const tresholds = []
  let success
  let saveSuccess= true
  for (var i = 0; i < records.length; i++) {
    if (i % 5000 == 0) {
      tresholds.push(i)
    }
  }
  tresholds.push(records.length)
  for (var i = 0; i < tresholds.length -1; i++) {
    const temparray = []
    for (var j = tresholds[i]; j < tresholds[i+1]; j++) {
      temparray.push({attributes:records[j]})
    }
    success = await $.ajax({
        url: `https://gis.msf.org/arcgis/rest/services/dkr/dkr_edit/FeatureServer/9/addFeatures?token=${token}`,
        type: "POST",
        data: {
            "features": JSON.stringify(temparray),
            "f": "json",
            rollbackOnFailure: true
        }
    })
    if (!success.addResults) {
      saveSuccess = false
    }
  }
  return saveSuccess
}


async function purgeTable(token){
  const purge = await $.ajax({
      url: `https://gis.msf.org/arcgis/rest/services/dkr/dkr_edit/FeatureServer/4/deleteFeatures?token=${token}`,
      type: "POST",
      data: {
          objectIds: '',
          where: "1=1",
          f: "json",
          rollbackOnFailure: true,
      }
  })
  return purge
}


async function insertData(dataset, token){
  $('#loading-text').html('Enregistrement des données')
  const tresholds = []
  let success
  let saveSuccess= true
  for (var i = 0; i < dataset.length; i++) {
      if (i % 5000 == 0) {
        tresholds.push(i)
      }
    }
  tresholds.push(dataset.length)
  for (var i = 0; i < tresholds.length -1; i++) {
    const temparray = []
    for (var j = tresholds[i]; j < tresholds[i+1]; j++) {
      temparray.push({attributes:dataset[j]})
    }
    success = await $.ajax({
        url: `https://gis.msf.org/arcgis/rest/services/dkr/dkr_edit/FeatureServer/4/addFeatures?token=${token}`,
        type: "POST",
        data: {
            "features": JSON.stringify(temparray),
            "f": "json",
            rollbackOnFailure: true
        }
    })
    if (!success.addResults) {
      saveSuccess = false
    }
  }
  return saveSuccess
}


function getToken(login, password){
  $.ajax({
    url: 'https://gis.msf.org/arcgis/tokens/generateToken',
    type: 'POST',
    data: {
      'username': login,
      'password': password,
      'expiration': 86000,
      'client': 'referer',
      'referer': window.location.origin,
      'f': 'json'
    },
    dataType: 'json'
  })
  .done(function(response){
    if (response.token) {
      administrator.token = response.token
      administrator.logged = true
      $('#loginModal').modal('hide')
      // addNotify('Connexion réussie','success')
      $('#loginButton').removeClass('d-inline-flex').addClass('d-none')
      $('#logoutButton').removeClass('d-none').addClass('d-inline-flex')
      $('#export-left-menu').show()
      $('#admin-left-menu').show()
    } else {
      addNotify('Erreur de connexion','danger')
    }
  })
  .fail(function(response){
    console.log('error');
  })
}

// Show the buttons to save modifications when administrator is logged
watch(administrator, ["logged"], function(){
  if (administrator.logged) {
    $('.admin-save-button').show()
  }
})

$("#saveCirclesChanges").unbind().click(e => {
  e.preventDefault()
  const config = [{"attributes": {
    objectid: 1,
    circles_radius: analyser.circleMaxRadius,
    circles_fill: analyser.circleFill,
    circles_contour: analyser.circleContour
  }}]

  $.ajax({
      url: `https://gis.msf.org/arcgis/rest/services/dkr/dkr_edit/FeatureServer/3/updateFeatures?token=${administrator.token}`,
      type: "POST",
      data: {
          "features": JSON.stringify(config),
          "f": "json",
          rollbackOnFailure: true
      }
  }).done(function(response){
    if (response.updateResults) {
      addNotify('Modifications enregistrées','success')
    } else {
      addNotify('Erreur','danger')
    }
  }).fail(function(error){
    console.log(response);
  })
})

$('#saveSwatchChanges').unbind().click(e => {
  e.preventDefault
  const config = [{"attributes": {
    objectid: 1,
    treshold_0: analyser.swatchsFill['0'],
    treshold_1: analyser.swatchsFill['1'],
    treshold_2: analyser.swatchsFill['2'],
    treshold_3: analyser.swatchsFill['3'],
    treshold_4: analyser.swatchsFill['4'],
    treshold_5: analyser.swatchsFill['5'],
    treshold_6: analyser.swatchsFill['6']
  }}]

  $.ajax({
      url: `https://gis.msf.org/arcgis/rest/services/dkr/dkr_edit/FeatureServer/10/updateFeatures?token=${administrator.token}`,
      type: "POST",
      data: {
          "features": JSON.stringify(config),
          "f": "json",
          rollbackOnFailure: true
      }
  }).done(function(response){
    if (response.updateResults) {
      addNotify('Les codes couleurs ont été correctement mis à jour', 'success')
    } else {
      addNotify('Erreur: Code couleurs', 'danger')
    }
  }).fail(function(error){
    console.log(response);
  })

  const tresholdsArray = tresholdsToDBArrays()
  $.ajax({
      url: `https://gis.msf.org/arcgis/rest/services/dkr/dkr_edit/FeatureServer/8/updateFeatures?token=${administrator.token}`,
      type: "POST",
      data: {
          "features": JSON.stringify(tresholdsArray),
          "f": "json",
          rollbackOnFailure: true
      }
  }).done(function(response){
    if (response.updateResults) {
      addNotify('Les seuils ont été correctement mis à jour', 'success')
    } else {
      addNotify('Erreur: Seuils', 'danger')
    }
  }).fail(function(error){
    console.log(response);
  })
})
