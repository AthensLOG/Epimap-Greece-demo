// DEFINE A GLOBAL VARIABLE FOR EPIMAP DATABASE
let epibase
// LAUNCH INITIALISATION
initApp()

async function initApp(){
  // CREATE GEOGRAPHIC LAYERS
    const data = await $.getJSON("data/municipalities.geojson")
    level4 = L.geoJson(data, {
        style: myStyle,
        onEachFeature: MapInteraction
    });
    boundarieslayers.addLayer(level4).addTo(mymap)
    mymap.fitBounds(level4.getBounds());

  //GET THE APPLICATION CONFIGURATION
  // Title
  $('#app-subtitle').html(config.nom)
  // Set Tresholds for swatchs
  analyser.tresholds = config.tresholds
  // Set radius/Colors for circles
  analyser.circleFill = config.circles_fill
  analyser.circleContour = config.circles_contour
  analyser.circleMaxRadius = parseInt(config.circles_radius)

  // CONFIGURE GEOGRAPHIC SELECTOR AND SET SELECTOR TO DEFAULT SELECTION DEFINED BY INIT_AREA PARAMETER
  // CONFIGURE ALASQL DB COLUMNS
  const epidata_request = 'CREATE TABLE epidata (id serial PRIMARY KEY NOT NULL, adm2_ID STRING, adm2 STRING, adm3_ID STRING, adm3 STRING, year INT, month INT, patients INT)'
  let epidata_insert = 'INSERT INTO epidata (adm2_ID, adm2, adm3_ID, adm3, year, month, patients) VALUES '

  // Create SQL Database
  epibase = new alasql.Database('epibase');
  epibase.exec(epidata_request)
  //Extract CSV datas and insert into SQLDB, then configure the "slider" object
  alasql.promise('SELECT * FROM CSV("data/dataset.csv", {headers:true})').then(datas => {
    for (let data of datas) {
      if (data.Patients.length == 0) {
        data.Patients = 'NULL'
      }
      epidata_insert += `('${data.adm2_ID}', '${data.adm2_name}', '${data.adm3_ID}', '${data.adm3_name}', ${data.Year}, ${data.Month}, ${data.Patients}), `
    }
    epidata_insert = epidata_insert.substring(0, epidata_insert.length-2);
    epibase.exec(epidata_insert);

    epibase.exec('CREATE TABLE month_range (id serial PRIMARY KEY NOT NULL, year INT, month INT)');
    epibase.exec('INSERT INTO month_range (year, month) SELECT DISTINCT year, month FROM epidata ORDER BY year, month')
    slider.month_list = epibase.exec('SELECT * FROM month_range');
    const months = epibase.exec('SELECT MIN(id) AS min, MAX(id) AS max FROM month_range');
    slider.default_month_start.push(months[0]['min'], months[0]['max'])
    slider.month_range = months[0];

    epibase.exec('CREATE TABLE year_range (id serial PRIMARY KEY NOT NULL, year INT)');
    epibase.exec('INSERT INTO year_range (year) SELECT DISTINCT year FROM epidata ORDER BY year')
    slider.year_list = epibase.exec('SELECT * FROM year_range');
    const years = epibase.exec('SELECT MIN(id) AS min, MAX(id) AS max FROM year_range');
    slider.default_year_start.push(years[0]['min'], years[0]['max'])
    slider.year_range = years[0];

    // INITIALISE DEFAULT SLIDER
    slider.initSlider()
    slider.target.noUiSlider.on('slide', function (values, handle) {
      analyser.time_range = [slider.target.noUiSlider.get()[0], slider.target.noUiSlider.get()[1]]
    })

    // SET ANALYSER PROPERTIES AND SLIDER MODE
     analyser.geo_mode = 4
     const time_mode = 2
     slider.month()
     analyser.time_mode = 2
     analyser.disease = config.init_disease
     // Watch for changes on the analyser object
     watchAnalyser()
     //Set Indicator
     analyser.indicator = 1
     // INITIALISE AREA LIST SELECTOR
     setAreaList()

     $('.overlay-loader').hide()
  })
}
