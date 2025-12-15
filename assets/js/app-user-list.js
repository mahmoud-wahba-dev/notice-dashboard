'use strict'

window.addEventListener('load', () => {
  const { dataTable } = new HSDataTable('#users-dashboard', {
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
          const email = full['email']
          const image = full['avatar']
          let avatarOutput

          if (image) {
            avatarOutput = `<img src="${assetsPath}img/${commonAssetsPath}avatars/${image}" alt="Avatar" class="avatar rounded-full size-8">`
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
                <div class="text-xs text-nowrap text-base-content">${email}</div>
              </div>
            </div>`
        }
      },
      {
        target: 2,
        render: function (data, type, full, meta) {
          var role = full['role']
          var roleBadgeObj = {
            Subscriber: '<i class="icon-[tabler--crown] text-primary size-5 me-2"></i>',
            Author: '<i class="icon-[tabler--edit] text-warning size-5 me-2"></i>',
            Maintainer: '<i class="icon-[tabler--user] text-success size-5 me-2"></i>',
            Editor: '<i class="icon-[tabler--clock] text-info size-5 me-2"></i>',
            Admin: '<i class="icon-[tabler--device-desktop] text-error size-5 me-2"></i>'
          }
          return `<span class='flex items-center text-base-content'>${roleBadgeObj[role] || ''}${role}</span>`
        }
      },
      {
        target: 3,
        render: function (data, type, full, meta) {
          return '<div class="text-nowrap text-base-content font-medium">' + data + '</div>'
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
            badge = '<span class="badge badge-soft badge-warning">Pending</span>'
          } else if (status === 2) {
            badge = '<span class="badge badge-soft badge-success">Active</span>'
          } else if (status === 3) {
            badge = '<span class="badge badge-soft badge-secondary">Inactive</span>'
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
            '<div class="flex items-center gap-4">' +
            '              <button class=" delete-record btn btn-circle btn-text btn-sm" aria-label="Delete">' +
            '                <span class="icon-[tabler--trash] size-5.5"></span>' +
            '              </button>' +
            '              <button class="btn btn-circle btn-text btn-sm" aria-label="View">' +
            '                <a href="app-user-view-account.html"><span class="icon-[tabler--eye] size-5.5"></span></a>' +
            '              </button>' +
            `              <div class="dropdown relative inline-flex [--placement:bottom-end]">
                <button type="button" class="dropdown-toggle btn btn-circle btn-text btn-sm" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  <span class="icon-[tabler--dots-vertical] size-5.5"></span>
                </button>
                <ul class="dropdown-menu menu-sm dropdown-open:opacity-100 hidden" role="menu" aria-orientation="vertical">
                  <li><a class="dropdown-item" href="javascript:void(0);">Edit</a></li>
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
  document.querySelectorAll('#users-dashboard .dt-buttons').forEach(buttonContainer => {
    buttonContainer.style.display = 'none'
  })

  buttons.forEach(btn => {
    const type = btn.getAttribute('data-datatable-action-type')
    btn.addEventListener('click', () => dataTable.button(`.buttons-${type}`).trigger())
  })

  const selectRole = document.getElementById('select-role')
  const selectPlan = document.getElementById('select-plan')
  const selectStatus = document.getElementById('select-status')

  function applyFilters() {
    const selectedRole = selectRole ? selectRole.value : 'all'
    const selectedPlan = selectPlan ? selectPlan.value : 'all'
    const selectedStatus = selectStatus ? selectStatus.value : 'all'
    const rows = document.querySelectorAll('#users-dashboard tbody tr')
    rows.forEach(row => {
      const roleCell = row.querySelector('td:nth-child(3)')
      const planCell = row.querySelector('td:nth-child(4)')
      const statusCell = row.querySelector('td:nth-child(6)')
      if (!roleCell || !planCell || !statusCell) return
      const roleText = roleCell.textContent.trim()
      const planText = planCell.textContent.trim()
      const statusText = statusCell.textContent.trim()

      const roleMatch = selectedRole === 'all' || roleText === selectedRole
      const planMatch = selectedPlan === 'all' || planText === selectedPlan
      const statusMatch = selectedStatus === 'all' || statusText === selectedStatus

      if (roleMatch && planMatch && statusMatch) {
        row.style.display = ''
      } else {
        row.style.display = 'none'
      }
    })
  }

  if (selectRole) selectRole.addEventListener('change', applyFilters)
  if (selectPlan) selectPlan.addEventListener('change', applyFilters)
  if (selectStatus) selectStatus.addEventListener('change', applyFilters)

  const dtSelectTable = document.querySelector('#users-dashboard')
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
  const userTable = document.querySelector('#users-dashboard')
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
})
