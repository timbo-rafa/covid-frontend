import { Box, styled } from '@mui/material';
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
import { WorldMap } from './WorldMap';

const MapContainer = styled('div')({
  height: '100%',
  position: 'relative',
});

const MapDateSlider = styled(DateSlider)({
  backgroundColor: 'red',
  width: '30%',
  bottom: '10px',
  right: '10px',
  position: 'absolute',
});

const datasetConfig: DatasetConfig = {
  tableName: 'covid',
  timeColumn: 'date',
  countryColumn: 'country',
};

export function WorldMapPage() {
  const { selectedColumnName = 'total_cases' } = useParams();

  const { data, error, isFetching } = useTableApiQuery(datasetConfig);
  const [selectedTime, setSelectedTime] = React.useState<Date>();

  const { columnValueByCountry, dates } = useWorldMapData(data, selectedColumnName, selectedTime, datasetConfig);

  const handleTimeChange = React.useCallback<(event: Event, value: number | number[]) => void>((_event, value) => {
    if (Array.isArray(value)) {
      console.warn(JSON.stringify({ msg: 'invalid slider array value', value }));
      return;
    }
    setSelectedTime(new Date(value));
  }, []);

  return (
    <MapContainer className="map-container">
      <WorldMap columnValueByCountry={columnValueByCountry} />
      <Box>
        <MapDateSlider dates={dates} onChange={handleTimeChange} value={selectedTime} />
      </Box>
    </MapContainer>
  );
}
