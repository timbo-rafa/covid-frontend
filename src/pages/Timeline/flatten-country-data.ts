import { DatasetContext } from 'src/dataset-context';
import { TimelineData } from './use-timeline-data.hook';
import { DataDictionaryApiDTO } from 'src/api/use-table-api-query.hook';

export function flattenCountryData(data: DataDictionaryApiDTO, selectColumnNames: string[], datasetContext: DatasetContext) {
  const { dataDictionary, mostRecentTimestamp } = data;
  const valuesData: Omit<TimelineData, 'timestamps'> = { mostRecentTimestamp, data: [] };
  for (const timestampString in dataDictionary) {
    const timestamp = Number(timestampString);
    const timeDatapoint: Record<string, string | number> = {};
    timeDatapoint[datasetContext.timeColumnName] = timestamp;

    for (const countryIsoCode in dataDictionary[timestampString]) {
      const selectedCountrySelectedTimestampData = dataDictionary[timestamp][countryIsoCode];
      const firstRow = selectedCountrySelectedTimestampData[0];

      for (const selectedColumnName of selectColumnNames) {
        const columnValue = firstRow[selectedColumnName];
        if (typeof columnValue === 'string' || typeof columnValue === 'number') {
          const flattenedCountryKey = generateDataKeyFromCountryAndColumn(countryIsoCode, selectedColumnName);
          timeDatapoint[flattenedCountryKey] = columnValue;
        }
      }
    }

    valuesData.data.push(timeDatapoint);
  }

  return valuesData;
}

export function generateDataKeyFromCountryAndColumn(countryIsoCode: string, selectedColumnName: string) {
  return `${countryIsoCode}_${selectedColumnName}`;
}
