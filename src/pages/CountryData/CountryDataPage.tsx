import { Container, Grid, Paper, Skeleton, styled } from '@mui/material';
import queryString from 'query-string';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Label, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useCountryCovidTableDataApiQuery } from './use-country-covid-table-data';
import { Title } from '@mui/icons-material';
import { CountryDataLineChart } from './CountryDataLineChart';
import { CountryDataTable } from './CountryDataTable';
import { AvailableCountryCovidTableFields } from './available-table-fields';

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

export function CountryDataPage() {
  const countryIds = useCountryIdsFromQueryString();
  const selectedFields = new Set<AvailableCountryCovidTableFields>(['newCases', 'totalDeaths'])
  const { countryCovidTableData, loading } = useCountryCovidTableDataApiQuery({ countryIds: countryIds }, selectedFields);

  if (loading) {
    return <Skeleton height={500} width={500}></Skeleton>;
  }

  if (!countryCovidTableData) {
    return <span>No data found</span>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              height: 500,
            }}
          >
            <CountryDataLineChart
              selectedFields={['totalCases', 'totalDeaths', 'totalTests', 'totalBoosters', 'totalVaccinations']}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              height: 500,
            }}
          >
            <CountryDataLineChart
              selectedFields={[
                'newCases',
                'newDeaths',
                'hospPatients',
                'icuPatients',
                'weeklyHospAdmissions',
                'weeklyIcuAdmissions',
                'newTests',
                'positiveRate',
                'testsPerCase',
                'newVaccinations',
                'peopleFullyVaccinated',
                'peopleVaccinated',
              ]}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              height: 500,
            }}
          >
            <CountryDataTable
              // selectedFields={[
              //   'newCases',
              //   'newDeaths',
              //   'hospPatients',
              //   'icuPatients',
              //   'weeklyHospAdmissions',
              //   'weeklyIcuAdmissions',
              //   'newTests',
              //   'positiveRate',
              //   'testsPerCase',
              //   'newVaccinations',
              //   'peopleFullyVaccinated',
              //   'peopleVaccinated',
              // ]}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
