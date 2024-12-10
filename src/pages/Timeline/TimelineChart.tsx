import { LineChart } from '@mui/x-charts/LineChart';
import { useDatasetContext } from 'src/dataset-context';
import { formatToDate } from 'src/utils/time';
import { generateDataKeyFromCountryAndColumn } from './flatten-country-data';
import { useSelectionFilterContext } from 'src/user-selection-filter';
import { styled } from '@mui/material';

const stackStrategy = {
  //stack: 'total',
  //area: true,
  stackOffset: 'none', // To stack 0 on top of others
} as const;

const customize = {
  // height: 300,
  //legend: { hidden: true },
  margin: { top: 5 },
};

type TimelineChartProps = {
  data: Record<string | number, string | number>[];
};

const FullHeightDiv = styled('div')({
  height: 'calc(100% - 64px)',
});

export default function TimelineChart({ data }: TimelineChartProps) {
  const datasetContext = useDatasetContext();
  const userSelectionFilter = useSelectionFilterContext();

  return (
    <FullHeightDiv>
      <LineChart
        xAxis={[
          {
            dataKey: datasetContext.timeColumnName,
            valueFormatter: (value) => formatToDate(new Date(value)),
            //min: 1985,
            //max: 2022,
          },
        ]}
        series={userSelectionFilter.selectedCountryIsoCodes.flatMap((countryIsoCode) =>
          userSelectionFilter.selectedColumnNames.map((selectedColumnName) => {
            const columnKey = generateDataKeyFromCountryAndColumn(countryIsoCode, selectedColumnName);
            return {
              dataKey: columnKey,
              label: columnKey,
              //color: colors[key],
              showMark: false,
              ...stackStrategy,
              area: true,
              stackOffset: 'none',
            };
          }),
        )}
        dataset={data}
        {...customize}
      />
    </FullHeightDiv>
  );
}
