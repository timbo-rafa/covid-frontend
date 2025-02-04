import { DatasetContext } from 'src/dataset-context';
import { DataDictionaryApiDTO, DataDictionaryApiInput, DownsamplingMethod, useTableApiQuery } from '../../api/use-table-api-query.hook';

export type WorldDataDictionary = {
  dataDictionary: Record<number, Record<string, number>>;
  mostRecentTimestamp: number | null;
  timestamps: number[];
};

const emptyDataset: WorldDataDictionary = { dataDictionary: {}, mostRecentTimestamp: null, timestamps: [] };

export function useWorldMapData(selectedColumnName: string, datasetContext: DatasetContext) {
  const apiInput: DataDictionaryApiInput = {
    tableName: datasetContext.tableName,
    timeColumnName: datasetContext.timeColumnName,
    dictionaryColumnNames: [datasetContext.timeColumnName, datasetContext.countryColumnName],
    selectColumnNames: [selectedColumnName],
    downsamplingMethod: DownsamplingMethod.LatestMonthly
  };
  const { error, data, isFetching } = useTableApiQuery(apiInput, (data) => pickFirstColumnValue(data, selectedColumnName));
  return { error, data: data || emptyDataset, isFetching };
}

function pickFirstColumnValue(data: DataDictionaryApiDTO, selectColumnName: string) {
  const { dataDictionary, mostRecentTimestamp, timestamps } = data;
  // pick first column value in array, as data is unique per data and country,
  // and so there should only be one
  const valuesData: WorldDataDictionary = { mostRecentTimestamp, timestamps, dataDictionary: {} };
  for (const timestamp in dataDictionary) {
    valuesData.dataDictionary[timestamp] = {};
    for (const countryIso in dataDictionary[timestamp]) {
      const selectedCountrySelectedTimestampData = dataDictionary[timestamp][countryIso];
      const columnFirstValue = selectedCountrySelectedTimestampData[0][selectColumnName];
      if (typeof columnFirstValue === 'number') {
        valuesData.dataDictionary[timestamp][countryIso] = columnFirstValue;
      }
    }
  }

  return valuesData;
}
//curl 'http://localhost:5001/api/v1/tables/covid?dictionaryColumnName=code&selectColumnName=total_cases,date'

// function mapTimeColumnToEpoch<DataType extends Partial<DataDictionary>>(data: DataType, datasetContext: DatasetContext) {
//   for (const key in data) {
//     if (data[key] === undefined) {
//       continue;
//     }

//     const time = data[key][datasetContext.timeColumn];

//     if (time !== undefined) {
//       data[key][datasetContext.timeColumn] = new Date(time).getTime();
//     }
//   }
//   return data;
// }
