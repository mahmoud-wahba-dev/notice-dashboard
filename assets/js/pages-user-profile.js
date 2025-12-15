'use strict'

window.addEventListener('load', () => {
  const dataTable = new HSDataTable('#datatable-with-ajax', {
    columnDefs: [
      {
        target: 0,
        orderable: false,
        searchable: false,
        render: function (data, type, row) {
          return '<input type="checkbox" class="checkbox checkbox-sm checkbox-primary" data-datatable-row-selecting-individual="">'
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
          <div class="bg-base-200 w-6 rounded-full">
            <span>+${avatars.length - 4}</span>
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
})
