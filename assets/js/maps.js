// Basic Datamap
; (function () {
  // Dataset containing import and export data for various countries
  const dataSet = {
    CHN: {
      import: {
        value: '11,250',
        percent: '14.5',
        isGrown: true
      },
      export: {
        value: '680',
        percent: '0.5',
        isGrown: true
      },
      fillKey: 'MAJOR',
      short: 'cn'
    },
    DEU: {
      import: {
        value: '9,320',
        percent: '6.1',
        isGrown: true
      },
      export: {
        value: '1,200',
        percent: '6.3',
        isGrown: true
      },
      fillKey: 'MAJOR',
      short: 'de'
    },
    GBR: {
      import: {
        value: '5,050',
        percent: '8.9',
        isGrown: false
      },
      export: {
        value: '2,150',
        percent: '3.7',
        isGrown: true
      },
      fillKey: 'MAJOR',
      short: 'gb'
    },
    IND: {
      import: {
        value: '1,500',
        percent: '18.5',
        isGrown: false
      },
      export: {
        value: '450',
        percent: '12.0',
        isGrown: true
      },
      fillKey: 'MAJOR',
      short: 'in'
    },
    USA: {
      import: {
        value: '480',
        percent: '1.1',
        isGrown: false
      },
      export: {
        value: '1,600',
        percent: '2.5',
        isGrown: true
      },
      fillKey: 'MAJOR',
      short: 'us',
      customName: 'United States'
    },
    CAN: {
      import: {
        value: '2,500',
        percent: '22.0',
        isGrown: true
      },
      export: {
        value: '600',
        percent: '13.0',
        isGrown: true
      },
      fillKey: 'MAJOR',
      short: 'ca'
    },
    AUS: {
      import: {
        value: '1,350',
        percent: '12.0',
        isGrown: true
      },
      export: {
        value: '330',
        percent: '10.0',
        isGrown: true
      },
      fillKey: 'MAJOR',
      short: 'au'
    },
    FRA: {
      import: {
        value: '3,800',
        percent: '16.0',
        isGrown: true
      },
      export: {
        value: '820',
        percent: '15.0',
        isGrown: true
      },
      fillKey: 'MAJOR',
      short: 'fr'
    },
    JPN: {
      import: {
        value: '4,200',
        percent: '21.0',
        isGrown: true
      },
      export: {
        value: '710',
        percent: '18.0',
        isGrown: false
      },
      fillKey: 'MAJOR',
      short: 'jp'
    },
    ITA: {
      import: {
        value: '3,200',
        percent: '14.8',
        isGrown: false
      },
      export: {
        value: '640',
        percent: '12.5',
        isGrown: true
      },
      fillKey: 'MAJOR',
      short: 'it'
    },
    RUS: {
      import: {
        value: '5,600',
        percent: '19.5',
        isGrown: true
      },
      export: {
        value: '1,000',
        percent: '10.5',
        isGrown: true
      },
      fillKey: 'MAJOR',
      short: 'ru'
    },
    MEX: {
      import: {
        value: '2,750',
        percent: '17.5',
        isGrown: false
      },
      export: {
        value: '520',
        percent: '9.2',
        isGrown: true
      },
      fillKey: 'MAJOR',
      short: 'mx'
    },
    ZAF: {
      import: {
        value: '1,800',
        percent: '10.5',
        isGrown: true
      },
      export: {
        value: '450',
        percent: '8.0',
        isGrown: true
      },
      fillKey: 'MAJOR',
      short: 'za'
    }
  }

  // Initialize Datamap
  const dataMap = new Datamap({
    element: document.querySelector('#countries-datamap'), // HTML element to render the map
    projection: 'mercator', // Projection type
    responsive: true, // Enable responsiveness
    fills: {
      defaultFill: `color-mix(in oklab, var(--color-base-200) 60%, transparent)`,
      MAJOR: `color-mix(in oklab, var(--color-neutral) 30%, transparent)`
    },
    data: dataSet, // Country-specific data
    geographyConfig: {
      borderColor: `color-mix(in oklab, var(--color-base-content) 50%, transparent)`, // Border color for countries
      highlightFillColor: `color-mix(in oklab, var(--color-primary) 20%, transparent)`, // Highlight fill color on hover
      highlightBorderColor: `var(--color-primary)`, // Highlight border color on hover
      popupTemplate: function (geo, data) {
        // Popup template for displaying country data
        const growUp = `<span class="icon-[tabler--trending-up] text-success size-4"></span>`
        const growDown = `<span class="icon-[tabler--trending-down] text-error size-4"></span>`
        return `
          <div class="bg-base-100 rounded-lg overflow-hidden shadow-base-300/20 shadow-sm min-w-32 me-2">
            <div class="flex items-center gap-2 bg-base-200 p-2">
              <div class="flex items-center">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css"/>
                <span class="fi fi-${data.short.toLowerCase()} h-4 w-5 rounded-sm"></span>
              </div>
              <span class="text-sm font-medium text-base-content">${data.customName || geo.properties.name}</span>
            </div>
            <div class="p-2 space-y-1">
              <div class="flex items-center justify-between text-xs gap-2">
                <div class="text-base-content/80 text-nowrap">Import: <span class="font-medium">${data.import.value
          }M</span></div>
                <span class="flex items-center gap-0.5 ${data.import.isGrown ? 'text-success' : 'text-error'}">${data.import.percent
          }${data.import.isGrown ? growUp : growDown}</span>
              </div>
              <div class="flex items-center justify-between text-xs gap-2">
                <div class="text-base-content/80 text-nowrap">Export: <span class="font-medium">${data.export.value
          }</span>M</div>
                <span class="flex items-center gap-0.5 ${data.export.isGrown ? 'text-success' : 'text-error'}">${data.export.percent
          }${data.export.isGrown ? growUp : growDown}</span>
              </div>
            </div>
          </div>`
      }
    }
  })
  // Event listener for window resize to make Datamap responsive
  window.addEventListener('resize', function () {
    dataMap.resize()
  })

  // State Label
  const stateData = {
    "AZ": {
      "fillKey": "Republican",
      "electoralVotes": 5
    },
    "CO": {
      "fillKey": "Light Democrat",
      "electoralVotes": 5
    },
    "DE": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "FL": {
      "fillKey": "UNDECIDED",
      "electoralVotes": 29
    },
    "GA": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "HI": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "ID": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "IL": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "IN": {
      "fillKey": "Republican",
      "electoralVotes": 11
    },
    "IA": {
      "fillKey": "Light Democrat",
      "electoralVotes": 11
    },
    "KS": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "KY": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "LA": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "MD": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "ME": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "MA": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "MN": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "MI": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "MS": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "MO": {
      "fillKey": "Republican",
      "electoralVotes": 13
    },
    "MT": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "NC": {
      "fillKey": "Light Republican",
      "electoralVotes": 32
    },
    "NE": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "NV": {
      "fillKey": "Heavy Democrat",
      "electoralVotes": 32
    },
    "NH": {
      "fillKey": "Light Democrat",
      "electoralVotes": 32
    },
    "NJ": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "NY": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "ND": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "NM": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "OH": {
      "fillKey": "UNDECIDED",
      "electoralVotes": 32
    },
    "OK": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "OR": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "PA": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "RI": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "SC": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "SD": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "TN": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "TX": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "UT": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "WI": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "VA": {
      "fillKey": "Light Democrat",
      "electoralVotes": 32
    },
    "VT": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "WA": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "WV": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "WY": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "CA": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "CT": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "AK": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "AR": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "AL": {
      "fillKey": "Republican",
      "electoralVotes": 32
    }
  }

  const election = new Datamap({
    scope: 'usa',
    projection: 'mercator', // Projection type
    responsive: true, // Enable responsiveness
    element: document.querySelector('#state-label'),
    fills: {
      'Republican': 'color-mix(in oklab, var(--color-error) 50%, transparent)',
      'Democrat': 'color-mix(in oklab, var(--color-accent) 70%, transparent)',
      'Heavy Democrat': 'color-mix(in oklab, var(--color-accent) 50%, transparent)',
      'Light Democrat': 'color-mix(in oklab, var(--color-accent) 30%, transparent)',
      'Heavy Republican': 'color-mix(in oklab, var(--color-info) 30%, transparent)',
      'Light Republican': 'color-mix(in oklab, var(--color-error) 30%, transparent)',
      defaultFill: 'color-mix(in oklab, var(--color-warning) 30%, transparent)'
    },
    data: stateData, // Country-specific data
    geographyConfig: {
      borderColor: `color-mix(in oklab, var(--color-base-content) 50%, transparent)`, // Border color for countries
      highlightFillColor: `color-mix(in oklab, var(--color-primary) 20%, transparent)`, // Highlight fill color on hover
      highlightBorderColor: `var(--color-primary)`, // Highlight border color on hover
      popupTemplate: function (geography, data) {
        return '<div class="bg-base-100 rounded-lg shadow-base-300/20 shadow-sm p-2 border border-base-content/20">' + geography.properties.name + '<br>' +
          'Electoral Votes: ' + data.electoralVotes + '</div>';
      },
      highlightBorderWidth: 3
    },
  })
  election.labels();

  // Arcs
  const arcData = {
    'TX': { fillKey: 'win' },
    'FL': { fillKey: 'win' },
    'NC': { fillKey: 'win' },
    'CA': { fillKey: 'win' },
    'NY': { fillKey: 'win' },
    'CO': { fillKey: 'win' }
  }
  const arcs = new Datamap({
    element: document.querySelector('#arcs'), // HTML element to render the map
    projection: 'mercator', // Projection type
    responsive: true, // Enable responsiveness
    scope: 'usa',
    fills: {
      defaultFill: "color-mix(in oklab, var(--color-neutral) 10%, transparent)",
      win: 'color-mix(in oklab, var(--color-base-200) 80%, transparent)'
    },
    data: arcData,
    geographyConfig: {
      borderColor: `color-mix(in oklab, var(--color-base-content) 50%, transparent)`, // Border color for countries
      highlightFillColor: `color-mix(in oklab, var(--color-primary) 20%, transparent)`, // Highlight fill color on hover
      highlightBorderColor: `var(--color-primary)`
    }
  });
  arcs.arc([
    {
      origin: 'CA',
      destination: 'TX'
    },
    {
      origin: 'OR',
      destination: 'TX'
    },
    {
      origin: 'NY',
      destination: 'TX'
    },
    {
      origin: {
        latitude: 40.639722,
        longitude: -73.778889
      },
      destination: {
        latitude: 37.618889,
        longitude: -122.375
      }
    },
    {
      origin: {
        latitude: 30.194444,
        longitude: -97.67
      },
      destination: {
        latitude: 25.793333,
        longitude: -80.290556
      },
      options: {
        strokeWidth: 2,
        strokeColor: 'rgba(100, 10, 200, 0.4)',
        greatArc: true
      }
    },
    {
      origin: {
        latitude: 39.861667,
        longitude: -104.673056
      },
      destination: {
        latitude: 35.877778,
        longitude: -78.7875
      }
    }
  ], { strokeWidth: 1, arcSharpness: 1.4 });

  const bubbleMap = new Datamap({
    projection: 'mercator', // Projection type
    responsive: true, // Enable responsiveness
    element: document.querySelector('#bubbles'),
    fills: {
      defaultFill: 'color-mix(in oklab, var(--color-success) 50%, transparent)',
      USA: 'var(--color-accent)',
      RUS: 'var(--color-error)'
    },
    geographyConfig: {
      popupOnHover: false,
      highlightOnHover: false
    }
  });
  bubbleMap.bubbles([
    {
      name: 'Not a bomb, but centered on Brazil',
      radius: 23,
      centered: 'BRA',
      country: 'USA',
      yeild: 0,
      fillKey: 'USA',
      date: '1954-03-01'
    },
    {
      name: 'Not a bomb',
      radius: 15,
      yeild: 0,
      country: 'USA',
      centered: 'USA',
      date: '1986-06-05',
      significance: 'Centered on US',
      fillKey: 'USA'
    },
    {
      name: 'Castle Bravo',
      radius: 25,
      yeild: 15000,
      country: 'USA',
      significance: 'First dry fusion fuel "staged" thermonuclear weapon; a serious nuclear fallout accident occurred',
      fillKey: 'USA',
      date: '1954-03-01',
      latitude: 11.415,
      longitude: 165.1619
    }, {
      name: 'Tsar Bomba',
      radius: 70,
      yeild: 50000,
      country: 'USSR',
      fillKey: 'RUS',
      significance: 'Largest thermonuclear weapon ever tested—scaled down from its initial 100 Mt design by 50%',
      date: '1961-10-31',
      latitude: 73.482,
      longitude: 54.5854
    }
  ], {
    popupTemplate: function (geo, data) {
      return '<div class="bg-base-100 rounded-lg shadow-base-300/20 shadow-sm p-2 border border-base-content/20 text-wrap">Yield: ' + data.yield + '<br>Exploded on ' + data.date + ' by the ' + data.country + '</div>';
    }
  });
})()
