import { useCountryCovidDataQuery } from "@generated-graphql-hooks";
import React from "react";

export function useCountriesCovidApiQuery() {
  const response = useCountryCovidDataQuery({variables: {countryCovidDataInput: {}}})

  const countries = response.data?.countryCovidData
  
  console.log(`countries api query returned ${countries?.length} countries`)
  return React.useMemo(() => {
    return { countries, loading: response.loading }
  }, [countries, response.loading])
}
