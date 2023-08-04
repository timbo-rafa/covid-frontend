import mapboxgl from 'mapbox-gl';
import React from 'react';
import { addChoroplethLayer } from './add-choropleth-layer';
import { addHoverLayer } from './add-hover-layer';

export function useMapboxChoroplethMap() {
  const mapContainer = React.useRef(null);
  const map = React.useRef<mapboxgl.Map | null>(null);
  const [mapHasLoaded, setMapHasLoaded] = React.useState(false);
  React.useEffect(() => {
    const lng = 0;
    const lat = 10;
    const zoom = 2;

    if (map.current) return; // initialize Ref only once
    if (!mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 4,
      projection: { name: 'mercator' },
    });

    map.current.on('load', () => {
      console.log(`map.on('load') mapRefCurrentNull=${map.current === null}`);
      if (!map.current) {
        return;
      }
      addChoroplethLayer(map.current);
      addHoverLayer(map.current);

      setMapHasLoaded(true);
    });
  }, [map, mapContainer]);

  return { mapContainer, map, mapHasLoaded };
}
