import { colorPalette } from 'src/utils/color';
import { Skeleton, Typography, styled } from '@mui/material';
import queryString from 'query-string';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatToDate } from 'src/utils/time';
import { AvailableCountryCovidTableFields } from './available-table-fields';

type CountryCovidTableDto = any;

export type CountryDataLineChartProps = {
  selectedFields: Set<AvailableCountryCovidTableFields>;
  countryCovidTableData: CountryCovidTableDto[];
}

export function CountryDataLineChart({ selectedFields, countryCovidTableData }: CountryDataLineChartProps) {

  // if (loading) {
  //   return <Skeleton height={500} width={500}></Skeleton>;
  // }

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
            left: 16,
          }}
        >
          <XAxis dataKey="date" tickFormatter={date => formatToDate(date)}/>
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
          {Array.from(selectedFields).map((field, i) => (
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
