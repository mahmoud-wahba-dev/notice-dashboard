
window.addEventListener('load', () => {
  ; (function () {
    const areaChartEl = document.querySelector('#lineAreaChart'),
      areaChartConfig = {
        chart: {
          height: 400,
          width: '100%',
          type: 'area',
          parentHeightOffset: 0,
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: false,
          curve: 'straight'
        },
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'start',
          labels: {
            colors: 'var(--color-base-content)',
            useSeriesColors: false
          }
        },
        grid: {
          borderColor: 'color-mix(in oklab, var(--color-base-content) 40%, transparent)',
          xaxis: {
            lines: {
              show: true
            }
          }
        },
        colors: [
          'color-mix(in oklab, var(--color-success) 30%, transparent)',
          'color-mix(in oklab, var(--color-success) 60%, transparent)',
          'color-mix(in oklab, var(--color-success) 90%, transparent)'
        ],
        series: [
          {
            name: 'Visits',
            data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280, 375]
          },
          {
            name: 'Clicks',
            data: [60, 80, 70, 110, 80, 100, 90, 180, 160, 140, 200, 220, 275]
          },
          {
            name: 'Sales',
            data: [20, 40, 30, 70, 40, 60, 50, 140, 120, 100, 140, 180, 220]
          }
        ],
        xaxis: {
          categories: [
            '7/12',
            '8/12',
            '9/12',
            '10/12',
            '11/12',
            '12/12',
            '13/12',
            '14/12',
            '15/12',
            '16/12',
            '17/12',
            '18/12',
            '19/12',
            '20/12'
          ],
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            style: {
              colors: 'var(--color-base-content)',
              fontSize: '13px'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: 'var(--color-base-content)',
              fontSize: '13px'
            }
          }
        },
        fill: {
          opacity: 1,
          type: 'solid'
        },
        tooltip: {
          shared: false
        }
      }
    if (typeof areaChartEl !== undefined && areaChartEl !== null) {
      const areaChart = new ApexCharts(areaChartEl, areaChartConfig)
      areaChart.render()
    }

    // Multiple Column Chart
    buildChart('#apex-multiple-column-charts', mode => ({
      chart: {
        type: 'bar',
        height: 400,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      series: [
        {
          name: 'Investment',
          data: [25000, 47000, 59000, 67000, 66000, 66000, 78000, 43000, 40000, 56000, 54000, 78000]
        },
        {
          name: 'Revenue',
          data: [34000, 56000, 85000, 90000, 70000, 80000, 100000, 40000, 50000, 44000, 47000, 96000]
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '12px',
          borderRadius: 0
        }
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'left',
        labels: {
          useSeriesColors: true
        },
        markers: {
          shape: 'circle'
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['var(--color-primary)', 'var(--color-success)'],
      xaxis: {
        categories: [
          'Cook',
          'Erin',
          'Jack',
          'Will',
          'Gayle',
          'Megan',
          'John',
          'Luke',
          'Ellis',
          'Mason',
          'Elvis',
          'Liam'
        ],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          show: false
        },
        labels: {
          style: {
            colors: 'var(--color-base-content)',
            fontSize: '12px',
            fontWeight: 400
          }
        }
      },
      yaxis: {
        labels: {
          align: 'left',
          minWidth: 0,
          maxWidth: 140,
          style: {
            colors: 'var(--color-base-content)',
            fontSize: '12px',
            fontWeight: 400
          },
          formatter: value => (value >= 1000 ? `${value / 1000}k` : value)
        }
      },
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.9
          }
        }
      },
      tooltip: {
        y: {
          formatter: value => `$${value >= 1000 ? `${value / 1000}k` : value}`
        },
        custom: function (props) {
          const { categories } = props.ctx.opts.xaxis
          const { dataPointIndex } = props
          const title = categories[dataPointIndex]
          const newTitle = `${title}`

          return buildTooltip(props, {
            title: newTitle,
            mode,
            hasTextLabel: true,
            wrapperExtClasses: 'min-w-28',
            labelDivider: ':',
            labelExtClasses: 'ms-2'
          })
        }
      },
      responsive: [
        {
          breakpoint: 568,
          options: {
            chart: {
              height: 300
            },
            plotOptions: {
              bar: {
                columnWidth: '4px'
              }
            },
            labels: {
              style: {
                fontSize: '10px',
                colors: 'var(--color-base-content)'
              },
              offsetX: -2,
              formatter: title => title.slice(0, 3)
            },
            yaxis: {
              labels: {
                align: 'left',
                minWidth: 0,
                maxWidth: 140,
                style: {
                  fontSize: '10px',
                  colors: 'var(--color-base-content)'
                },
                formatter: value => (value >= 1000 ? `${value / 1000}k` : value)
              }
            }
          }
        }
      ]
    }))

    //Single Line Chart
    buildChart('#apex-single-line-chart', mode => ({
      chart: {
        height: 300,
        type: 'line',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      series: [
        {
          name: 'Views',
          data: [0, 5000, 15000, 25000, 40000, 30000, 20000, 15000, 25000, 40000, 30000, 20000]
        }
      ],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight',
        width: [4, 4, 4]
      },
      title: {
        show: false
      },
      legend: {
        show: false
      },
      grid: {
        strokeDashArray: 0,
        borderColor: 'color-mix(in oklab, var(--color-base-content) 40%, transparent)',
        padding: {
          top: -20,
          right: 0
        }
      },
      colors: ['var(--color-warning)'],
      xaxis: {
        type: 'category',
        categories: [
          '1 January 2024',
          '1 February 2024',
          '1 March 2024',
          '1 April 2024',
          '1 May 2024',
          '1 June 2024',
          '1 July 2024',
          '1 August 2024',
          '1 September 2024',
          '1 October 2024',
          '1 November 2024',
          '1 December 2024'
        ],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        tooltip: {
          enabled: false
        },
        labels: {
          offsetY: 5,
          style: {
            colors: 'var(--color-base-content)',
            fontSize: '12px',
            fontWeight: 400
          },
          formatter: title => {
            let t = title

            if (t) {
              const newT = t.split(' ')
              t = `${newT[0]} ${newT[1].slice(0, 3)}`
            }

            return t
          }
        }
      },
      yaxis: {
        min: 0,
        max: 40000,
        tickAmount: 4,
        labels: {
          align: 'left',
          minWidth: 0,
          maxWidth: 140,
          style: {
            colors: 'var(--color-base-content)',
            fontSize: '12px',
            fontWeight: 400
          },
          formatter: value => (value >= 1000 ? `${value / 1000}k` : value)
        }
      },
      tooltip: {
        custom: function (props) {
          const { categories } = props.ctx.opts.xaxis
          const { dataPointIndex } = props
          const title = categories[dataPointIndex].split(' ')
          const newTitle = `${title[0]} ${title[1]}`

          return buildTooltip(props, {
            title: newTitle,
            mode,
            hasTextLabel: true,
            wrapperExtClasses: 'min-w-28',
            labelDivider: ':',
            labelExtClasses: 'ms-2'
          })
        }
      }
    }))

    // Horizontal Chart
    buildChart('#apex-horizontal-bar-chart', mode => ({
      chart: {
        type: 'bar',
        height: 400,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      series: [
        {
          name: 'Transactions 2023',
          data: [21000, 42000, 55000, 67000, 66000, 61000, 48000, 33000, 40000, 56000, 84000, 28000]
        },
        {
          name: 'Transactions 2024',
          data: [25000, 39000, 50000, 70000, 69000, 62000, 49000, 35000, 43000, 57000, 86000, 30000]
        }
      ],
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '16px',
          borderRadius: 4,
          borderRadiusApplication: 'end'
        }
      },
      legend: {
        show: true,
        position: 'top',
        markers: {
          shape: 'circle'
        },
        labels: {
          colors: 'var(--color-base-content)',
          useSeriesColors: false
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['var(--color-accent)', 'var(--color-warning)'],
      xaxis: {
        categories: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        crosshairs: {
          show: false
        },
        labels: {
          style: {
            colors: 'var(--color-base-content)',
            fontSize: '12px',
            fontWeight: 400
          },
          offsetX: -2,
          formatter: value => (value >= 1000 ? `${value / 1000}k` : value)
        }
      },
      yaxis: {
        crosshairs: {
          show: false
        },
        labels: {
          align: 'left',
          minWidth: 0,
          maxWidth: 140,
          style: {
            colors: 'var(--color-base-content)',
            fontSize: '12px',
            fontWeight: 400
          },
          offsetX: -10,
          formatter: title => (typeof title === 'string' ? title.slice(0, 3) : title)
        }
      },
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.9
          }
        }
      },
      tooltip: {
        y: {
          formatter: value => `$${value >= 1000 ? `${value / 1000}k` : value}`
        },
        custom: function (props) {
          const { categories } = props.ctx.opts.xaxis
          const { dataPointIndex } = props
          const title = categories[dataPointIndex]
          const newTitle = `${title}`

          return buildTooltip(props, {
            title: newTitle,
            mode,
            hasTextLabel: true,
            wrapperExtClasses: 'min-w-28',
            labelDivider: ':',
            labelExtClasses: 'ms-2'
          })
        }
      }
    }))

    //Candle Chart
    buildChart('#candleStickChart', mode => ({
      chart: {
        height: 410,
        type: 'candlestick',
        parentHeightOffset: 0,
        toolbar: {
          show: false
        }
      },
      series: [
        {
          data: [
            {
              x: new Date(1538778600000),
              y: [150, 170, 50, 100]
            },
            {
              x: new Date(1538780400000),
              y: [200, 400, 170, 330]
            },
            {
              x: new Date(1538782200000),
              y: [330, 340, 250, 280]
            },
            {
              x: new Date(1538784000000),
              y: [300, 330, 200, 320]
            },
            {
              x: new Date(1538785800000),
              y: [320, 450, 280, 350]
            },
            {
              x: new Date(1538787600000),
              y: [300, 350, 80, 250]
            },
            {
              x: new Date(1538789400000),
              y: [200, 330, 170, 300]
            },
            {
              x: new Date(1538791200000),
              y: [200, 220, 70, 130]
            },
            {
              x: new Date(1538793000000),
              y: [220, 270, 180, 250]
            },
            {
              x: new Date(1538794800000),
              y: [200, 250, 80, 100]
            },
            {
              x: new Date(1538796600000),
              y: [150, 170, 50, 120]
            },
            {
              x: new Date(1538798400000),
              y: [110, 450, 10, 420]
            },
            {
              x: new Date(1538800200000),
              y: [400, 480, 300, 320]
            },
            {
              x: new Date(1538802000000),
              y: [380, 480, 350, 450]
            }
          ]
        }
      ],
      xaxis: {
        type: 'datetime',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: 'var(--color-base-content)',
            fontSize: '13px'
          }
        }
      },
      yaxis: {
        tickAmount: 5,
        tooltip: {
          enabled: true
        },
        labels: {
          style: {
            colors: 'var(--color-base-content)',
            fontSize: '13px'
          }
        }
      },
      grid: {
        borderColor: 'color-mix(in oklab, var(--color-base-content) 40%, transparent)',
        xaxis: {
          lines: {
            show: true
          }
        },
        padding: {
          top: -20
        }
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: 'var(--color-success)',
            downward: 'var(--color-error)'
          }
        },
        bar: {
          columnWidth: '40%'
        }
      }
    }))

    // Pie Chart
    buildChart('#apex-pie-chart', mode => ({
      chart: {
        height: 348,
        type: 'pie',
        zoom: {
          enabled: false
        }
      },
      series: [40, 20, 10, 10, 8, 6, 6],
      labels: ['Rent', 'Food', 'Utilities', 'Transport', 'Health', 'Education', 'Miscellaneous'],
      title: {
        show: false
      },
      colors: [
        'var(--color-primary)',
        'var(--color-neutral)',
        'var(--color-accent)',
        'var(--color-info)',
        'var(--color-warning)',
        'var(--color-success)',
        'var(--color-error)'
      ],
      dataLabels: {
        style: {
          fontSize: '12px',
          fontWeight: '500',
          colors: [
            'var(--color-primary-content)',
            'var(--color-neutral-content)',
            'var(--color-accent-content)',
            'var(--color-info-content)',
            'var(--color-warning-content)',
            'var(--color-success-content)',
            'var(--color-error-content)'
          ]
        },
        dropShadow: {
          enabled: false
        },
        formatter: value => `${value.toFixed(1)} %`
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -15
          }
        }
      },
      legend: {
        show: true,
        position: 'bottom',
        markers: { offsetX: -2 },
        labels: {
          useSeriesColors: true
        }
      },
      stroke: {
        show: false
      },
      tooltip: {
        enabled: false
      },
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        }
      }
    }))

    // Radial Chart
    buildChart('#apex-radial-bar-chart', mode => ({
      chart: {
        height: 348,
        type: 'radialBar'
      },
      colors: ['var(--color-warning)', 'var(--color-info)', 'var(--color-accent)'],
      plotOptions: {
        radialBar: {
          size: 185,
          hollow: {
            size: '40%'
          },
          track: {
            margin: 10,
            background: 'var(--color-base-200)'
          },
          dataLabels: {
            name: {
              fontSize: '1.5rem'
            },
            value: {
              fontSize: '1rem',
              color: 'var(--color-base-content)'
            },
            total: {
              show: true,
              fontWeight: 400,
              color: 'var(--color-base-content)',
              fontSize: '1.3rem',
              label: 'Total',
              formatter: function (w) {
                return '69%'
              }
            }
          }
        }
      },
      grid: {
        borderColor: 'color-mix(in oklab, var(--color-base-content) 40%, transparent)',
        padding: {
          top: 0,
          bottom: 0
        }
      },
      legend: {
        show: true,
        position: 'bottom',
        labels: {
          useSeriesColors: true
        }
      },
      stroke: {
        lineCap: 'round'
      },
      series: [80, 50, 35],
      labels: ['Comments', 'Replies', 'Shares']
    }))

    // Radar Chart
    buildChart('#apex-radar-chart', mode => ({
      chart: {
        height: 360,
        width: '100%',
        type: 'radar',
        toolbar: {
          show: false
        },
        dropShadow: {
          enabled: false,
          blur: 8,
          left: 1,
          top: 1,
          opacity: 0.2
        }
      },
      legend: {
        show: true,
        position: 'bottom',
        labels: {
          useSeriesColors: true
        }
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: 'color-mix(in oklab, var(--color-base-content) 40%, transparent)',
            connectorColors: 'color-mix(in oklab, var(--color-base-content) 40%, transparent)'
          }
        }
      },
      yaxis: {
        show: false
      },
      series: [
        {
          name: 'iPhone 15 Pro Max',
          data: [41, 64, 81, 60, 42, 42, 33, 23]
        },
        {
          name: 'Samsung s24 Ultra',
          data: [65, 46, 42, 25, 58, 63, 76, 43]
        }
      ],
      colors: [
        'color-mix(in oklab, var(--color-warning) 70%, transparent)',
        'color-mix(in oklab, var(--color-primary) 90%, transparent)'
      ],
      xaxis: {
        categories: ['Battery', 'Brand', 'Camera', 'Memory', 'Storage', 'Display', 'OS', 'Price'],
        labels: {
          show: true,
          style: {
            colors: 'var(--color-base-content)',
            fontSize: '12px'
          }
        }
      },
      stroke: {
        show: false,
        width: 0
      },
      markers: {
        size: 0
      },
      grid: {
        show: false,
        padding: {
          top: -20,
          bottom: -20
        }
      }
    }))

    // Doughnut Chart
    buildChart('#apex-doughnut-chart', mode => ({
      chart: {
        height: 357,
        type: 'donut'
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: {
                fontSize: '2rem'
              },
              value: {
                fontSize: '1.5rem',
                color: 'var(--color-base-content)',
                formatter: function (val) {
                  return parseInt(val, 10) + '%'
                }
              },
              total: {
                show: true,
                fontSize: '1rem',
                label: 'Operational',
                color: 'var(--color-primary)',
                formatter: function (w) {
                  return '42%'
                }
              }
            }
          }
        }
      },
      series: [42, 7, 25, 25],
      labels: ['Operational', 'Networking', 'Hiring', 'R&D'],
      legend: {
        show: true,
        position: 'bottom',
        markers: { offsetX: -3 },
        labels: {
          useSeriesColors: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: false,
        curve: 'straight'
      },
      colors: ['var(--color-warning)', 'var(--color-accent)', 'var(--color-primary)', 'var(--color-info)'],
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        }
      },
      tooltip: {
        enabled: true
      }
    }))
  })()
})
