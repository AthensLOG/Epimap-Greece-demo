// CHANGE ICON STYLE ON CLICK
$('.click-change').click(function(e){
  // Click on icon and not on the div
  if (e.target !== this){
    if (!$(e.target).hasClass("second-icon")) {
      $( e.target ).prev().toggleClass( "inactive-icon" );
      $( e.target ).toggleClass( "inactive-icon" );
    } else { //IS NOT ACTIVE
      $( e.target ).next().toggleClass( "inactive-icon" );
      $( e.target ).toggleClass( "inactive-icon" );
    }
  }
  // Click on the div, not on icon
  else {
    $( e.target ).children().each(function(){
      $(this).toggleClass('inactive-icon')
    })
  }
})

//LEFT MENU BEHAVIOR
// SHOW/HIDE MAP OR CHARTS DIV
$('#map-left-menu').click(function(){
  if ($('#map').is(':visible')) {
    $('#map').hide()
    $('.legend-button').hide()
    $('#charts').removeClass('col-6')
    $('#charts').addClass('col-12')
  } else {
    $('#map').show()
    $('.legend-button').show()
    $('#charts').removeClass('col-12')
    $('#charts').addClass('col-6')
  }
  mymap.invalidateSize()
})

$('#charts-left-menu').click(function(){
  if ($('#charts').is(':visible')) {
    $('#charts').hide()
    $('#map').removeClass('col-6')
    $('#map').addClass('col-12')
  } else {
    $('#charts').show()
    $('#map').removeClass('col-12')
    $('#map').addClass('col-6')
  }
  mymap.invalidateSize()
})


$('#pdf-left-menu').click(function(e){
  e.preventDefault()
  if ($('#map').is(':visible')){
    configurePDF()
  } else {
    addNotify('Veuillez afficher la carte avant de générer un PDF', 'danger')
  }
})

$('#export-left-menu').click(function(e){
  // Show Modal
  if (administrator.logged) {
    offliner.configure()
    $('#modaloffline').modal('show')
  }
})

$('#admin-left-menu').click(function(e){
  //Check if admin is logged, if not show login modal, if yes, show admin modal
  if (administrator.logged) {
    administrator.manage()
    $('#modalconfig').modal('show')
  }
})

$('#collapseConfig').on('shown.bs.collapse', function () {
  // change the icon color
  $('.collapse-config').toggleClass( "disabled" )
})
$('#collapseConfig').on('hidden.bs.collapse', function () {
  // change the icon color
  $('.collapse-config').toggleClass( "disabled" )
})

$('.connect').click(e => {
  if (!administrator.logged) {
    $('#loginModal').modal('show')
    $('#getToken').click(function(e){
      e.preventDefault()
      getToken($('#admin-login').val(), $('#admin-password').val())
    })
  } else {
    administrator.token = ''
    administrator.logged = false
    $('#logoutButton').removeClass('d-inline-flex').addClass('d-none')
    $('#loginButton').removeClass('d-none').addClass('d-inline-flex')
    $('#export-left-menu').hide()
    $('#admin-left-menu').hide()
  }
})
