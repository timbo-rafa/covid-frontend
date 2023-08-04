import { CountryCovidDataInput, CountryDto, useCountryCovidTableDataQuery } from '@generated-graphql-hooks';
import { CountryIso3 } from '@geo-utils';
import React from 'react';

export type CovidDataByCountryIsoDictionary = Record<CountryIso3, CountryDto>;

export function useCountryCovidTableDataApiQuery(countryCovidDataInput: CountryCovidDataInput) {
  const response = useCountryCovidTableDataQuery({
    variables: { countryCovidDataInput },
  });

  console.log('🚀 | useCountryCovidTableDataApiQuery | error then data:', response.error, response.data?.countryCovidTableData);
  const countryCovidTableData = response.data?.countryCovidTableData;

  return React.useMemo(() => {
    return { countryCovidTableData, loading: response.loading };
  }, [countryCovidTableData, response.loading]);
}
