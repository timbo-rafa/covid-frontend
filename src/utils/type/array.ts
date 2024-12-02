import { DataRow } from 'src/api/api';

export function groupBy<DataType extends Partial<DataRow>>(data: DataType[], column: string) {
  const groupedData: Record<string | number, DataType[]> = {};

  for (const dataRow of data) {
    const value = dataRow[column];
    if (value !== undefined && value !== null) {
      if (!groupedData[value]) {
        groupedData[value] = [];
      }
      groupedData[value].push(dataRow);
    }
  }

  return groupedData;
}

export function selectColumnValueInGroupBy<DataType extends Partial<DataRow>>(
  groupedDataArrays: Record<string | number, DataType[]>,
  column: string,
) {
  const columnValueByKey: Record<string | number, string | number | undefined> = {};

  for (const groupedKey in groupedDataArrays) {
    const dataRows = groupedDataArrays[groupedKey];
    const columnValue = dataRows[0]?.[column] || undefined;
    columnValueByKey[groupedKey] = columnValue;
  }

  return columnValueByKey;
}
