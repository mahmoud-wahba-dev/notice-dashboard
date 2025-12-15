'use strict'

window.addEventListener('load', () => {
  const dataTable = new HSDataTable('#datatable-advanced-ajax', {
    columns: [
      { title: 'Full Name', data: 0 },
      { title: 'Email', data: 1 },
      { title: 'Position', data: 2 },
      { title: 'Office', data: 3 },
      { title: 'Start Date', data: 4 },
      { title: 'Salary', data: 5 }
    ]
  });

  //Column Search
  const dt_filter_table = new HSDataTable('#datatable-advanced-filter', {
    columnDefs: [
      {
        target: 0,
        render: function (data, type, full, meta) {
          return '<div class="text-wrap">' + data + '</div>'
        }
      },
      {
        target: 1,
        render: function (data, type, full, meta) {
          return '<div class="text-wrap">' + data + '</div>'
        }
      },
      {
        target: 2,
        render: function (data, type, full, meta) {
          return '<div class="text-wrap">' + data + '</div>'
        }
      },
      {
        target: 3,
        render: function (data, type, full, meta) {
          return '<div class="text-wrap">' + data + '</div>'
        }
      },
      {
        target: 4,
        render: function (data, type, full, meta) {
          return '<div class="text-wrap">' + data + '</div>'
        }
      },
      {
        target: 5,
        render: function (data, type, full, meta) {
          return '<div class="text-wrap">' + data + '</div>'
        }
      },
    ],
  });

  //Advance Search
  flatpickr('.flatpickr-date', {
    monthSelectorType: 'static',
    dateFormat: 'm/d/Y'
  });
  const dt_advanced_search = new HSDataTable('#datatable-advanced-search', {
    columnDefs: [
      {
        target: 0,
        render: function (data, type, full, meta) {
          return '<div class="text-wrap">' + data + '</div>'
        }
      },
      {
        target: 1,
        render: function (data, type, full, meta) {
          return '<div class="text-wrap">' + data + '</div>'
        }
      },
      {
        target: 2,
        render: function (data, type, full, meta) {
          return '<div class="text-wrap">' + data + '</div>'
        }
      },
      {
        target: 3,
        render: function (data, type, full, meta) {
          return '<div class="text-wrap">' + data + '</div>'
        }
      },
      {
        target: 4,
        render: function (data, type, full, meta) {
          return '<div class="text-wrap">' + data + '</div>'
        }
      },
      {
        target: 5,
        render: function (data, type, full, meta) {
          return '<div class="text-wrap">' + data + '</div>'
        }
      },
    ],
  });
});
