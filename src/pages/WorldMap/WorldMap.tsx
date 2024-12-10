import { styled } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import React from 'react';
import { updateChoroplethColors } from './update-choropleth-colors';
import { useClickRedirectToCountryData } from './use-click-redirect-to-country-data';
import { useMapboxChoroplethMap } from './use-mapbox-choropleth-map';
import { isEmptyObject } from 'src/utils/type';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_GL_TOKEN || '';

const FullHeightMap = styled('div')({
  maxHeight: 'inherit',
  gridColumnStart: 1,
  gridColumnEnd: 10,
  gridRowStart: 1,
  gridRowEnd: 11,
  backgroundColor: 'green'
});

export type WorldMapProps = {
  columnValueByCountry: Record<string, number>;
};

export const WorldMap = React.memo(({ columnValueByCountry }: WorldMapProps) => {
  const { mapContainer, map, mapHasLoaded } = useMapboxChoroplethMap();
  //useClickRedirectToCountryData(map);
  
  React.useEffect(() => {
    if (map.current !== null && mapHasLoaded && !isEmptyObject(columnValueByCountry)) {
      updateChoroplethColors(map.current, columnValueByCountry);
      console.log("🚀 | updateChoroplethColors")
    }
  }, [map, mapHasLoaded, columnValueByCountry]);

  return <FullHeightMap ref={mapContainer} />;
});
