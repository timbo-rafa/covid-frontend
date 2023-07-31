import { useCanadaCovidDataQuery } from '@generated-graphql-hooks';
import { styled } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import React from 'react';
import { useMapboxChoroplethMap } from './use-mapbox-choropleth-map';
import { updateChoroplethColors } from './update-choropleth-colors';
import { useCountriesCovidDataQuery } from './use-countries-covid-data';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_GL_TOKEN || '';

const StyledDiv = styled('div')({
  height: '100%'
})

export function WorldMap() {
  const { mapContainer, map } = useMapboxChoroplethMap()
  const {countries, loading} = useCountriesCovidDataQuery()

  React.useEffect(() => {
    console.log(`UseEffect for update is null ? ${map.current=== null}` )
    console.log(typeof updateChoroplethColors)
    if (map.current !== null && !loading && countries) {
      console.log('updateChoroplethColors')
      updateChoroplethColors(map.current, countries, 'newCases')
    }
  }, [map]);

  return <StyledDiv>
    <StyledDiv ref={mapContainer} className='map-container' />
  </StyledDiv>
}



// return     <MapContainer
//     center={[0, 0]}
//     zoom={2}
//     minZoom={2}
//     maxZoom={2}

//   >
//     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

//     />

//   </MapContainer>