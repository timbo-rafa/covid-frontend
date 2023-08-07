import { styled } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import React from 'react';
import { updateChoroplethColors } from './update-choropleth-colors';
import { useClickRedirectToCountryData } from './use-click-redirect-to-country-data';
import { useCountriesCovidApiQuery } from './use-countries-covid-data';
import { useMapboxChoroplethMap } from './use-mapbox-choropleth-map';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_GL_TOKEN || '';

const StyledDiv = styled('div')({
  height: '100vh',
});

export function WorldMap() {
  const { countries, loading, covidDataByCountryIso } = useCountriesCovidApiQuery({});
  const { mapContainer, map, mapHasLoaded } = useMapboxChoroplethMap();

  useClickRedirectToCountryData(map);

  React.useEffect(() => {
    if (map.current !== null && mapHasLoaded && !loading && countries) {
      updateChoroplethColors(map.current, countries, 'totalCases');
    }
  }, [map, mapHasLoaded, countries, loading]);

  return (
    <StyledDiv>
      <StyledDiv ref={mapContainer} className="map-container" />
    </StyledDiv>
  );
}
