import { LineChart } from '@mui/x-charts/LineChart';
import { useDatasetContext } from 'src/dataset-context';
import { formatToDate } from 'src/utils/time';
import { generateDataKeyFromCountryAndColumn } from './flatten-country-data';
import { useUserFilterContext } from 'src/user-filter';
import { Paper } from '@mui/material';

const stackStrategy = {
  //stack: 'total',
  area: false,
  stackOffset: 'none', // To stack 0 on top of others
} as const;

const customize = {
  // height: 300,
  //legend: { hidden: true },
  margin: { top: 80 },
};

type TimelineChartProps = {
  data: Record<string | number, string | number>[];
};

export default function TimelineChart({ data }: TimelineChartProps) {
  const datasetContext = useDatasetContext();
  const { selectedColumnNames, selectedKeyColumnValues: selectedCountryIsoCodes } = useUserFilterContext();

  return (
    <Paper sx={{ height: 'calc(50%)', width: '100%' }}>
      <LineChart
        xAxis={[
          {
            dataKey: datasetContext.timeColumnName,
            valueFormatter: (value) => formatToDate(new Date(value)),
            //min: 1985,
            //max: 2022,
          },
        ]}
        series={selectedCountryIsoCodes.flatMap((countryIsoCode) =>
          selectedColumnNames.map((selectedColumnName) => {
            const columnKey = generateDataKeyFromCountryAndColumn(countryIsoCode, selectedColumnName);
            return {
              dataKey: columnKey,
              label: columnKey,
              //color: colors[key],
              showMark: false,
              ...stackStrategy,
            };
          }),
        )}
        dataset={data}
        {...customize}
      />
    </Paper>
  );
}
