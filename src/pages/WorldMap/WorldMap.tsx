import React from 'react';
import mapboxgl from 'mapbox-gl';
import { styled } from '@mui/material';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_GL_TOKEN || '';

const StyledDiv = styled('div')({
  height: '100%'
})

export function WorldMap() {
  const mapContainer = React.useRef(null);
  const map = React.useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = React.useState(0);
  const [lat, setLat] = React.useState(10);
  const [zoom, setZoom] = React.useState(2);

  React.useEffect(() => {
    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 4,
      projection: {
        name: 'mercator'
      }
    });

  }, []);

  return <StyledDiv>
    <StyledDiv ref={mapContainer} className='map-container' />
  </StyledDiv>


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
  
}