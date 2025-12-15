'use strict'

window.addEventListener('load', () => {
  const dataTable = new HSDataTable('#datatable-billing', {
    columnDefs: [
      {
        target: 0, // For the checkbox column
        orderable: false,
        searchable: false,
        render: function (data, type, row) {
          return '<input type="checkbox" class="checkbox checkbox-sm checkbox-primary" data-datatable-row-selecting-individual="">'
        }
      },
      {
        target: 1,
        render: function (data, type, full, meta) {
          return `<a href="javascript:void(0);" class="text-primary">#${full['invoice_id']}</a>`
        }
      },
      {
        target: 2,
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
        target: 3,
        render: function (data, type, full, meta) {
          const name = full['client_name'] || data
          const service = full['service']
          const image = full['avatar']
          let avatarOutput

          if (image) {
            avatarOutput = `<img src="${assetsPath}img/${commonAssetsPath}avatars/${image}" alt="Avatar" class="avatar rounded-full size-8">`
          } else {
            const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
            const stateNum = Math.floor(Math.random() * states.length)
            const state = states[stateNum]
            const initials = (name.match(/\b\w/g) || []).slice(0, 2).join('').toUpperCase()
            avatarOutput = `<div class="avatar avatar-placeholder">
            <div class="bg-${state}/10 text-${state} size-8 rounded-full ">
            <span class="text-md uppercase">${initials}</span>
            </div>
            </div>`
          }

          return `<div class="flex gap-3">
            ${avatarOutput}
            <div class="flex flex-col">
              <a href="pages-user-profile.html" class="text-nowrap text-base-content font-medium hover:text-primary">${name}</a>
              <div class="text-xs text-nowrap text-base-content">${service}</div>
            </div>
          </div>`
        }
      },
      {
        target: 4,
        render: function (data, type, full, meta) {
          return `<div class="text-nowrap">#${full['total']}</div>`
        }
      },
      {
        targets: 5,
        render: function (data, type, full) {
          const dueDate = new Date(full['due_date'])
          return `
                <span class="hidden">${dueDate.toISOString().slice(0, 10).replace(/-/g, '')}</span>
                ${dueDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              `
        }
      },
      {
        target: 6,
        render: function (data, type, full) {
          const balance = full['balance']
          if (balance === 0) {
            return '<span class="badge badge-soft badge-success text-center"> Paid </span>'
          } else {
            return `<span class="hidden">${balance}</span><span class="text-base-content">${balance}</span>`
          }
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
            <ul class="dropdown-menu dropdown-open:opacity-100 hidden min-w-60" role="menu" aria-orientation="vertical">
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

  // Attach delete handler after DataTable is initialized
  const userTable = document.querySelector('#datatable-with-ajax')
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

  const selectStatus = document.getElementById('filter-status')
  if (selectStatus) {
    selectStatus.addEventListener('change', function () {
      const selectedStatus = this.value
      const rows = document.querySelectorAll('#datatable-billing tbody tr')
      rows.forEach(row => {
        // Get the role text from the 3rd cell (index 2)
        const statusCell = row.querySelector('td:nth-child(3)')
        if (!statusCell) return
        // Remove icon HTML and trim
        const statusText = statusCell.textContent.trim()
        if (selectedStatus === 'all' || statusText === selectedStatus) {
          row.style.display = ''
        } else {
          row.style.display = 'none'
        }
      })
    })
  }
})
