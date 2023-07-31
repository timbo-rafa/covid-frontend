import { useCanadaCovidDataQuery } from "@generated-graphql-hooks";
import React from "react";

export function useCountriesCovidDataQuery() {
  const response = useCanadaCovidDataQuery({})

  const countries = response.data?.covidData
  
  return React.useMemo(() => {
    return { countries, loading: response.loading }
  }, [response.data?.covidData, response.loading])
}
