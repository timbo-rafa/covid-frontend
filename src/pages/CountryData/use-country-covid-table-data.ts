import { CountryCovidDataInput, CountryDto, useCountryCovidTableDataQuery } from '@generated-graphql-hooks';
import { CountryIso3 } from '@geo-utils';
import React from 'react';
import { AvailableCountryCovidTableFields } from './available-table-fields';

export type CovidDataByCountryIsoDictionary = Record<CountryIso3, CountryDto>;

export function useCountryCovidTableDataApiQuery(countryCovidDataInput: CountryCovidDataInput, selectedFields: Set<AvailableCountryCovidTableFields>) {
  const response = useCountryCovidTableDataQuery({
    variables: { countryCovidDataInput, ...selectFieldsToInclude(selectedFields)},
    skip: selectedFields.size === 0
  });

  console.log('🚀 | useCountryCovidTableDataApiQuery | error then data:', response.error, response.data?.countryCovidTableData);
  const countryCovidTableData = response.data?.countryCovidTableData;

  return React.useMemo(() => {
    return { countryCovidTableData, loading: response.loading };
  }, [countryCovidTableData, response.loading]);
}

function selectFieldsToInclude(selectedFields: Set<AvailableCountryCovidTableFields>) {
  return {
    shouldIncludeHospPatients: selectedFields.has('hospPatients') || false
    , shouldIncludeIcuPatients: selectedFields.has('icuPatients') || false
    , shouldIncludeNewCases: selectedFields.has('newCases') || false
    , shouldIncludeNewDeaths: selectedFields.has('newDeaths') || false
    , shouldIncludeNewTests: selectedFields.has('newTests') || false
    , shouldIncludeNewVaccinations: selectedFields.has('newVaccinations') || false
    , shouldIncludePeopleFullyVaccinated: selectedFields.has('peopleFullyVaccinated') || false
    , shouldIncludePeopleVaccinated: selectedFields.has('peopleVaccinated') || false
    , shouldIncludePositiveRate: selectedFields.has('positiveRate') || false
    , shouldIncludeTestsPerCase: selectedFields.has('testsPerCase') || false
    , shouldIncludeTotalBoosters: selectedFields.has('totalBoosters') || false
    , shouldIncludeTotalCases: selectedFields.has('totalCases') || false
    , shouldIncludeTotalDeaths: selectedFields.has('totalDeaths') || false
    , shouldIncludeTotalTests: selectedFields.has('totalTests') || false
    , shouldIncludeTotalVaccinations: selectedFields.has('totalVaccinations') || false
    , shouldIncludeWeeklyHospAdmissions: selectedFields.has('weeklyHospAdmissions') || false
    , shouldIncludeWeeklyIcuAdmissions: selectedFields.has('weeklyIcuAdmissions') || false
  }
}