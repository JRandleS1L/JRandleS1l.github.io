mapboxgl.accessToken = API_KEY; 
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jrandle23/cl0qc1h6s003415nwps4anjry', 
    center: [-95.71, 37.09],
    zoom: 5
 });

map.on('click', (event) => {
    const features = map.queryRenderedFeatures(event.point, {
    layers: ['branch-locations']
    });
    if (!features.length) {
        return;
    }
    const feature = features[0];
 
    const popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
    `<h3>${feature.properties.CostCenter}</h3><p>${feature.properties.BranchManager}</p>`
    )
    .addTo(map);
});
// import LegendControl from `mapboxgl-legend`;
// import 'mapboxgl-legend/dist/index.min.css';
map.on('load', () => {
    // map.addSource('branch_locations', {
    //     type: 'vector',
    //     url: 'mapbox://jrandle23.cl0q9kw673pnp28pclv7capq8-62qil'
    // });
    // map.addLayer({
    //     'id': 'Branch_Locations',
    //     'type': 'symbol',
    //     'source': 'branch_locations',
    //     'source-layer': 'branches',
    //     'layout': {
    //         'visibility': 'visible',
    //         'icon-image':'sprite_images/mapbox-marker-icon-red.svg',
    //         'icon-allow-overlap': true,
    //         'icon-size': 0.5,
    //         "text-field": ["step", ["zoom"], "", 22, ""]
            
    //     },
    //     'paint': {}
    // });

    // const legend = new LegendControl();
    // map.addControl(legend, `bottom-left`);

    map.addSource('licensed', {
        type: 'vector',
        url: 'mapbox://jrandle23.4pchtixb'
    });
    // map.addLayer({
    //     'id': 'S1L_Licensed_States',
    //     'type': 'fill',
    //     'source': 'licensed',
    //     'source-layer': 'stateData-6cnzix',
    //     'layout': {
    //         'visibility': 'visible'
    //     },
    //     'paint': {
    //         'fill-color': [
    //             'match',
    //             ['get', 'name'],
    //             [
    //                 "Arizona",
    //                 "Utah",
    //                 "Colorado",
    //                 "Idaho",
    //                 "California",
    //                 "Missouri",
    //                 "Nevada",
    //                 "Arkansas",
    //                 "Florida",
    //                 "Georgia",
    //                 "Alabama",
    //                 "Connecticut",
    //                 "District of Columbia",
    //                 "Delaware",
    //                 "Texas",
    //                 "Indiana",
    //                 "Kansas",
    //                 "Kentucky",
    //                 "Massachusetts",
    //                 "Louisiana",
    //                 "Maryland",
    //                 "Michigan",
    //                 "Mississippi",
    //                 "Minnesota",
    //                 "New Jersey",
    //                 "New Hampshire",
    //                 "North Dakota",
    //                 "Nebraska",
    //                 "North Carolina",
    //                 "Montana",
    //                 "New Mexico",
    //                 "Ohio",
    //                 "Oklahoma",
    //                 "South Carolina",
    //                 "Virginia",
    //                 "Oregon",
    //                 "Hawaii",
    //                 "Wyoming",
    //                 "South Dakota",
    //                 "Iowa",
    //                 "Alaska",
    //                 "Tennessee",
    //                 "Wisconsin",
    //                 "Illinois",
    //                 "Washington"
    //             ],
    //             "hsl(285, 77%, 32%)",
    //             "#000000"
    //         ],
    //         'fill-opacity': 0.25
    //     }
    // });
    map.addLayer({
        'id': 'Figure States Offered',
        'type': 'fill',
        'source': 'licensed',
        'source-layer': 'stateData-6cnzix',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': [
            'match',
            ['get', 'name'],
            [    "Arizona",
                "Alabama",
                "Alaska",
                "Arkansas",
                "California",
                "Colorado",
                "Connecticut",
                "District of Columbia",
                "Florida",
                "Georgia",
                "Indiana",
                "Illinois",
                "Iowa",
                "Idaho",
                "Kansas",
                "Louisiana",
                "Massachusetts",
                "Maine",
                "Michigan",
                "Montana",
                "Missouri",
                "Mississippi",
                "North Carolina",
                "North Dakota",
                "Nebraska",
                "New Hampshire",
                "New Jersey",
                "New Mexico",
                "Nevada",
                "Ohio",
                "Oklahoma",
                "Oregon",
                "Pennsylvania",
                "Rhode Island",
                "Tennessee",
                "Virginia",
                "Vermont",
                "Washington",
                "Wisconsin",
                "Wyoming"
            ],
                "#f69709",
            [
                "West Virginia",
                "New York"
            ],    
            '#000000',
            [
                "South Dakota",
                "Utah", 
                "Minnesota",
                "Texas", 
                "Kentucky",
                "South Carolina",
                "Maryland",
                "Deleware",
        ],
        '#0206d9',
        '#000000'
        ],
        'fill-opacity': 0.35
        }
    });
    map.addLayer({
        'id': 'S1L HELOC',
        'type': 'fill',
        'source': 'licensed',
        'source-layer': 'stateData-6cnzix',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-pattern': [
                "match",
                ["get", "name"],
            [
                "Arizona",
                "Colorado",
                "California",
                "Florida",
                "Georgia",
                "Indiana",
                "Illinois",
                "Idaho",
                "Kansas",
                "Massachusetts",
                "Missouri",
                "Michigan",
                "Nebraska",
                "New Mexico",
                "Nevada",
                "Ohio",
                "Oklahoma",
                "Oregon",
                "Tennessee",
                "Washington"

            ],
            "polka-dots",
            ""
        ],
        'fill-opacity': 0.5
        }
    });
});
// After the last frame rendered before the map enters an "idle" state.
map.on('idle', () => {
// If these two layers were not added to the map, abort
    if (!map.getLayer('Figure States Offered') || !map.getLayer('S1L HELOC')) {
    return;
    }
// Enumerate ids of the layers.
    const toggleableLayerIds = ['Figure States Offered', 'S1L HELOC'];
 
// Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIds) {
// Skip layers that already have a button set up.
        if (document.getElementById(id)) {
            continue;
        }

// Create a link.
        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        link.textContent = id;
        link.className = '';
 
// Show or hide layer when the toggle is clicked.
    link.onclick = function (e) {
        const clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();
 
        const visibility = map.getLayoutProperty(
            clickedLayer,
            'visibility'
        );
 
// Toggle layer visibility by changing the layout object's visibility property.
        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(
                clickedLayer,
                'visibility',
                'visible'
                );
            }
        };
        const layers = document.getElementById('menu');
        layers.appendChild(link);
        }
    });
 