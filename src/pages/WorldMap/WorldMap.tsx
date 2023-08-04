import { styled } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import React from 'react';
import { updateChoroplethColors } from './update-choropleth-colors';
import { useClickRedirectToCountryData } from './use-click-redirect-to-country-data';
import { useCountriesCovidApiQuery } from './use-countries-covid-data';
import { useMapboxChoroplethMap } from './use-mapbox-choropleth-map';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_GL_TOKEN || '';

const StyledDiv = styled('div')({
  height: '100%',
});

export function WorldMap() {
  const { countries, loading, covidDataByCountryIso } = useCountriesCovidApiQuery({});
  const { mapContainer, map, mapHasLoaded } = useMapboxChoroplethMap();

  useClickRedirectToCountryData(map);

  React.useEffect(() => {
    console.log(
      `WorldMap choropleth effect mapHasLoaded=${mapHasLoaded} mapCurrentNotNull=${
        map.current !== null
      } NotLoading=${!loading} countries=${!!countries}}`,
    );
    console.log(`WorldMap choropleth effect ${!!(map.current !== null && mapHasLoaded && !loading && countries)}`);
    if (map.current !== null && mapHasLoaded && !loading && countries) {
      updateChoroplethColors(map.current, countries, 'newCases');
    }
  }, [map, mapHasLoaded, countries, loading]);

  return (
    <StyledDiv>
      <StyledDiv ref={mapContainer} className="map-container" />
    </StyledDiv>
  );
}
