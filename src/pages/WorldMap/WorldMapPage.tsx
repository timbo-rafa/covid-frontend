import { Box, Slider, styled } from '@mui/material';
import React from 'react';
import { useTableApiQuery } from './use-table-api-query.hook';
import { useParams } from 'react-router-dom';
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
  gridColumnEnd: 10,
});

const datasetConfig: DatasetConfig = {
  tableName: 'covid',
  timeColumn: 'date',
  countryColumn: 'code',
};

export function WorldMapPage() {
  const { selectedColumnName = 'total_cases' } = useParams();

  const { data, error, isFetching } = useTableApiQuery(selectedColumnName, datasetConfig);
  const [selectedTimeIndex, setSelectedTimeIndex] = React.useState(0);

  const handleTimeChange = React.useCallback<(event: Event, value: number | number[]) => void>(
    (_event, selectedTimeIndex) => {
      if (Array.isArray(selectedTimeIndex)) {
        console.warn(JSON.stringify({ msg: 'invalid slider array value', value: selectedTimeIndex }));
        return;
      }

      setSelectedTimeIndex(selectedTimeIndex);
    },
    [setSelectedTimeIndex],
  );

  const columnValueByCountry = React.useMemo(() => {
    const selectedTimestamp = data.timestamps[selectedTimeIndex];
    const dataRowsByCountry = data.dataDictionary[selectedTimestamp] || {};

    console.log('🚀🚀 | columnValueByCountry | selectedTimestamp:', selectedTimestamp);
    return dataRowsByCountry;
  }, [data.timestamps, data.dataDictionary, selectedTimeIndex]);

  return (
    <MapContainer className="map-container">
      <WorldMap columnValueByCountry={columnValueByCountry} />
      <MapControlBox>
        <Slider
          min={0}
          max={data.timestamps.length - 1}
          valueLabelDisplay={'auto'}
          step={1}
          shiftStep={1}
          onChange={handleTimeChange}
          value={selectedTimeIndex}
        />
      </MapControlBox>
    </MapContainer>
  );
}
