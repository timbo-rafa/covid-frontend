import mapboxgl, { Expression } from "mapbox-gl";
import React from "react";

export const baseMatchExpression = ['match', ['get', 'iso_3166_1_alpha_3']];
export const defaultNoValueMatchExpression = 'rgba(0, 0, 0, 0)'

const data = [
  { 'code': 'ROU', 'hdi': 0.811 },
  { 'code': 'RUS', 'hdi': 0.816 },
  { 'code': 'SRB', 'hdi': 0.787 },
];

export function useNewWorldMap() {
  const mapContainer = React.useRef(null);
  const mapRef = React.useRef<mapboxgl.Map | null>(null);
  // const countries = useCountriesQuery();
  const [lng, setLng] = React.useState(0);
  const [lat, setLat] = React.useState(10);
  const [zoom, setZoom] = React.useState(2);

  React.useEffect(() => {
    if (mapRef.current) return; // initialize map only once
    if (!mapContainer.current) return;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 4,
      projection: { name: 'mercator' }
    });

    map.on('load', () => {
      console.log('addSource')
      // Add source for country polygons using the Mapbox Countries tileset
      // The polygons contain an ISO 3166 alpha-3 code which can be used to for joining the data
      // https://docs.mapbox.com/vector-tiles/reference/mapbox-countries-v1
      map.addSource('countries', {
        type: 'vector',
        url: 'mapbox://mapbox.country-boundaries-v1'
      });

      // Build a GL match expression that defines the color for every vector tile feature
      // Use the ISO 3166-1 alpha 3 code as the lookup key for the country shape
      const matchExpression : Expression= ['match', ['get', 'iso_3166_1_alpha_3']];

      // Calculate color values for each country based on 'hdi' value
      for (const row of data) {
        // Convert the range of data values to a suitable color
        const green = row['hdi'] * 255;
        const color = `rgb(0, ${green}, 0)`;

        matchExpression.push(row['code'], color);
      }

      // Last value is the default, used where there is no data
      matchExpression.push('rgba(200, 0, 0, 0)');


      // The mapbox.country-boundaries-v1 tileset includes multiple polygons for some
      // countries with disputed borders.  The following expression filters the
      // map view to show the "US" perspective of borders for disputed countries.
      // Other world views are available, for more details, see the documentation
      // on the "worldview" feature property at
      // https://docs.mapbox.com/data/tilesets/reference/mapbox-countries-v1/#--polygon---worldview-text
      const WORLDVIEW = "US";
      const worldview_filter = ["all", ["==", ["get", "disputed"], "false"], ["any", ["==", "all", ["get", "worldview"]], ["in", WORLDVIEW, ["get", "worldview"]]]];

      // Add layer from the vector tile source to create the choropleth
      // Insert it below the 'admin-1-boundary-bg' layer in the style
      map.addLayer(
        {
          'id': 'countries-join',
          'type': 'fill',
          'source': 'countries',
          'source-layer': 'country_boundaries',
          'paint': {
            'fill-color': matchExpression
          },
          'filter': worldview_filter
        },
        'admin-1-boundary-bg'
      );

      // map.setPaintProperty('country_boundaries', 'fill-color', 'red')
      // map.triggerRepaint()
    });
  }, []);

  return {mapContainer, map: mapRef}
}