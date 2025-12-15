'use strict'

window.addEventListener('load', () => {
  const { dataTableProject } = new HSDataTable('#datatable-project', {
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
          return `<div class="flex gap-3">
            <img src="${assetsPath}img/brands/${full['project_img']}" alt="Avatar" class="avatar rounded-full size-8">
             <div class="flex flex-col">
               <div class="text-nowrap text-base-content font-medium">${data}</div>
               <div class="text-xs text-nowrap text-base-content">${full['date']}</div>
             </div>
          </div>`
        }
      },
      {
        target: 2,
        render: function (data, type, full, meta) {
          return '<div class="text-nowrap text-base-content font-medium">' + data + '</div>'
        }
      },
      {
        target: 3,
        render: function (data, type, full, meta) {
          var avatars = full['team'] // Access the team array from the JSON
          var avatarHTML = '<div class="avatar-group pull-up -space-x-3">'
          var visibleAvatars = avatars.slice(0, 4)

          visibleAvatars.forEach(function (avatar, index) {
            avatarHTML += `
        <div class="tooltip-toggle avatar" title="Member ${index + 1}">
          <div class="w-6 rounded-full">
            <img src="${assetsPath}img/${commonAssetsPath}avatars/${avatar}" alt="avatar-${index + 1}" />
          </div>
        </div>
      `
          })

          if (avatars.length > 4) {
            avatarHTML += `
        <div class="avatar avatar-placeholder">
          <div class="w-6 rounded-full">
            <span class="bg-base-200">+${avatars.length - 4}</span>
          </div>
        </div>
      `
          }

          avatarHTML += '</div>'

          return avatarHTML
        }
      },

      {
        target: 4,
        render: function (data, type, full, meta) {
          var $state = full['state']
          var progressValue = parseInt(data.replace('%', ''), 10)

          return `
            <div class="flex items-center">
              <div class="progress w-56" role="progressbar" aria-label="Rounded Progressbar"
                   aria-valuenow="${progressValue}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar progress-primary" style="width: ${progressValue}%"></div>
              </div>
              <span class="ml-2 text-base-content">${progressValue}%</span>
            </div>
          `
        }
      },
      {
        target: -1,
        searchable: false,
        orderable: false,
        render: function (data, type, full, meta) {
          return `<div class="dropdown relative inline-flex [--placement:bottom-end]">
            <button type="button" class="dropdown-toggle btn btn-circle btn-text btn-sm" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
            <span class="icon-[tabler--dots-vertical] size-5.5"></span>
            </button>
            <ul class="dropdown-menu dropdown-open:opacity-100 hidden min-w-60" role="menu" aria-orientation="vertical">
            <li><a class="dropdown-item" href="javascript:void(0);">Details</a></li>
            <li><a class="dropdown-item" href="javascript:void(0);">Archive</a></li>
            <li><hr class="border-base-content/15 -mx-2" /></li>
            <li class="delete-record"><a class="dropdown-item text-error" href="javascript:void(0);">Delete</a></li>
            </ul>
            </div>`
        }
      }
    ],
    drawCallback: function () {
      if (window.HSStaticMethods) {
        window.HSStaticMethods.autoInit('dropdown')
      }
    }
  })

  // Attach delete handler after DataTable is initialized
  const userTable = document.querySelector('#datatable-project')
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

  const dtSelectTable = document.querySelector('#datatable-project')
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

  //Invoice datatable
  const { dataTable } = new HSDataTable('#datatable-invoice', {
    dom: 'B', // Required for buttons to work
    buttons: [
      {
        extend: 'copy',
        exportOptions: {
          columns: [1, 2, 3, 4] // Columns to include (adjust indices as needed)
        }
      },
      {
        extend: 'csv',
        exportOptions: {
          columns: [1, 2, 3, 4]
        }
      },
      {
        extend: 'excel',
        exportOptions: {
          columns: [1, 2, 3, 4]
        }
      },
      {
        extend: 'pdf',
        exportOptions: {
          columns: [1, 2, 3, 4]
        }
      },
      {
        extend: 'print',
        exportOptions: {
          columns: [1, 2, 3, 4]
        }
      }
    ],
    columnDefs: [
      {
        target: 0,
        render: function (data, type, full, meta) {
          return '<div class="text-primary">' + data + '</div>'
        }
      },
      {
        target: 1,
        render: function (data, type, full, meta) {
          var status = full['invoice_status']

          var invoiceStatusBadgeObj = {
            Sent: '<div class="avatar avatar-placeholder"><div class="bg-secondary/10 text-secondary w-7.5 rounded-full"><span class="icon-[tabler--mail] size-4 shrink-0"></span></div></div>',
            Draft:
              '<div class="avatar avatar-placeholder"><div class="bg-primary/10 text-primary w-7.5 rounded-full"><span class="icon-[tabler--folder] size-4 shrink-0"></span></div></div>',
            'Past Due':
              '<div class="avatar avatar-placeholder"><div class="bg-error/10 text-error w-7.5 rounded-full"><span class="icon-[tabler--alert-triangle] size-4 shrink-0"></span></div></div>',
            'Partial Payment':
              '<div class="avatar avatar-placeholder"><div class="bg-success/10 text-success w-7.5 rounded-full"><span class="icon-[tabler--check] size-4 shrink-0"></span></div></div>',
            Paid: '<div class="avatar avatar-placeholder"><div class="bg-warning/10 text-warning w-7.5 rounded-full"><span class="icon-[tabler--chart-pie-2] size-4 shrink-0"></span></div></div>',
            Downloaded:
              '<div class="avatar avatar-placeholder"><div class="bg-info/10 text-info w-7.5 rounded-full"><span class="icon-[tabler--arrow-down] size-4 shrink-0"></span></div></div>'
          }

          return `<span class='flex items-center text-base-content'>${invoiceStatusBadgeObj[status]}</span>`
        }
      },
      {
        target: 2,
        render: function (data, type, full, meta) {
          return `<div class="text-nowrap">$${full['total']}</div>`
        }
      },
      {
        target: -1,
        searchable: false,
        orderable: false,
        render: function (data, type, full, meta) {
          return (
            '<div class="flex items-center gap-4">' +
            '<button class=" delete-record btn btn-circle btn-text btn-sm" aria-label="Delete">' +
            '<span class="icon-[tabler--trash] size-5.5"></span>' +
            '</button>' +
            '<button class="btn btn-circle btn-text btn-sm" aria-label="View">' +
            '<span class="icon-[tabler--eye] size-5.5"></span>' +
            '</button>' +
            `<div class="dropdown relative inline-flex [--placement:bottom-end]">
            <button type="button" class="dropdown-toggle btn btn-circle btn-text btn-sm" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
            <span class="icon-[tabler--dots-vertical] size-5.5"></span>
            </button>
            <ul class="dropdown-menu dropdown-open:opacity-100 hidden max-w-40" role="menu" aria-orientation="vertical">
            <li><a class="dropdown-item" href="javascript:void(0);">Download</a></li>
              <li><a class="dropdown-item" href="javascript:void(0)">Edit</a></li>
            <li><a class="dropdown-item" href="javascript:void(0);">Suspended</a></li>
            </ul>
            </div>` +
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

  // Remove extra button due to dom: 'B', ;
  const buttons = document.querySelectorAll('#dropdown-datatable-with-export .dropdown-menu button')
  document.querySelectorAll('#datatable-invoice .dt-buttons').forEach(buttonContainer => {
    buttonContainer.style.display = 'none'
  })

  buttons.forEach(btn => {
    const type = btn.getAttribute('data-datatable-action-type')
    btn.addEventListener('click', () => dataTable.button(`.buttons-${type}`).trigger())
  })

  const invoiceTable = document.querySelector('#datatable-invoice')
  if (invoiceTable) {
    invoiceTable.querySelector('tbody').addEventListener('click', function (event) {
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
