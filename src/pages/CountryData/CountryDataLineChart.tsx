import { colorPalette } from '@color-utils';
import { Skeleton, Typography, styled } from '@mui/material';
import queryString from 'query-string';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useCountryCovidTableDataApiQuery } from './use-country-covid-table-data';
import { formatToDate } from '@time-utils';

function useCountryIdsFromQueryString() {
  const location = useLocation();
  return React.useMemo(() => {
    const qs = queryString.parse(location.search, { arrayFormat: 'comma' });

    console.log('qs=' + qs.countryIds);
    if (typeof qs.countryIds === 'string') {
      return [qs.countryIds];
    }
    if (!qs.countryIds) {
      const defaultToCanadaId = ['38'];
      return defaultToCanadaId;
    }
    return qs.countryIds.filter((id): id is string => typeof id === 'string');
  }, [location]);
}
const StyledDiv = styled('div')({
  height: '500px',
});

export function CountryDataLineChart({ selectedFields }: { selectedFields: string[] }) {
  const countryIds = useCountryIdsFromQueryString();
  const { countryCovidTableData, loading } = useCountryCovidTableDataApiQuery({ countryIds: countryIds }, new Set<string>(selectedFields) as any);

  if (loading) {
    return <Skeleton height={500} width={500}></Skeleton>;
  }

  if (!countryCovidTableData) {
    return <span>No data found</span>;
  }
  const colorPaletteValues = Object.values(colorPalette);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom textAlign={'center'}>
        Covid Data
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={countryCovidTableData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="date" angle={270} tickFormatter={date => formatToDate(date)} />
          <YAxis>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
              }}
            ></Label>
          </YAxis>
          (
          {selectedFields.map((field, i) => (
            <Line key={field} dataKey={field} stroke={colorPaletteValues[i]} />
          ))}
          )
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
