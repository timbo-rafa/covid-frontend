import { Box, styled } from '@mui/material';
import React from 'react';
import { useTableApiQuery } from './use-table-api-query.hook';
import { useParams } from 'react-router-dom';
import { DateSlider } from 'src/components/DateSlider';
import { useWorldMapData } from 'src/pages/WorldMap/use-world-map-data.hook';
import { DatasetConfig } from 'src/api/api';
import { WorldMap } from './WorldMap';

const MapContainer = styled('div')({
  height: 'calc(100% - 64px)',
  display: 'grid',
});

const MapControlBox = styled(Box)({
  backgroundColor: 'rgba(255,0,0,0.5)',
  gridRowStart: 10,
  gridRowEnd: 10,
  gridColumnStart: 7,
  gridColumnEnd: 10
})

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
      <MapControlBox>
        <DateSlider dates={dates} onChange={handleTimeChange} value={selectedTime} />
      </MapControlBox>
    </MapContainer>
  );
}
