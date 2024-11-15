import { CountryCovidDataInput, CountryDto, useCountryCovidDataQuery } from '@generated-graphql-hooks';
import { CountryIso3, stringToCountryIso3 } from '@geo-utils';
import React from 'react';

export type CovidDataByCountryIsoDictionary = Record<CountryIso3, CountryDto>;

export function useCountriesCovidApiQuery(countryCovidDataInput: CountryCovidDataInput) {
  const response = useCountryCovidDataQuery({
    variables: { countryCovidDataInput },
  });

  const countries = response.data?.countryCovidData;

  console.log(`countries api query returned. Error=${response.error}`, countries);
  return React.useMemo(() => {
    const covidDataByCountryIso: Partial<CovidDataByCountryIsoDictionary> = {};

    if (countries) {
      for (const country of countries) {
        const validatedIsoCode = stringToCountryIso3(country.isoCode);

        if (!validatedIsoCode) {
          console.warn(`country ${country.isoCode} ${country.name} from api not in FE country iso enum`);
        } else {
          covidDataByCountryIso[validatedIsoCode] = country;
        }
      }
    }
    return {
      countries,
      loading: response.loading,
      covidDataByCountryIso: covidDataByCountryIso as CovidDataByCountryIsoDictionary,
    };
  }, [countries, response.loading]);
}
