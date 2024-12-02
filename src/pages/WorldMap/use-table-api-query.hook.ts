import { DatasetConfig } from 'src/api/api';
import { DefaultError, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type DataDictionaryApiDTO = {
  dataDictionary: Record<number, Record<string, Record<string, string | number>[]>>;
  mostRecentTimestamp: number | null;
  timestamps: number[];
};
export type DataDictionary = {
  dataDictionary: Record<number, Record<string, number>>;
  mostRecentTimestamp: number | null;
  timestamps: number[];
};

const emptyDataset: DataDictionary = { dataDictionary: {}, mostRecentTimestamp: null, timestamps: [] };

export function useTableApiQuery(selectedColumnName: string, datasetConfig: DatasetConfig) {
  const url =
    `${process.env.REACT_APP_API_HOST}/tables/${datasetConfig.tableName}?` +
    `timeColumnName=${datasetConfig.timeColumn}&` +
    `dictionaryColumnNames=${datasetConfig.timeColumn},${datasetConfig.countryColumn}&` +
    `selectColumnNames=${selectedColumnName}`;

  const { error, data, isFetching } = useQuery<DataDictionaryApiDTO, DefaultError, DataDictionary>({
    queryKey: ['table-grouped-by-column'],
    queryHash: url,
    queryFn: async () => {
      const tableData = await axios.get<Omit<DataDictionaryApiDTO, 'timestamps'>>(url);

      console.log('🚀 | API :', tableData);
      return {
        ...tableData.data,
        timestamps: Object.keys(tableData.data.dataDictionary).map(Number),
      };
    },
    select: (data) => pickFirstColumnValue(data, selectedColumnName),
  });

  return { error, data: data || emptyDataset, isFetching };
}

function pickFirstColumnValue(data: DataDictionaryApiDTO, selectColumnName: string) {
  const { dataDictionary, mostRecentTimestamp, timestamps } = data;
  // pick first column value in array, as data is unique per data and country,
  // and so there should only be one
  const valuesData: DataDictionary = { mostRecentTimestamp, timestamps, dataDictionary: {} };
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

// function mapTimeColumnToEpoch<DataType extends Partial<DataDictionary>>(data: DataType, datasetConfig: DatasetConfig) {
//   for (const key in data) {
//     if (data[key] === undefined) {
//       continue;
//     }

//     const time = data[key][datasetConfig.timeColumn];

//     if (time !== undefined) {
//       data[key][datasetConfig.timeColumn] = new Date(time).getTime();
//     }
//   }
//   return data;
// }
