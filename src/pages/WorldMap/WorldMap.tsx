import React from 'react';
import mapboxgl from 'mapbox-gl';
import { styled } from '@mui/material';
import * as countries from './api-response.json';
import { useMapboxChoroplethMap } from './use-mapbox-choropleth-map';
import { updateChoroplethColors } from './update-choropleth-colors';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_GL_TOKEN || '';

const StyledDiv = styled('div')({
  height: '100%'
})

export function useCountriesQuery() {
  return countries;
}

export function WorldMap() {
  const { mapContainer, map } = useMapboxChoroplethMap()
  const countries = useCountriesQuery()

  React.useEffect(() => {
    console.log(`UseEffect for update is null ? ${map.current=== null}` )
    if (map.current !== null) {
      console.log('updateChoroplethColors')
      updateChoroplethColors(map.current, countries as any, 'newCases')
    }
  }, [map, countries]);

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