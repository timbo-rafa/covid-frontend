import { styled } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import React from 'react';
import { updateChoroplethColors } from './update-choropleth-colors';
import { useClickRedirectToCountryData } from './use-click-redirect-to-country-data';
import { useMapboxChoroplethMap } from './use-mapbox-choropleth-map';
import { isEmptyObject } from 'src/utils/type';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_GL_TOKEN || '';

const FullHeightMap = styled('div')({
  height: '100%',
});

export type WorldMapProps = {
  columnValueByCountry: Record<string, number | null | undefined>;
};

export function WorldMap({ columnValueByCountry }: WorldMapProps) {
  const { mapContainer, map, mapHasLoaded } = useMapboxChoroplethMap();
  useClickRedirectToCountryData(map);

  React.useEffect(() => {
    if (map.current !== null && mapHasLoaded && !isEmptyObject(columnValueByCountry)) {
      updateChoroplethColors(map.current, columnValueByCountry);
    }
  }, [map, mapHasLoaded, columnValueByCountry]);

  return <FullHeightMap ref={mapContainer} />;
}
