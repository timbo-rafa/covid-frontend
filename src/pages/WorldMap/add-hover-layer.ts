import mapboxgl from 'mapbox-gl';
import { choroplethLayerId } from './add-choropleth-layer';

export const hoverLayerId = 'country-fills';

let hoveredPolygonId: string | number | null = null;

export function addHoverLayer(map: mapboxgl.Map) {
  map.addSource('countries-hover', {
    type: 'vector',
    url: 'mapbox://mapbox.country-boundaries-v1',
  });
  // The feature-state dependent fill-opacity expression will render the hover effect
  // when a feature's hover state is set to true.
  map.addLayer({
    id: hoverLayerId,
    //'type': 'line',
    type: 'fill',
    source: 'countries-hover',
    'source-layer': 'country_boundaries',
    layout: {},
    paint: {
      //'line-color': [
      'fill-outline-color': ['case', ['boolean', ['feature-state', 'hover'], false], 'blue', 'transparent'],
      'fill-color': 'transparent',
      //'fill-opacity': 1,
    },
  });

  // When the user moves their mouse over the state-fill layer, we'll update the
  // feature state for the feature under the mouse.
  map.on('mousemove', hoverLayerId, (e) => {
    if (e.features?.length) {
      if (hoveredPolygonId !== null) {
        map.setFeatureState(
          {
            source: 'countries-hover',
            sourceLayer: 'country_boundaries',
            id: hoveredPolygonId,
          },
          { hover: false },
        );
      }
      hoveredPolygonId = e.features[0].id || null;
      map.setFeatureState(
        {
          source: 'countries-hover',
          sourceLayer: 'country_boundaries',
          id: hoveredPolygonId || undefined,
        },
        { hover: true },
      );
    }
  });

  // When the mouse leaves the state-fill layer, update the feature state of the
  // previously hovered feature.
  map.on('mouseleave', hoverLayerId, () => {
    if (hoveredPolygonId !== null) {
      map.setFeatureState(
        {
          source: 'countries-hover',
          sourceLayer: 'country_boundaries',
          id: hoveredPolygonId,
        },
        { hover: false },
      );
    }
    hoveredPolygonId = null;
  });
}
