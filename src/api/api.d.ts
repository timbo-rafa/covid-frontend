export type DataColumn = string | number;
export type DataRow = Record<string, DataColumn>
export type DataDictionary = Record<DataColumn, DataRow>; 

export type DatasetConfig = {
  tableName: string;
  timeColumn: string;
  countryColumn: string;
}