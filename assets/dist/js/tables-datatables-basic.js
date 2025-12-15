'use strict'

window.addEventListener('load', () => {
  const { dataTable } = new HSDataTable('#datatable-basic-button', {
    dom: 'B', // Required for buttons to work
    buttons: [
      {
        extend: 'copy',
        exportOptions: {
          columns: [1, 2, 3, 4, 5] // Columns to include (adjust indices as needed)
        }
      },
      {
        extend: 'csv',
        exportOptions: {
          columns: [1, 2, 3, 4, 5]
        }
      },
      {
        extend: 'excel',
        exportOptions: {
          columns: [1, 2, 3, 4, 5]
        }
      },
      {
        extend: 'pdf',
        exportOptions: {
          columns: [1, 2, 3, 4, 5]
        }
      },
      {
        extend: 'print',
        exportOptions: {
          columns: [1, 2, 3, 4, 5]
        }
      }
    ],
    columnDefs: [
      {
        target: 0, // For the checkbox column
        orderable: false,
        searchable: false,
        render: function (data, type, row) {
          return '<input type="checkbox" class="checkbox checkbox-sm checkbox-primary row-select-checkbox" data-datatable-row-selecting-individual="">'
        }
      },
      {
        target: 1,
        render: function (data, type, full, meta) {
          const name = full['full_name'] || data
          const post = full['post']
          const image = full['avatar']
          let avatarOutput

          if (image) {
            avatarOutput = `<img src="${assetsPath}img/${commonAssetsPath}avatars/${image}" alt="Avatar" class="avatar rounded-full size-8 cursor-pointer">`
          } else {
            // Map states to Flyon UI color classes
            const states = [
              {
                bg: 'bg-success/10',
                text: 'text-success'
              },
              {
                bg: 'bg-error/10',
                text: 'text-error'
              },
              {
                bg: 'bg-warning/10',
                text: 'text-warning'
              },
              {
                bg: 'bg-info/10',
                text: 'text-info'
              },
              {
                bg: 'bg-primary/10',
                text: 'text-primary'
              },
              {
                bg: 'bg-secondary/10',
                text: 'text-secondary'
              }
            ]
            const stateNum = Math.floor(Math.random() * states.length)
            const state = states[stateNum]
            const initials = (name.match(/\b\w/g) || []).slice(0, 2).join('').toUpperCase()
            avatarOutput = `<div class="avatar avatar-placeholder">
                <div class="${state.bg} ${state.text} size-8 rounded-full flex items-center justify-center">
                  <span class="text-md uppercase">${initials}</span>
                </div>
              </div>`
          }

          return `<div class="flex gap-3">
              ${avatarOutput}
              <div class="flex flex-col">
                <div class="text-nowrap text-base-content font-medium">${name}</div>
                <div class="text-xs text-nowrap text-base-content">${post}</div>
              </div>
            </div>`
        }
      },
      {
        target: 2,
        render: function (data, type, full, meta) {
          return '<div class="text-nowrap">' + data + '</div>'
        }
      },
      {
        target: 3,
        render: function (data, type, full, meta) {
          return '<div class="text-nowrap">' + data + '</div>'
        }
      },
      {
        target: 4,
        render: function (data, type, full, meta) {
          return '<div class="text-nowrap">' + data + '</div>'
        }
      },
      {
        target: 5,
        render: function (data, type, full, meta) {
          // Use the status value from the JSON
          let status = full['status']
          let badge = ''
          if (status === 1) {
            badge = '<span class="badge badge-soft badge-primary">Current</span>'
          } else if (status === 2) {
            badge = '<span class="badge badge-soft badge-success">Professional</span>'
          } else if (status === 3) {
            badge = '<span class="badge badge-soft badge-error">Rejected</span>'
          } else if (status === 4) {
            badge = '<span class="badge badge-soft badge-warning">Resigned</span>'
          } else if (status === 5) {
            badge = '<span class="badge badge-soft badge-info">Applied</span>'
          } else {
            badge = '<span class="badge badge-soft">Unknown</span>'
          }
          return badge
        }
      },
      {
        target: -1,
        searchable: false,
        orderable: false,
        render: function (data, type, full, meta) {
          return (
            '<div class="flex items-center gap-3">' +
            `<div class="dropdown relative inline-flex [--placement:bottom-end]">
            <button type="button" class="dropdown-toggle btn btn-circle btn-text btn-sm" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
            <span class="icon-[tabler--dots-vertical] size-5.5"></span>
            </button>
            <ul class="dropdown-menu dropdown-open:opacity-100 hidden min-w-60" role="menu" aria-orientation="vertical">
            <li><a class="dropdown-item" href="javascript:void(0);">Details</a></li>
            <li><a class="dropdown-item" href="javascript:void(0);">Archive</a></li>
             <li><hr class="border-base-content/15 -mx-2" /></li>
            <li class="delete-record"><a class="dropdown-item text-error" href="javascript:void(0);">Delete</a></li>
            </ul>
            </div>` +
            '<button class="btn btn-circle btn-text btn-sm" aria-label="View">' +
            '<span class="icon-[tabler--edit] size-4.5"></span>' +
            '</button>' +
            '</div>'
          )
        }
      }
    ],
    drawCallback: function () {
      if (window.HSStaticMethods) {
        window.HSStaticMethods.autoInit('dropdown')
      }
    }
  })

  // Export buttons
  const buttons = document.querySelectorAll('#dropdown-datatable-with-export .dropdown-menu button')
  document.querySelectorAll('#datatable-basic-button .dt-buttons').forEach(buttonContainer => {
    buttonContainer.style.display = 'none'
  })
  buttons.forEach(btn => {
    const type = btn.getAttribute('data-datatable-action-type')
    btn.addEventListener('click', () => dataTable.button(`.buttons-${type}`).trigger())
  })

  const dtSelectTable = document.querySelector('#datatable-basic-button')
  if (dtSelectTable) {
    dtSelectTable.addEventListener('change', function (event) {
      if (event.target && event.target.classList.contains('row-select-checkbox')) {
        const row = event.target.closest('tr')
        if (event.target.checked) {
          row.classList.add('bg-primary/5')
        } else {
          row.classList.remove('bg-primary/5')
        }
      }
    })
  }
  const selectAllCheckbox = document.getElementById('table-ajax-all')
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function () {
      const checkboxes = dtSelectTable.querySelectorAll('tbody .row-select-checkbox')
      checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked
        const row = checkbox.closest('tr')
        if (selectAllCheckbox.checked) {
          row.classList.add('bg-primary/5')
        } else {
          row.classList.remove('bg-primary/5')
        }
      })
    })
  }
  // Attach delete handler after DataTable is initialized
  const userTable = document.querySelector('#datatable-basic-button')
  if (userTable) {
    userTable.querySelector('tbody').addEventListener('click', function (event) {
      let target = event.target
      if (
        target.classList.contains('delete-record') ||
        (target.parentElement && target.parentElement.classList.contains('delete-record'))
      ) {
        let row = target.closest('tr')
        if (row) {
          row.remove() // Remove the row from the DOM
        }
      }
    })
  }

  //Complex Headers
  const dt_complex = new HSDataTable('#datatable-basic-complex', {
    columnDefs: [
      {
        target: 0,
        render: function (data, type, full, meta) {
          return '<div class="text-nowrap">' + data + '</div>'
        }
      },
      {
        target: 1,
        render: function (data, type, full, meta) {
          return '<div class="text-nowrap">' + data + '</div>'
        }
      },
      {
        target: 2,
        render: function (data, type, full, meta) {
          return '<div class="text-nowrap">' + data + '</div>'
        }
      },
      {
        target: 3,
        render: function (data, type, full, meta) {
          return '<div class="text-nowrap">' + data + '</div>'
        }
      },
      {
        target: 4,
        render: function (data, type, full, meta) {
          return '<div class="text-nowrap">' + data + '</div>'
        }
      },
      {
        target: 5,
        render: function (data, type, full, meta) {
          // Use the status value from the JSON
          let status = full['status']
          let badge = ''
          if (status === 1) {
            badge = '<span class="badge badge-soft badge-primary">Current</span>'
          } else if (status === 2) {
            badge = '<span class="badge badge-soft badge-success">Professional</span>'
          } else if (status === 3) {
            badge = '<span class="badge badge-soft badge-error">Rejected</span>'
          } else if (status === 4) {
            badge = '<span class="badge badge-soft badge-warning">Resigned</span>'
          } else if (status === 5) {
            badge = '<span class="badge badge-soft badge-info">Applied</span>'
          } else {
            badge = '<span class="badge badge-soft">Unknown</span>'
          }
          return badge
        }
      },
      {
        target: -1,
        searchable: false,
        orderable: false,
        render: function (data, type, full, meta) {
          return (
            '<div class="flex items-center gap-3">' +
            `<div class="dropdown relative inline-flex [--placement:bottom-end]">
            <button type="button" class="dropdown-toggle btn btn-circle btn-text btn-sm" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
            <span class="icon-[tabler--dots-vertical] size-5.5"></span>
            </button>
            <ul class="dropdown-menu dropdown-open:opacity-100 hidden min-w-60" role="menu" aria-orientation="vertical">
            <li><a class="dropdown-item" href="javascript:void(0);">Details</a></li>
            <li><a class="dropdown-item" href="javascript:void(0);">Archive</a></li>
             <li><hr class="border-base-content/15 -mx-2" /></li>
            <li class="delete-record"><a class="dropdown-item text-error" href="javascript:void(0);">Delete</a></li>
            </ul>
            </div>` +
            '<button class="btn btn-circle btn-text btn-sm" aria-label="View">' +
            '<span class="icon-[tabler--edit] size-4.5"></span>' +
            '</button>' +
            '</div>'
          )
        }
      }
    ],
    drawCallback: function () {
      if (window.HSStaticMethods) {
        window.HSStaticMethods.autoInit('dropdown')
      }
    }
  })
  const dtComplex = document.querySelector('#datatable-basic-complex')
  if (dtComplex) {
    dtComplex.querySelector('tbody').addEventListener('click', function (event) {
      let target = event.target
      if (
        target.classList.contains('delete-record') ||
        (target.parentElement && target.parentElement.classList.contains('delete-record'))
      ) {
        let row = target.closest('tr')
        if (row) {
          row.remove() // Remove the row from the DOM
        }
      }
    })
  }
})
