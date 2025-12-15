'use strict'

window.addEventListener('load', () => {
  const dt_extensions_scrollable = new HSDataTable('#datatable-extensions-scrollable', {
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
          return '<div class="text-nowrap">' + data + '</div>'
        }
      },
      {
        target: 6,
        render: function (data, type, full, meta) {
          return '<div class="text-nowrap">' + data + '</div>'
        }
      },
      {
        target: 7,
        render: function (data, type, full, meta) {
          return '<div class="text-nowrap">' + data + '</div>'
        }
      },
      {
        target: 8,
        render: function (data, type, full, meta) {
          // Use the status value from the JSON
          let status = full['status'];
          let badge = '';
          if (status === 1) {
            badge = '<span class="badge badge-soft badge-primary">Current</span>';
          } else if (status === 2) {
            badge = '<span class="badge badge-soft badge-success">Professional</span>';
          } else if (status === 3) {
            badge = '<span class="badge badge-soft badge-error">Rejected</span>';
          } else if (status === 4) {
            badge = '<span class="badge badge-soft badge-warning">Resigned</span>';
          } else if (status === 5) {
            badge = '<span class="badge badge-soft badge-info">Applied</span>';
          }
          else {
            badge = '<span class="badge badge-soft">Unknown</span>';
          }
          return badge;
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
        window.HSStaticMethods.autoInit('dropdown');
      }
    }
  });
  // Attach delete handler after DataTable is initialized
  const dtScrollable = document.querySelector("#datatable-extensions-scrollable");
  if (dtScrollable) {
    dtScrollable.querySelector("tbody").addEventListener("click", function (event) {
      let target = event.target;
      if (
        target.classList.contains("delete-record") ||
        (target.parentElement && target.parentElement.classList.contains("delete-record"))
      ) {
        let row = target.closest("tr");
        if (row) {
          row.remove(); // Remove the row from the DOM
        }
      }
    });
  }

  //Select
  const dt_extensions_select = new HSDataTable('#datatable-extensions-select', {
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
        target: 7,
        render: function (data, type, full, meta) {
          // Use the status value from the JSON
          let status = full['status'];
          let badge = '';
          if (status === 1) {
            badge = '<span class="badge badge-soft badge-primary">Current</span>';
          } else if (status === 2) {
            badge = '<span class="badge badge-soft badge-success">Professional</span>';
          } else if (status === 3) {
            badge = '<span class="badge badge-soft badge-error">Rejected</span>';
          } else if (status === 4) {
            badge = '<span class="badge badge-soft badge-warning">Resigned</span>';
          } else if (status === 5) {
            badge = '<span class="badge badge-soft badge-info">Applied</span>';
          }
          else {
            badge = '<span class="badge badge-soft">Unknown</span>';
          }
          return badge;
        }
      }
    ],
  });
  const dtSelectTable = document.querySelector('#datatable-extensions-select');
  if (dtSelectTable) {
    dtSelectTable.addEventListener('change', function (event) {
      if (event.target && event.target.classList.contains('row-select-checkbox')) {
        const row = event.target.closest('tr');
        if (event.target.checked) {
          row.classList.add('bg-primary/5');
        } else {
          row.classList.remove('bg-primary/5');
        }
      }
    });
  }
  const selectAllCheckbox = document.getElementById('table-ajax-select');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function () {
      const checkboxes = dtSelectTable.querySelectorAll('tbody .row-select-checkbox');
      checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
        const row = checkbox.closest('tr');
        if (selectAllCheckbox.checked) {
          row.classList.add('bg-primary/5');
        } else {
          row.classList.remove('bg-primary/5');
        }
      });
    });
  }
});
