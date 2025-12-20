/**
 * Reports Chart Initialization
 * Handles ApexCharts for performance visualization
 */

(function () {
  'use strict'

  // Chart data for different date ranges
  const chartDatasets = {
    7: {
      categories: ['Dec 14', 'Dec 15', 'Dec 16', 'Dec 17', 'Dec 18', 'Dec 19', 'Dec 20'],
      visitors: [8, 12, 18, 25, 32, 28, 35],
      impressions: [15, 22, 35, 48, 58, 52, 60]
    },
    30: {
      categories: [
        'يول 1', 'يول 5', 'يول 10', 'يول 15', 'يول 20', 'يول 25', 'يول 30'
      ],
      visitors: [10, 12, 14, 16, 25, 28, 30],
      impressions: [15, 25, 35, 50, 58, 55, 60]
    },
    90: {
      categories: ['Oct 1', 'Oct 15', 'Nov 1', 'Nov 15', 'Dec 1', 'Dec 15', 'Dec 30'],
      visitors: [8, 12, 18, 22, 26, 28, 30],
      impressions: [20, 35, 45, 52, 58, 60, 60]
    },
    180: {
      categories: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      visitors: [6, 10, 14, 18, 22, 26, 30],
      impressions: [15, 28, 38, 48, 55, 58, 60]
    }
  }

  // Initialize chart
  function initPerformanceChart(range = 30) {
    const data = chartDatasets[range] || chartDatasets[30]
    const chartElement = document.getElementById('performanceChart')

    if (!chartElement || typeof ApexCharts === 'undefined') {
      return
    }

    // Get theme color from CSS variable or use defaults
    const style = getComputedStyle(document.documentElement)
    const primaryColor = style.getPropertyValue('--color-primary') || '#7C3AED'
    const secondaryColor = style.getPropertyValue('--color-secondary') || '#06B6D4'

    const options = {
      chart: {
        type: 'area',
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

    // Destroy existing chart if it exists
    if (window.performanceChartInstance) {
      window.performanceChartInstance.destroy()
    }

    // Create new chart
    window.performanceChartInstance = new ApexCharts(chartElement, options)
    window.performanceChartInstance.render()
  }

  // Event delegation for date range buttons
  function setupDateRangeHandlers() {
    document.addEventListener('click', function (e) {
      const rangeBtn = e.target.closest('[data-range]')
      if (rangeBtn) {
        e.preventDefault()
        const range = parseInt(rangeBtn.getAttribute('data-range'))
        const dropdownToggle = document.getElementById('dateRangeDropdown')

        // Update button text
        let rangeLabel = ''
        switch (range) {
          case 7:
            rangeLabel = 'آخر 7 أيام'
            break
          case 30:
            rangeLabel = 'آخر 30 يوم'
            break
          case 90:
            rangeLabel = 'آخر 90 يوم'
            break
          case 180:
            rangeLabel = 'آخر 6 أشهر'
            break
        }

        if (dropdownToggle) {
          dropdownToggle.innerHTML = `<span class="icon-[tabler--calendar] size-5"></span><span>${rangeLabel}</span>`
        }

        // Reinitialize chart with new range
        initPerformanceChart(range)
      }
    })
  }

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    initPerformanceChart(30)
    setupDateRangeHandlers()
  })

  // Reinitialize on ApexCharts ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(() => {
        initPerformanceChart(30)
      }, 500)
    })
  }
})()
