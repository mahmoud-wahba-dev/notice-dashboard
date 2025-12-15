const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const initPath = path.resolve(__dirname, './node_modules/');
const outputPath = path.resolve(__dirname, './assets/dist/libs');

// Copy specific files from node_modules to vendor folder
const assets = {
  apexcharts: {
    src: [
      'apexcharts/dist/apexcharts.min.js',
      'apexcharts/dist/apexcharts.css',
      'flyonui/dist/helper-apexcharts.js',
      'flyonui/src/vendor/apexcharts.css'
    ]
  },
  clipboard: {
    src: [
      'clipboard/dist/clipboard.min.js',
      'flyonui/dist/helper-clipboard.js'
    ]
  },
  datatables: {
    src: [
      'datatables.net/js/dataTables.min.js',
      'datatables.net-buttons/js/dataTables.buttons.min.js',
      'datatables.net-buttons/js/buttons.html5.min.js',
      'datatables.net-buttons/js/buttons.print.min.js',
      'datatables.net-fixedheader/js/dataTables.fixedHeader.min.js',
      'datatables.net-fixedcolumns/js/dataTables.fixedColumns.min.js',
      'flyonui/src/vendor/datatables.css',
      'jszip/dist/jszip.min.js',
      'pdfmake/build/pdfmake.min.js',
      'pdfmake/build/vfs_fonts.js'
    ]
  },
  dropzone: {
    src: [
      'dropzone/dist/dropzone-min.js'
    ]
  },
  flatpickr: {
    src: [
      'flatpickr/dist/flatpickr.js',
      'flatpickr/dist/flatpickr.css'
    ]
  },
  flyonui: {
    src: [
      'flyonui/flyonui.js'
    ]
  },
  jquery: {
    src: [
      'jquery/dist/jquery.min.js'
    ]
  },
  lodash: {
    src: [
      'lodash/lodash.min.js'
    ]
  },
  nouislider: {
    src: [
      'nouislider/dist/nouislider.min.js'
    ]
  }
};

function copyAssets() {
  Object.keys(assets).forEach(key => {
    const asset = assets[key];

    asset.src.forEach(file => {
      const src = path.resolve(initPath, file);
      const dest = path.resolve(outputPath, file);

      fse.ensureDirSync(path.dirname(dest));

      fse.copy(src, dest, { overwrite: true }, err => {
        if (err) {
          console.error('Error copying file:', err);
        }
      });
    });
  });
}

copyAssets();
