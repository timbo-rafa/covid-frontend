import { CountryCovidDataInput, CountryDto, useCountryCovidTableDataQuery } from '@generated-graphql-hooks';
import { CountryIso3 } from '@geo-utils';
import React from 'react';
import { AvailableCountryCovidTableFields } from './available-table-fields';

export type CovidDataByCountryIsoDictionary = Record<CountryIso3, CountryDto>;

export type CountryCovidTableRow = {
  date: any;
  id: string;
  isoCode: string;
  name: string;
  hospPatients?: number | null;
  icuPatients?: number | null;
  newCases?: number | null;
  newDeaths?:number | null;
  newTests?: number | null;
  newVaccinations?: number | null;
  peopleFullyVaccinated?: string | null;
  peopleVaccinated?: string | null;
  positiveRate?: number | null;
  testsPerCase?: number | null;
  totalBoosters?: string | null;
  totalCases?: string | null;
  totalDeaths?: string | null;
  totalTests?: string | null;
  totalVaccinations?: string | null;
  weeklyHospAdmissions?: number | null;
  weeklyIcuAdmissions?: number | null;
};
export function useCountryCovidTableApiQuery(countryCovidDataInput: CountryCovidDataInput, selectedFields: Set<AvailableCountryCovidTableFields>) {
  const response = useCountryCovidTableDataQuery({
    variables: { countryCovidDataInput, ...selectFieldsToInclude(selectedFields),
    },
    skip: selectedFields.size === 0
  });

  const amountOfDates: Record<number, number> = {}
  response.data?.countryCovidTableData.forEach(({ isoCode, date, newCases, totalDeaths }) => {
    const ts = new Date(date).getTime()
    amountOfDates[ts] = amountOfDates[ts] || 0
    amountOfDates[ts]++;
  })

  console.log(`countryCovidTableData error,data`, response.error,response.data?.countryCovidTableData)
  const countryCovidTableData: CountryCovidTableRow[] | undefined = response.data?.countryCovidTableData;

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