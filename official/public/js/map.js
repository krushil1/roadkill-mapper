mapboxgl.accessToken = //mapbox token
  "YOUR MAPBOX TOKEN";
const map = new mapboxgl.Map({
  container: "map",

  // defines the mapbox style ex: the color 
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 10.5,
  center: [-75.530047, 40.593774],
}); //Loads up the map with the provided API

// fetch stores from api
async function getStores() {
  const res = await fetch("/api/v1/stores");
  const data = await res.json();

  const stores = data.data.map((store) => {
    return {
      type: "Feature",
      geometry: { 
        type: "Point",
        coordinates: [store.location.coordinates[0], store.location.coordinates[1]],
      },
      properties: {
        storeId: store.storeId,
        icon: "marker",
      },
      
    };
  });

  loadMap(stores);
}

// load map with stores
function loadMap(stores) {
  map.on("load", () => {
    // Load an image from an external URL.
    // Add a layer to use the image to represent the data.
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stores,
        },
      },
      layout: {
        "icon-image": "{icon}-15", // reference the image
        "icon-size": 1.5,
        "text-field": "{storeId}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top",
      },
    });
  });
}

// loadMap();
getStores();

// MAKE SURE TO ADD THE CHANGES
// BEFORE PUSHING IT TO PRODUCTION