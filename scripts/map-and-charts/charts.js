let chart1 = null

function makeCharts(ds1, ds2) {
	let pointRadius = 5
	let borderWidth = 0
	// Destroy Charts if they already exist
	if (chart1 != null){
      chart1.destroy();
  }
	const chartData1 = {
			labels: ds1,
			datasets: [{
				type: 'line',
				label: "Patients",
				borderColor: '#070C0F',
				pointBackgroundColor: '#CF2825',
				borderWidth: borderWidth,
				pointRadius: pointRadius,
				lineTension:0,
				fill: false,
				data: ds2,
				yAxisID: 'y-axis-1',
			}]
		};

	const ctx = document.getElementById('chart1').getContext('2d');
	chart1 = new Chart(ctx, {
		type: 'bar',
		data: chartData1,
		options: {
      responsive: true,
      maintainAspectRatio: false,
			legend: {
				display: false
			},
			scales: {
				yAxes: [{
					type: 'linear',
					display: true,
					scaleLabel: {
							display: true,
							labelString: 'Patients'
						},
					position: 'left',
					id: 'y-axis-1',
				}],
				xAxes: [{
            categoryPercentage: 1.0,
            barPercentage: 1.0,
        }]
			},
			tooltips: {
				mode: 'index',
				intersect: true
			}
		}
	});
};

$("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#table-body tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
