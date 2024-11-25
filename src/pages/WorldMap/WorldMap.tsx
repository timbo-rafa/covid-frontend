import { styled } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import React from 'react';
import { updateChoroplethColors } from './update-choropleth-colors';
import { useClickRedirectToCountryData } from './use-click-redirect-to-country-data';
import { useMapboxChoroplethMap } from './use-mapbox-choropleth-map';
import { useTableApiQuery } from './use-table-api-query.hook';
import { useParams } from 'react-router-dom';
import { DateSlider } from 'src/components/DateSlider';
import { useWorldMapData } from 'src/pages/WorldMap/use-world-map-data.hook';
import { DatasetConfig } from 'src/api/api';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_GL_TOKEN || '';

const FullHeightDiv = styled('div')({
  height: 'calc(100% - 64px)',
});

const MapContainer = styled('div')({
  ":nth-of-type": {
    position: 'relative',
    height: '100%'
  }
})

const datasetConfig: DatasetConfig = {
  tableName: 'covid',
  timeColumn: 'date',
  countryColumn: 'country'
}

export function WorldMap() {

  const {selectedColumnName= 'total_cases'}  = useParams();
  

  const { data, error, isFetching } = useTableApiQuery(datasetConfig)
  const [selectedTime, setSelectedTime] = React.useState<Date>();

  const {columnValueByCountry,dates} = useWorldMapData(data, selectedColumnName, selectedTime, datasetConfig)
  const { mapContainer, map, mapHasLoaded } = useMapboxChoroplethMap();

  console.log(JSON.stringify(columnValueByCountry))
  useClickRedirectToCountryData(map);

  const handleTimeChange = React.useCallback<(event: Event, value: number | number[]) => void>((_event, value) => {
    if (Array.isArray(value)) {
      console.log(JSON.stringify({msg: 'slider array value', value}))
      return
    }
    setSelectedTime(new Date(value))
}, [])

  React.useEffect(() => {
    if (map.current !== null && mapHasLoaded && !isFetching && !error) {
      updateChoroplethColors(map.current, columnValueByCountry);
    }
  }, [map, mapHasLoaded, data, isFetching, error, columnValueByCountry]);

  return (

      <FullHeightDiv ref={mapContainer} className="map-container" />
      

  );
}
