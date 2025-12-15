'use strict'

window.addEventListener('load', () => {
  // Invoice DataTable
  const { dataTable } = new HSDataTable('#users-invoices')

  const filterStatus = document.querySelector('#filter-status')

  dataTable.search.fixed('all', (searchStr, data, index) => {
    const isStatusSelected = filterStatus.value === 'all' ? '' : filterStatus.value.toLowerCase()
    // Parse HTML content to text
    const parser = new DOMParser()
    const htmlDoc = parser.parseFromString(data[2], 'text/html')
    const selectedStatusText = htmlDoc.querySelector('.tooltip-content p').textContent.trim().toLowerCase()
    // Return a boolean indicating whether all conditions are met
    return isStatusSelected === '' || isStatusSelected === selectedStatusText
  })

  if (filterStatus) filterStatus.addEventListener('change', () => dataTable.draw())

  // Delete record

  const userTable = document.querySelector('.datatables-users')

  const tableBody = userTable?.querySelector('tbody')
  if (tableBody) {
    tableBody.addEventListener('click', function (event) {
      if (event.target.parentElement.classList.contains('delete-record')) {
        deleteRecord(event)
      }
    })
  }

  function deleteRecord(event) {
    const row = event.target.parentElement.closest('tr')

    if (row) {
      dataTable.row(row).remove().draw()
    }
  }

  ;(function () {
    // Profit Bar Chart
    buildChart('#profit-chart', () => ({
      chart: {
        type: 'bar',
        height: 94,
        toolbar: {
          tools: {
            download: false
          }
        }
      },
      series: [
        {
          name: 'Profit',
          data: [73, 73, 56, 56, 100]
        },
        {
          name: 'Profit',
          data: [61, 61, 42, 74, 72]
        }
      ],
      plotOptions: {
        bar: {
          columnWidth: '75%',
          startingShape: 'rounded',
          endingShape: 'rounded',
          borderRadius: 3,
          dataLabels: {
            show: false
          }
        }
      },
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      },
      grid: {
        show: false,
        padding: {
          top: -30,
          bottom: -12,
          left: 0,
          right: 0
        }
      },
      colors: ['var(--color-success)', 'color-mix(in oklab, var(--color-success) 10%, transparent)'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['var(--color-base-100)']
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: 'color-mix(in oklab, var(--color-base-content) 50%, transparent)',
            fontSize: '12px',
            fontFamily: 'var(--font-sans)'
          }
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      }
    }))

    // Sales Radial Chart
    buildChart('#sales-chart', () => ({
      chart: {
        height: 120,
        width: 120,
        sparkline: {
          enabled: true
        },
        parentHeightOffset: 0,
        type: 'radialBar'
      },
      colors: ['var(--color-accent)'],
      series: [50],
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          hollow: {
            size: '60%'
          },
          track: {
            background: 'color-mix(in oklab, var(--color-base-content) 10%, transparent)'
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              fontSize: '18px',
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-base-content)',
              fontWeight: 600,
              offsetY: -5
            }
          }
        }
      },
      stroke: {
        lineCap: 'round'
      },
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 3
        }
      },
      labels: ['Progress']
    }))

    // Total Revenue Chart
    buildChart('#totalRevenueChart', () => ({
      series: [
        {
          name: new Date().getFullYear() - 1,
          data: [18, 7, 15, 29, 18, 12, 9]
        },
        {
          name: new Date().getFullYear() - 2,
          data: [-13, -18, -9, -14, -8, -17, -15]
        }
      ],
      chart: {
        height: 300,
        stacked: true,
        type: 'bar',
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          borderRadius: 8,
          startingShape: 'rounded',
          endingShape: 'rounded',
          borderRadiusApplication: 'around'
        }
      },
      colors: ['var(--color-primary)', 'var(--color-info)'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 4,
        lineCap: 'round',
        colors: ['var(--color-base-100)']
      },
      legend: {
        show: true,
        fontWeight: 500,
        horizontalAlign: 'left',
        fontFamily: 'var(--font-sans)',
        position: 'top',
        markers: {
          height: 8,
          width: 8,
          radius: 12,
          shape: 'circle',
          offsetX: -5
        },
        fontSize: '14px',
        fontFamily: 'var(--font-sans)',
        fontWeight: 400,
        labels: {
          colors: 'color-mix(in oklab, var(--color-base-content) 80%, transparent)',
          useSeriesColors: false
        },
        itemMargin: {
          horizontal: 10
        }
      },
      grid: {
        strokeDashArray: 7,
        borderColor: 'color-mix(in oklab, var(--color-base-content) 20%, transparent)',
        padding: {
          top: 0,
          bottom: -8,
          left: 20,
          right: 20
        }
      },
      fill: {
        opacity: [1, 1]
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        labels: {
          style: {
            fontSize: '14px',
            fontFamily: 'var(--font-sans)',
            colors: 'color-mix(in oklab, var(--color-base-content) 80%, transparent)'
          }
        },
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '14px',
            fontFamily: 'var(--font-sans)',
            colors: 'color-mix(in oklab, var(--color-base-content) 50%, transparent)'
          }
        }
      },
      responsive: [
        {
          breakpoint: 1450,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 4
              }
            }
          },
          stroke: {
            width: 2.5
          }
        },
        {
          breakpoint: 1120,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 6
              }
            }
          },
          stroke: {
            width: 2
          }
        },
        {
          breakpoint: 1000,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 9
              }
            }
          },
          stroke: {
            width: 2.5
          }
        },
        {
          breakpoint: 990,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 7
              }
            }
          }
        },
        {
          breakpoint: 900,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 7
              }
            },
            stroke: {
              width: 2
            }
          }
        },
        {
          breakpoint: 870,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '35%',
                borderRadius: 7
              }
            },
            stroke: {
              width: 3
            }
          }
        },
        {
          breakpoint: 810,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 8
              }
            },
            stroke: {
              width: 2
            }
          }
        },
        {
          breakpoint: 768,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '25%',
                borderRadius: 8
              }
            },
            stroke: {
              width: 4
            }
          }
        },
        {
          breakpoint: 700,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '25%',
                borderRadius: 7
              }
            },
            stroke: {
              width: 2.5
            }
          }
        },
        {
          breakpoint: 560,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '30%',
                borderRadius: 7
              }
            },
            stroke: {
              width: 2
            }
          }
        },
        {
          breakpoint: 507,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '30%',
                borderRadius: 6
              }
            },
            stroke: {
              width: 1.5
            }
          }
        },
        {
          breakpoint: 380,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '40%',
                borderRadius: 5
              }
            }
          }
        }
      ],
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      }
    }))

    // Growth Chart
    buildChart('#growthChart', () => ({
      series: [78],
      labels: ['Growth'],
      chart: {
        height: 210,
        width: 210,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          size: 150,
          offsetY: 10,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: '55%'
          },
          track: {
            background: 'var(--color-base-100)',
            strokeWidth: '100%'
          },
          dataLabels: {
            name: {
              offsetY: 20,
              color: 'color-mix(in oklab, var(--color-base-content) 80%, transparent)',
              fontSize: '14px',
              fontWeight: '500',
              fontFamily: 'var(--font-sans)'
            },
            value: {
              offsetY: -15,
              color: 'var(--color-base-content)',
              fontSize: '24px',
              fontWeight: '500',
              fontFamily: 'var(--font-sans)'
            }
          }
        }
      },
      colors: ['var(--color-primary)'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 0.5,
          gradientToColors: ['var(--color-primary)'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.6,
          stops: [30, 70, 100]
        }
      },
      stroke: {
        dashArray: 5
      },
      grid: {
        padding: {
          top: -35,
          bottom: -10
        }
      },
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      }
    }))

    // Earning Report Chart
    buildChart('#reportBarChart', () => ({
      chart: {
        height: 145,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          barHeight: '60%',
          columnWidth: '60%',
          startingShape: 'rounded',
          endingShape: 'rounded',
          borderRadius: 4,
          distributed: true
        }
      },
      grid: {
        show: false,
        padding: {
          top: -20,
          bottom: 0,
          left: -10,
          right: -10
        }
      },
      colors: [
        'color-mix(in oklab, var(--color-primary) 20%, transparent)',
        'color-mix(in oklab, var(--color-primary) 20%, transparent)',
        'color-mix(in oklab, var(--color-primary) 20%, transparent)',
        'color-mix(in oklab, var(--color-primary) 20%, transparent)',
        'var(--color-primary)',
        'color-mix(in oklab, var(--color-primary) 20%, transparent)',
        'color-mix(in oklab, var(--color-primary) 20%, transparent)'
      ],
      dataLabels: {
        enabled: false
      },
      series: [
        {
          name: 'Earning',
          data: [150, 400, 300, 200, 380, 250, 320]
        }
      ],
      legend: {
        show: false
      },
      xaxis: {
        categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: 'color-mix(in oklab, var(--color-base-content) 50%, transparent)',
            fontSize: '12px',
            fontFamily: 'var(--font-sans)'
          }
        }
      },
      tooltip: {
        custom: function (props) {
          // Correctly accessing categories from xaxis
          const { categories } = props.ctx.opts.xaxis
          const { dataPointIndex } = props

          // Call the buildTooltip function and pass in the relevant options
          return buildTooltip(props, {
            title: categories[dataPointIndex],
            hasTextLabel: true,
            labelDivider: ':',
            seriesExtClasses: 'gap-2'
          })
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      }
    }))

    // Order Statistics Chart
    buildChart('#orderStatisticsChart', () => ({
      chart: {
        height: 125,
        width: 135,
        type: 'donut',
        offsetX: 15
      },
      labels: ['Electronic', 'Sports', 'Decor', 'Fashion'],
      series: [50, 85, 25, 40],
      colors: ['var(--color-success)', 'var(--color-primary)', 'var(--color-secondary)', 'var(--color-info)'],
      stroke: {
        width: 5,
        colors: ['var(--color-base-100)']
      },
      dataLabels: {
        enabled: false,
        formatter: function (val, opt) {
          return parseInt(val) + '%'
        }
      },
      legend: {
        show: false
      },
      grid: {
        padding: {
          top: 0,
          bottom: 0,
          right: 15
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              value: {
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--color-base-content)',
                offsetY: -17,
                formatter: function (val) {
                  return parseInt(val) + '%'
                }
              },
              name: {
                offsetY: 17
              },
              total: {
                show: true,
                fontSize: '14px',
                fontWeight: 500,
                color: 'color-mix(in oklab, var(--color-base-content) 80%, transparent)',
                label: 'Weekly',
                formatter: function (w) {
                  return '38%'
                }
              }
            }
          }
        }
      },
      states: {
        active: {
          filter: {
            type: 'none'
          }
        }
      }
    }))
  })()
})
