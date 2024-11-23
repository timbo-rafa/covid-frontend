import { Container, Grid, Paper, Skeleton } from '@mui/material';
import { CountryDataLineChart } from './CountryDataLineChart';
import { CountryDataTable } from './CountryDataTable';
import { AvailableCountryCovidTableFields } from './available-table-fields';
import { useCountryIdsFromQueryString } from './use-country-ids-query-string';


export function CountryDataPage() {
  const countryIds = useCountryIdsFromQueryString();
  const selectedFields = new Set<AvailableCountryCovidTableFields>(['totalCases', 'totalDeaths', 'totalTests', 'totalBoosters', 'totalVaccinations'])
  const { countryCovidTableData, loading } = {} as any;//useCountryCovidTableApiQuery({ countryIds: countryIds }, selectedFields);

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
              height: 700,
            }}
          >
            <CountryDataLineChart
              countryCovidTableData={countryCovidTableData}
              selectedFields={selectedFields}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'column',

            }}
          >
            <CountryDataTable
              selectedFields={selectedFields}
              countryCovidTableData={countryCovidTableData}
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
