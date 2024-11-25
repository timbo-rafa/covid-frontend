export type DataRowBaseType = string | number;
export type DatasetApiBaseType = Record<string, DataRowBaseType>

export type DatasetConfig = {
  tableName: string;
  timeColumn: string;
  countryColumn: string;
}