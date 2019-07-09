// Slider object, has method for each time range, initialize on years by default when extracting datas from CSV
const slider = {
  target: document.getElementById('slider'),
  year_list:[],//USED FOR THE TOOLTIPS: WITH THE ID YOU GET THE YEAR/MONTH/TIME
  month_list:[],
  week_list:[],
  default_year_start: [],//USED TO SET THE START STEPS, SET TO MIN/MAX BY DEFAULT
  default_month_start:[],
  default_week_start:[],
  year_range: {},//USED TO DEFINE THE RANGE OF THE SLIDER (MIN TO MAX VALUE)
  month_range: {},
  week_range: {},
  initSlider(){
    // Initial Slider, with fake values
    noUiSlider.create(this.target, {
      range: {min: 1, max: 48},
      step: 1,
      start: [1,48],
      connect: true,
      tooltips: false,
      format: { to: function (value) {
                return Math.trunc(value)
            }, from: Number }
    })
    this.target.noUiSlider.on('end', function () {
      analyser.time_range = [slider.target.noUiSlider.get()[0], slider.target.noUiSlider.get()[1]]
    })
    analyser.time_range = this.default_month_start
  },
  week(){
    // Destroy existing slider instead of update it, because tooltips can't be updated
    slider.target.noUiSlider.destroy()
    noUiSlider.create(this.target, {
      range: this.week_range,
      step: 1,
      start: this.default_week_start,
      connect: true,
      tooltips: [
        {
          to: (value) => {
            for (time of this.week_list) {
              if (time.id == Math.round(value)) {
                analyser.start_time = {year: time.year, month: time.month, week: time.week}
                const res = time.week+'-'+time.month+'-'+time.year
                $('.daterange-start').html(res)
                return res
              }
            }
          },
          from(value){
              return Math.round(value)
          }
        },{
          to: (value) => {
            for (time of this.week_list) {
              if (time.id == Math.round(value)) {
                analyser.end_time = {year: time.year, month: time.month, week: time.week}
                const res = time.week+'-'+time.month+'-'+time.year
                $('.daterange-end').html(res)
                return res
              }
            }
          },
          from(value){
              return Math.round(value)
          }
        }
      ],
      format: { to: function (value) {
                return Math.round(value)
            }, from: Number }
    })
    this.target.noUiSlider.on('end', function () {
      analyser.time_range = [slider.target.noUiSlider.get()[0], slider.target.noUiSlider.get()[1]]
    })
    analyser.time_range = this.default_week_start
  },
  month(){
    slider.target.noUiSlider.destroy()
    noUiSlider.create(this.target, {
      range: this.month_range,
      step: 1,
      start: this.default_month_start,
      connect: true,
      tooltips: [
        {
          to: (value) => {
            for (time of this.month_list) {
              if (time.id == Math.round(value)) {
                analyser.start_time = {year: time.year, month: time.month}
                const res = numb2Month[time.month]+' '+time.year
                $('.daterange-start').html(res)
                return res
              }
            }
          },
          from(value){
              return Math.round(value)
          }
        },{
          to: (value) => {
            for (time of this.month_list) {
              if (time.id == Math.round(value)) {
                analyser.end_time = {year: time.year, month: time.month}
                const res = numb2Month[time.month]+' '+time.year
                $('.daterange-end').html(res)
                return res
              }
            }
          },
          from(value){
              return Math.round(value)
          }
        }
      ],
      format: { to: function (value) {
                return Math.round(value)
            }, from: Number }
    })
    this.target.noUiSlider.on('end', function () {
      analyser.time_range = [slider.target.noUiSlider.get()[0], slider.target.noUiSlider.get()[1]]
    })
    analyser.time_range = this.default_month_start
  },
  year(){
    slider.target.noUiSlider.destroy()
    noUiSlider.create(this.target, {
      range: this.year_range,
      step: 1,
      start: this.default_year_start,
      connect: true,
      tooltips: [
        {
          to: (value) => {
            for (time of this.year_list) {
              if (time.id == Math.round(value)) {
                analyser.start_time = {year: time.year}
                const res = time.year
                $('.daterange-start').html(res)
                return res
              }
            }
          },
          from(value){
              console.log(value);
              return Math.round(value)
          }
        },{
          to: (value) => {
            for (time of this.year_list) {
              if (time.id == Math.round(value)) {
                analyser.end_time = {year: time.year}
                const res = time.year
                $('.daterange-end').html(res)
                return res
              }
            }
          },
          from(value){
            console.log(value);
              return Math.round(value)
          }
        }
      ],
      format: { to: function (value) {
                return Math.round(value)
            }, from: Number }
    })
    this.target.noUiSlider.on('end', function () {
     analyser.time_range = [slider.target.noUiSlider.get()[0], slider.target.noUiSlider.get()[1]]
   })
    analyser.time_range = this.default_year_start
  }
}

// Change current period on the Slider
$('#prevStartDate').click(function(){
  const min = slider.target.noUiSlider.get()[0] -1
  const max = slider.target.noUiSlider.get()[1]
  slider.target.noUiSlider.set([min, max])
  analyser.time_range = [min, max]
})
$('#nextStartDate').click(function(){
  const min = slider.target.noUiSlider.get()[0] +1
  const max = slider.target.noUiSlider.get()[1]
  slider.target.noUiSlider.set([min, max])
  analyser.time_range = [min, max]
})
$('#prevEndDate').click(function(){
  const min = slider.target.noUiSlider.get()[0]
  const max = slider.target.noUiSlider.get()[1] -1
  slider.target.noUiSlider.set([min, max])
  analyser.time_range = [min, max]
})
$('#nextEndDate').click(function(){
  const min = slider.target.noUiSlider.get()[0]
  const max = slider.target.noUiSlider.get()[1] +1
  slider.target.noUiSlider.set([min, max])
  analyser.time_range = [min, max]
})
