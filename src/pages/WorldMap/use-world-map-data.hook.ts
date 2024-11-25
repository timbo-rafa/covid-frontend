import { groupBy, isDictionaryOfNumbers, selectColumnValueInGroupBy } from 'src/utils/type';
import React from 'react';
import { DatasetApiBaseType, DatasetConfig } from 'src/api/api';

export function useWorldMapData<DataType extends Partial<DatasetApiBaseType>>(
  data: DataType[],
  selectedColumnName: string,
  selectedTime: Date | undefined,
  datasetConfig: DatasetConfig,
) {
  return React.useMemo(() => {
    const dataByTime = groupBy(data, datasetConfig.timeColumn);

    const dates = Object.keys(dataByTime)
      .map((millisecondsSinceEpochStr) => Number(millisecondsSinceEpochStr))
      .sort()
      .map(millisecondsSinceEpoch => new Date(millisecondsSinceEpoch))

    const mostRecentData = dates.length ? dataByTime[dates[dates.length - 1].getTime()] : null;
    const selectedTimeData = selectedTime ? dataByTime[selectedTime.getTime()] : mostRecentData;

    const dataByCountry = groupBy(selectedTimeData || [], datasetConfig.countryColumn);
    const columnValueByCountry = selectColumnValueInGroupBy(dataByCountry, selectedColumnName)

    if (isDictionaryOfNumbers(columnValueByCountry)) {
      return { columnValueByCountry, dates };
    }
    
    console.error('Selected data for countries is not of type number')
    return {columnValueByCountry: {}, dates}

  }, [data, selectedColumnName, selectedTime, datasetConfig.countryColumn, datasetConfig.timeColumn]);
}
