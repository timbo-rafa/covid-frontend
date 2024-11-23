import { styled } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import React from 'react';
import { updateChoroplethColors } from './update-choropleth-colors';
import { useClickRedirectToCountryData } from './use-click-redirect-to-country-data';
import { useMapboxChoroplethMap } from './use-mapbox-choropleth-map';
import { useTableApiQuery } from './use-table-api-query.hook';
import { CountryIso3 } from '@geo-utils';
import { useParams } from 'react-router-dom';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_GL_TOKEN || '';

const StyledDiv = styled('div')({
  height: '100vh',
});

type CountryDataType = {
  code: CountryIso3
} & Record<string, string | number>

export function WorldMap() {

  const {selectedColumnName}  = useParams();
  

  const dataset = 'covid';
  const {data,error,isFetching} = useTableApiQuery<CountryDataType>(dataset)
  const { mapContainer, map, mapHasLoaded } = useMapboxChoroplethMap();

  console.log(data?.length)
  useClickRedirectToCountryData(map);

  React.useEffect(() => {
    if (map.current !== null && mapHasLoaded && !isFetching && data && selectedColumnName) {
      updateChoroplethColors(map.current, data, selectedColumnName);
    }
  }, [map, mapHasLoaded, data, isFetching, selectedColumnName]);

  return (
    <StyledDiv>
      <StyledDiv ref={mapContainer} className="map-container" />
    </StyledDiv>
  );
}
