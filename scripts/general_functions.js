// Function to check if a value is contained in a Array
const contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;
    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;
            for(i = 0; i < this.length; i++) {
                var item = this[i];
                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    }
    return indexOf.call(this, needle) > -1;
};

// Group an array of object by an object key
const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }),
  {},
);

function roundNumber(inNumber) {
  return (Math.round(inNumber/10) * 10);
}

// Variable to convert month number to month name
const numb2Month = {
	'1': 'Jan',
	'2': 'Feb',
	'3': 'Mar',
	'4': 'Apr',
	'5': 'May',
	'6': 'June',
	'7': 'July',
	'8': 'Aug',
	'9': 'Sept',
	'10': 'Oct',
	'11': 'Nov',
	'12': 'Dec',
}

//Function to convert hex format to a rgb color
function hex2rgb(hex,opacity){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);
    result = 'rgba('+r+','+g+','+b+',0.7)';
    return result;
}

// Check if value == TRUE
const isTrue = (value) => value == 'TRUE'

function stringToNumber(value){
  if (value == ""){
      return null
  } else {
    return Number(value)
  }

}

function getSurveyInfos(){
  const infos = {}
  if (analyser.time_mode == 1) {
    infos.time = 'Année'
  } else if (analyser.time_mode == 2) {
    infos.time = 'Mois'
  } else if (analyser.time_mode == 3) {
    infos.time = 'Semaine'
  }
  if (analyser.disease == 'mgt') {
    infos.disease = 'Méningite'
  } else if (analyser.disease == 'chl') {
    infos.disease = 'Cholera'
  } else if (analyser.disease == 'rgl') {
    infos.disease = 'Rougeole'
  } else if (analyser.disease == 'hpe') {
    infos.disease = 'Hépatite'
  } else if (analyser.disease == 'fvj') {
    infos.disease = 'Fièvre'
  } else if (analyser.disease == 'plu') {
    infos.disease = 'Paludisme'
  } else if (analyser.disease == 'dng') {
    infos.disease = 'Dengue'
  } else if (analyser.disease == 'lsa') {
    infos.disease = 'Lassa'
  }
  if (analyser.indicator == 1) {
    infos.indicator = 'Cas'
  } else if (analyser.indicator == 2) {
    infos.indicator = 'Décès'
  } else if (analyser.indicator == 3) {
    infos.indicator = "Taux d'attaque /1000"
  } else if (analyser.indicator == 4) {
    infos.indicator = 'Létalité'
  } else if (analyser.indicator == 5) {
    infos.indicator = 'Taux de vaccination'
  }
  if (analyser.geo_mode == 4) {
    infos.geography = 'Pays'
  } else if (analyser.geo_mode == 3) {
    infos.geography = 'Région'
  } else if (analyser.geo_mode == 2) {
    infos.geography = 'District'
  } else if (analyser.geo_mode == 1) {
    infos.geography = 'Zone'
  }
  if (analyser.time_mode == 1) {
    infos.range = `Début ${analyser.start_time.year} - Fin ${analyser.end_time.year}`
  } else if (analyser.time_mode == 2) {
    infos.range = `${numb2Month[analyser.start_time.month]} ${analyser.start_time.year} - ${numb2Month[analyser.end_time.month]} ${analyser.end_time.year}`
  } else if (analyser.time_mode == 3) {
    infos.range = `Sem ${analyser.start_time.week}/${analyser.start_time.year} - Sem ${analyser.end_time.week}/${analyser.end_time.year}`
  }
  return infos
}

function addNotify(message, type, delay=2000){
  if (type == "success") {
    $.notify({
        message: message
      },{
        type: 'success',
        delay: delay,
        z_index: 2000,
    })
  } else if (type == "danger") {
    $.notify({
        message: message
      },{
        type: 'danger',
        delay: delay,
        z_index: 2000,
    })
  }
}

