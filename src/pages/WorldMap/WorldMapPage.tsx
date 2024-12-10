import { Box, Slider, styled } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { WorldMap } from './WorldMap';
import { useDatasetContext } from 'src/dataset-context';
import { useWorldMapData } from './use-world-map-data.hook';

const MapContainer = styled('div')({
  height: 'calc(100% - 64px)',
  display: 'grid',
});

const MapControlBox = styled(Box)({
  backgroundColor: 'rgba(255,0,0,0.5)',
  gridRowStart: 10,
  gridRowEnd: 10,
  gridColumnStart: 3,
  gridColumnEnd: 7,
});

export function WorldMapPage() {
  const { selectedColumnName = 'total_cases' } = useParams();
  const datasetContext = useDatasetContext();

  const { data, error, isFetching } = useWorldMapData(selectedColumnName, datasetContext);
  const [selectedTimeIndex, setSelectedTimeIndex] = React.useState(0);

  const handleTimeChange = React.useCallback<(event: Event, value: number | number[]) => void>(
    (_event, selectedTimeIndex) => {
      if (Array.isArray(selectedTimeIndex)) {
        console.warn(JSON.stringify({ msg: 'invalid slider array value', value: selectedTimeIndex }));
        return;
      }

      setSelectedTimeIndex(selectedTimeIndex);
      console.log('🚀 | WorldMapPage | setSelectedTimeIndex');
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
