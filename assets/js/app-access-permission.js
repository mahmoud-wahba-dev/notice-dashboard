'use strict'

window.addEventListener('load', () => {
  const dataTable = new HSDataTable('#datatable-permission', {
    columnDefs: [{
      target: 0,
      render: function (data, type, full, meta) {
        return '<span class="text-wrap text-base-content">' + data + '</span>'
      }
    },
    {
      target: 1, // User Role(s)
      orderable: false,
      render: function (data, type, full, meta) {
        const assignedTo = full['assigned_to'];
        let output = '';
        const userList = "#"; // Change this to your actual user list URL if needed
        const roleBadgeObj = {
          Admin: `<a href="${userList}"><span class="badge badge-soft badge-primary me-4">Administrator</span></a>`,
          Manager: `<a href="${userList}"><span class="badge badge-soft badge-warning me-4">Manager</span></a>`,
          Users: `<a href="${userList}"><span class="badge badge-soft badge-success me-4">Users</span></a>`,
          Support: `<a href="${userList}"><span class="badge badge-soft badge-info me-4">Support</span></a>`,
          Restricted: `<a href="${userList}"><span class="badge badge-soft badge-error me-4">Restricted User</span></a>`
        };


        if (Array.isArray(assignedTo)) {
          assignedTo.forEach(role => {
            output += roleBadgeObj[role] || '';
          });
        } else if (typeof assignedTo === 'string') {
          // If it's a single role as string
          output = roleBadgeObj[assignedTo] || '';
        }

        return `<span class="text-nowrap">${output}</span>`;
      }
    },
    {
      target: 2,
      render: function (data, type, full, meta) {
        return '<span class="text-nowrap">' + data + '</span>'
      }
    },
    {
      target: -1,
      searchable: false,
      orderable: false,
      render: function (data, type, full, meta) {
        return (
          '<div class="flex items-center gap-4">' +
          '<button class="btn btn-circle btn-text btn-sm" aria-label="View">' +
          '<span class="icon-[tabler--edit] size-5.5"></span>' +
          '</button>' +
          `<div class="dropdown relative inline-flex [--placement:bottom-end]">
            <button type="button" class="dropdown-toggle btn btn-circle btn-text btn-sm" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
            <span class="icon-[tabler--dots-vertical] size-5.5"></span>
            </button>
            <ul class="dropdown-menu dropdown-open:opacity-100 hidden min-w-60" role="menu" aria-orientation="vertical">
            <li><a class="dropdown-item" href="javascript:void(0);">Edit</a></li>
            <li><a class="dropdown-item" href="javascript:void(0);">Suspended</a></li>
            </ul>
            </div>` +
          '</div>'
        )
      }
    }
    ],
  });
});