function tresholdsToDBArrays(){
  const array = []
  console.log(analyser.tresholds["mgt_3"][0]);
  const lineOne = {"attributes": {
    objectid: 1,
    mgt_3: analyser.tresholds["mgt_3"][0],
    mgt_4: analyser.tresholds["mgt_4"][0],
    chl_3: analyser.tresholds["chl_3"][0],
    chl_4: analyser.tresholds["chl_4"][0],
    rgl_3: analyser.tresholds["rgl_3"][0],
    rgl_4: analyser.tresholds["rgl_4"][0],
    hpe_3: analyser.tresholds["hpe_3"][0],
    hpe_4: analyser.tresholds["hpe_4"][0],
    fvj_3: analyser.tresholds["fvj_3"][0],
    fvj_4: analyser.tresholds["fvj_4"][0],
    plu_3: analyser.tresholds["plu_3"][0],
    plu_4: analyser.tresholds["plu_4"][0],
    dng_3: analyser.tresholds["dng_3"][0],
    dng_4: analyser.tresholds["dng_4"][0],
    lsa_3: analyser.tresholds["lsa_3"][0],
    lsa_4: analyser.tresholds["lsa_4"][0]
  }}
  array.push(lineOne)
  const lineTwo = {"attributes": {
    objectid: 2,
    mgt_3: analyser.tresholds["mgt_3"][1],
    mgt_4: analyser.tresholds["mgt_4"][1],
    chl_3: analyser.tresholds["chl_3"][1],
    chl_4: analyser.tresholds["chl_4"][1],
    rgl_3: analyser.tresholds["rgl_3"][1],
    rgl_4: analyser.tresholds["rgl_4"][1],
    hpe_3: analyser.tresholds["hpe_3"][1],
    hpe_4: analyser.tresholds["hpe_4"][1],
    fvj_3: analyser.tresholds["fvj_3"][1],
    fvj_4: analyser.tresholds["fvj_4"][1],
    plu_3: analyser.tresholds["plu_3"][1],
    plu_4: analyser.tresholds["plu_4"][1],
    dng_3: analyser.tresholds["dng_3"][1],
    dng_4: analyser.tresholds["dng_4"][1],
    lsa_3: analyser.tresholds["lsa_3"][1],
    lsa_4: analyser.tresholds["lsa_4"][1]
  }}
  array.push(lineTwo)
  const lineThree = {"attributes": {
    objectid: 3,
    mgt_3: analyser.tresholds["mgt_3"][2],
    mgt_4: analyser.tresholds["mgt_4"][2],
    chl_3: analyser.tresholds["chl_3"][2],
    chl_4: analyser.tresholds["chl_4"][2],
    rgl_3: analyser.tresholds["rgl_3"][2],
    rgl_4: analyser.tresholds["rgl_4"][2],
    hpe_3: analyser.tresholds["hpe_3"][2],
    hpe_4: analyser.tresholds["hpe_4"][2],
    fvj_3: analyser.tresholds["fvj_3"][2],
    fvj_4: analyser.tresholds["fvj_4"][2],
    plu_3: analyser.tresholds["plu_3"][2],
    plu_4: analyser.tresholds["plu_4"][2],
    dng_3: analyser.tresholds["dng_3"][2],
    dng_4: analyser.tresholds["dng_4"][2],
    lsa_3: analyser.tresholds["lsa_3"][2],
    lsa_4: analyser.tresholds["lsa_4"][2]
  }}
  array.push(lineThree)
  const lineFour = {"attributes": {
    objectid: 4,
    mgt_3: analyser.tresholds["mgt_3"][3],
    mgt_4: analyser.tresholds["mgt_4"][3],
    chl_3: analyser.tresholds["chl_3"][3],
    chl_4: analyser.tresholds["chl_4"][3],
    rgl_3: analyser.tresholds["rgl_3"][3],
    rgl_4: analyser.tresholds["rgl_4"][3],
    hpe_3: analyser.tresholds["hpe_3"][3],
    hpe_4: analyser.tresholds["hpe_4"][3],
    fvj_3: analyser.tresholds["fvj_3"][3],
    fvj_4: analyser.tresholds["fvj_4"][3],
    plu_3: analyser.tresholds["plu_3"][3],
    plu_4: analyser.tresholds["plu_4"][3],
    dng_3: analyser.tresholds["dng_3"][3],
    dng_4: analyser.tresholds["dng_4"][3],
    lsa_3: analyser.tresholds["lsa_3"][3],
    lsa_4: analyser.tresholds["lsa_4"][3]
  }}
  array.push(lineFour)
  const lineFive = {"attributes": {
    objectid: 5,
    mgt_3: analyser.tresholds["mgt_3"][4],
    mgt_4: analyser.tresholds["mgt_4"][4],
    chl_3: analyser.tresholds["chl_3"][4],
    chl_4: analyser.tresholds["chl_4"][4],
    rgl_3: analyser.tresholds["rgl_3"][4],
    rgl_4: analyser.tresholds["rgl_4"][4],
    hpe_3: analyser.tresholds["hpe_3"][4],
    hpe_4: analyser.tresholds["hpe_4"][4],
    fvj_3: analyser.tresholds["fvj_3"][4],
    fvj_4: analyser.tresholds["fvj_4"][4],
    plu_3: analyser.tresholds["plu_3"][4],
    plu_4: analyser.tresholds["plu_4"][4],
    dng_3: analyser.tresholds["dng_3"][4],
    dng_4: analyser.tresholds["dng_4"][4],
    lsa_3: analyser.tresholds["lsa_3"][4],
    lsa_4: analyser.tresholds["lsa_4"][4]
  }}
  array.push(lineFive)
  return array
}

// Capitalise first letter of a string
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
