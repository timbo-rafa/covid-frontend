import { noDataColor } from 'src/utils/color';
import mapboxgl from 'mapbox-gl';

export const choroplethLayerId = 'countries-join';

export function addChoroplethLayer(map: mapboxgl.Map) {
  // Add source for country polygons using the Mapbox Countries tileset
  // The polygons contain an ISO 3166 alpha-3 code which can be used to for joining the data
  // https://docs.mapbox.com/vector-tiles/reference/mapbox-countries-v1
  map.addSource('countries', {
    type: 'vector',
    url: 'mapbox://mapbox.country-boundaries-v1',
  });

  // The mapbox.country-boundaries-v1 tileset includes multiple polygons for some
  // countries with disputed borders.  The following expression filters the
  // map view to show the "US" perspective of borders for disputed countries.
  // Other world views are available, for more details, see the documentation
  // on the "worldview" feature property at
  // https://docs.mapbox.com/data/tilesets/reference/mapbox-countries-v1/#--polygon---worldview-text
  const WORLDVIEW = 'US';
  const worldview_filter = [
    'all',
    ['==', ['get', 'disputed'], 'false'],
    ['any', ['==', 'all', ['get', 'worldview']], ['in', WORLDVIEW, ['get', 'worldview']]],
  ];

  // Add layer from the vector tile source to create the choropleth
  // Insert it below the 'admin-1-boundary-bg' layer in the style
  map.addLayer(
    {
      id: choroplethLayerId,
      type: 'fill',
      source: 'countries',
      paint: {
        'fill-color': noDataColor,
      },
      'source-layer': 'country_boundaries',
      filter: worldview_filter,
    },
    'admin-1-boundary-bg',
  );
}
