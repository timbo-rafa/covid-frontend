import { DatasetConfig } from 'src/api/api';
import { useWorldMapData } from './use-world-map-data.hook';
import { renderHook } from '@testing-library/react';

type DataType = {
  code: string;
  date: number;
  total_cases: number;
};

const sampleData: DataType[] = [
  { code: 'USA', date: new Date('2024-01-01').getTime(), total_cases: 1000 },
  { code: 'CAN', date: new Date('2024-01-01').getTime(), total_cases: 500 },
  { code: 'MEX', date: new Date('2024-01-02').getTime(), total_cases: 200 },
  { code: 'USA', date: new Date('2024-01-02').getTime(), total_cases: 1111 },
];

const datasetConfig: DatasetConfig = {
  tableName: 'covid',
  timeColumn: 'date',
  countryColumn: 'code',
};

describe('useWorldMapData', () => {
  test('should handle empty data', () => {
    const { result } = renderHook(() => useWorldMapData([], 'total_cases', new Date('2024-01-01'), datasetConfig));
    const { columnValueByCountry, dates } = result.current;

    expect(columnValueByCountry).toEqual({});
    expect(dates).toEqual([]);
  });

  test('should handle data', () => {
    const { result } = renderHook(() => useWorldMapData(sampleData, 'total_cases', new Date('2024-01-01'), datasetConfig));
    const { columnValueByCountry, dates } = result.current;
    expect(columnValueByCountry).toEqual({
      USA: 1000,
      CAN: 500,
    });
    expect(dates).toEqual([new Date('2024-01-01'), new Date('2024-01-02')]);
  });

  test('should handle invalid column name', () => {
    const { result } = renderHook(() => useWorldMapData(sampleData, 'invalid_column', new Date('2024-01-01'), datasetConfig));
    const { columnValueByCountry, dates } = result.current;
    expect(columnValueByCountry).toEqual({
      USA: undefined,
      CAN: undefined,
    });
    expect(dates).toEqual([new Date('2024-01-01'), new Date('2024-01-02')])
    // Add more assertions based on the expected result
  });
});
