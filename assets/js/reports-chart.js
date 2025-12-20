/**
 * Reports Chart Initialization - Original + Two Additional Charts
 */

(function () {
  'use strict'

  // Chart data for different date ranges
  const chartDatasets = {
    7: {
      categories: ['Dec 14', 'Dec 15', 'Dec 16', 'Dec 17', 'Dec 18', 'Dec 19', 'Dec 20'],
      visitors: [8, 12, 18, 25, 32, 28, 35],
      impressions: [15, 22, 35, 48, 58, 52, 60],
      chart1Data: [0.8, 1.2, 1.8, 2.5, 2.8, 2.6, 2.9],
      chart2Data: [0.5, 0.9, 1.4, 1.9, 2.2, 2.0, 2.4]
    },
    30: {
      categories: ['1/11/2025', '5/11/2025', '10/11/2025', '15/11/2025', '20/11/2025', '25/11/2025', '30/11/2025'],
      visitors: [10, 12, 14, 16, 25, 28, 30],
      impressions: [15, 25, 35, 50, 58, 55, 60],
      chart1Data: [1.0, 1.2, 1.4, 1.6, 2.0, 2.2, 2.5],
      chart2Data: [0.8, 1.3, 1.9, 2.4, 2.7, 2.5, 2.8]
    },
    90: {
      categories: ['1 Oct', '15 Oct', '1 Nov', '15 Nov', '1 Dec', '15 Dec', '30 Dec'],
      visitors: [8, 12, 18, 22, 26, 28, 30],
      impressions: [20, 35, 45, 52, 58, 60, 60],
      chart1Data: [0.8, 1.2, 1.6, 2.0, 2.3, 2.5, 2.7],
      chart2Data: [0.6, 1.1, 1.7, 2.2, 2.5, 2.6, 2.8]
    },
    180: {
      categories: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      visitors: [6, 10, 14, 18, 22, 26, 30],
      impressions: [15, 28, 38, 48, 55, 58, 60],
      chart1Data: [0.6, 1.0, 1.4, 1.8, 2.2, 2.5, 2.7],
      chart2Data: [0.4, 0.9, 1.4, 1.9, 2.3, 2.5, 2.7]
    }
  }

  let performanceChartInstance = null
  let chart1Instance = null
  let chart2Instance = null

  // Initialize Original Performance Chart
  function initPerformanceChart(range = 30) {
    const data = chartDatasets[range] || chartDatasets[30]
    const chartElement = document.getElementById('performanceChart')

    if (!chartElement || typeof ApexCharts === 'undefined') {
      return
    }

    const options = {
      chart: {
        type: 'area',
        height: 400,
        fontFamily: '"IBM Plex Sans Arabic", sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          }
        },
        sparkline: {
          enabled: false
        }
      },
      series: [
        {
          name: 'عدد الزوار',
          data: data.visitors
        },
        {
          name: 'مرات الظهور',
          data: data.impressions
        }
      ],
      colors: ['#7C3AED', '#06B6D4'],
      xaxis: {
        categories: data.categories,
        type: 'category',
        labels: {
          style: {
            fontSize: '13px',
            fontWeight: 500,
            colors: '#666'
          }
        },
        axisBorder: {
          show: true,
          color: '#E5E7EB'
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        title: {
          text: 'ألف (k)',
          style: {
            fontSize: '13px',
            fontWeight: 600,
            color: '#333'
          }
        },
        labels: {
          style: {
            fontSize: '13px',
            colors: '#666'
          },
          formatter: function (value) {
            return Math.round(value) + 'k'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      grid: {
        show: true,
        borderColor: '#E5E7EB',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'round',
        colors: ['#7C3AED', '#06B6D4'],
        width: 3,
        dashArray: 0
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 100]
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        enabled: true,
        theme: 'light',
        y: {
          formatter: function (value) {
            return Math.round(value) + 'k'
          }
        },
        style: {
          fontSize: '13px'
        }
      },
      legend: {
        show: false
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 300
            }
          }
        }
      ]
    }

    if (performanceChartInstance) {
      performanceChartInstance.destroy()
    }

    performanceChartInstance = new ApexCharts(chartElement, options)
    performanceChartInstance.render()
  }

  // Initialize Chart 1 (مرات الظهور)
  function initChart1(range = 30) {
    const data = chartDatasets[range] || chartDatasets[30]
    const chartElement = document.getElementById('chart1')

    if (!chartElement || typeof ApexCharts === 'undefined') {
      return
    }

    const options = {
      chart: {
        type: 'area',
        height: 350,
        fontFamily: '"IBM Plex Sans Arabic", sans-serif',
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: false
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      series: [
        {
          name: 'مرات الظهور',
          data: data.chart1Data
        }
      ],
      colors: ['#EF4444'],
      xaxis: {
        categories: data.categories,
        type: 'category',
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 400,
            colors: '#999'
          },
          rotate: 0
        },
        axisBorder: {
          show: true,
          color: '#E5E7EB'
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        min: 0,
        max: 3.2,
        tickAmount: 8,
        labels: {
          style: {
            fontSize: '12px',
            colors: '#999',
            fontWeight: 400
          },
          formatter: function (value) {
            return value.toFixed(1)
          }
        }
      },
      grid: {
        show: true,
        borderColor: '#E5E7EB',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
        padding: {
          top: 0,
          right: 20,
          bottom: 0,
          left: 10
        }
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'round',
        colors: ['#EF4444'],
        width: 2.5,
        dashArray: 0
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: ['#FEE2E2'],
          inverseColors: false,
          opacityFrom: 0.6,
          opacityTo: 0.1,
          stops: [0, 100]
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        enabled: true,
        theme: 'light',
        y: {
          formatter: function (value) {
            return value.toFixed(1)
          }
        }
      },
      legend: {
        show: false
      }
    }

    if (chart1Instance) {
      chart1Instance.destroy()
    }

    chart1Instance = new ApexCharts(chartElement, options)
    chart1Instance.render()
  }

  // Initialize Chart 2 (عدد النقرات)
  function initChart2(range = 30) {
    const data = chartDatasets[range] || chartDatasets[30]
    const chartElement = document.getElementById('chart2')

    if (!chartElement || typeof ApexCharts === 'undefined') {
      return
    }

    const options = {
      chart: {
        type: 'area',
        height: 350,
        fontFamily: '"IBM Plex Sans Arabic", sans-serif',
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: false
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      series: [
        {
          name: 'عدد النقرات',
          data: data.chart2Data
        }
      ],
      colors: ['#10B981'],
      xaxis: {
        categories: data.categories,
        type: 'category',
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 400,
            colors: '#999'
          },
          rotate: 0
        },
        axisBorder: {
          show: true,
          color: '#E5E7EB'
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        min: 0,
        max: 3.2,
        tickAmount: 8,
        labels: {
          style: {
            fontSize: '12px',
            colors: '#999',
            fontWeight: 400
          },
          formatter: function (value) {
            return value.toFixed(1)
          }
        }
      },
      grid: {
        show: true,
        borderColor: '#E5E7EB',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
        padding: {
          top: 0,
          right: 20,
          bottom: 0,
          left: 10
        }
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'round',
        colors: ['#10B981'],
        width: 2.5,
        dashArray: 0
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: ['#D1FAE5'],
          inverseColors: false,
          opacityFrom: 0.6,
          opacityTo: 0.1,
          stops: [0, 100]
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        enabled: true,
        theme: 'light',
        y: {
          formatter: function (value) {
            return value.toFixed(1)
          }
        }
      },
      legend: {
        show: false
      }
    }

    if (chart2Instance) {
      chart2Instance.destroy()
    }

    chart2Instance = new ApexCharts(chartElement, options)
    chart2Instance.render()
  }

  // Event delegation for date range buttons
  function setupDateRangeHandlers() {
    document.addEventListener('click', function (e) {
      const rangeBtn = e.target.closest('[data-range]')
      if (rangeBtn) {
        e.preventDefault()
        const range = parseInt(rangeBtn.getAttribute('data-range'))
        const chart = rangeBtn.getAttribute('data-chart')
        
        let rangeLabel = ''
        switch (range) {
          case 7: rangeLabel = 'آخر 7 أيام'; break
          case 30: rangeLabel = 'آخر 30 يوم'; break
          case 90: rangeLabel = 'آخر 90 يوم'; break
          case 180: rangeLabel = 'آخر 6 أشهر'; break
        }

        // Handle original chart (no data-chart attribute)
        if (!chart) {
          const dropdownToggle = document.getElementById('dateRangeDropdown')
          if (dropdownToggle) {
            dropdownToggle.innerHTML = `<span class="icon-[tabler--calendar] size-5"></span><span>${rangeLabel}</span>`
          }
          initPerformanceChart(range)
        } 
        // Handle chart1 or chart2
        else {
          const dropdownId = chart === 'chart1' ? 'dateRangeDropdown1' : 'dateRangeDropdown2'
          const dropdownToggle = document.getElementById(dropdownId)
          
          if (dropdownToggle) {
            dropdownToggle.innerHTML = `<span>${rangeLabel}</span><span class="icon-[tabler--chevron-down] size-4"></span>`
          }

          if (chart === 'chart1') {
            initChart1(range)
          } else {
            initChart2(range)
          }
        }
      }
    })
  }

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
      initPerformanceChart(30)
      initChart1(30)
      initChart2(30)
      setupDateRangeHandlers()
    }, 300)
  })
})()
