import { DatasetContext } from 'src/dataset-context';
import { TimelineData } from './use-timeline-data.hook';
import { DataDictionaryApiDTO } from 'src/api/use-table-api-query.hook';

export function flattenTimelineData(
  data: DataDictionaryApiDTO,
  selectColumnNames: string[],
  selectedKeyColumnValues: string[],
  datasetContext: DatasetContext,
) {
  const { dataDictionary, mostRecentTimestamp, timestamps } = data;
  const valuesData: TimelineData = { mostRecentTimestamp, data: [], timestamps };
  for (const timestampString of timestamps) {
    const timestamp = Number(timestampString);
    const timeDatapoint: Record<string, string | number | null> = {};
    timeDatapoint[datasetContext.timeColumnName] = timestamp;

    for (const countryIsoCode of selectedKeyColumnValues) {
      const selectedCountrySelectedTimestampData = dataDictionary[timestamp][countryIsoCode] || [];
      const firstRow = selectedCountrySelectedTimestampData[0];

      for (const selectedColumnName of selectColumnNames) {
        const flattenedCountryKey = generateDataKeyFromCountryAndColumn(countryIsoCode, selectedColumnName);
        const columnValue = firstRow?.[selectedColumnName];
        if (typeof columnValue !== 'number') {
          timeDatapoint[flattenedCountryKey] = null;
          continue;
        }
        timeDatapoint[flattenedCountryKey] = columnValue;
      }
    }

    valuesData.data.push(timeDatapoint);
  }

  return valuesData;
}

export function generateDataKeyFromCountryAndColumn(countryIsoCode: string, selectedColumnName: string) {
  return `${countryIsoCode}_${selectedColumnName}`;
}
