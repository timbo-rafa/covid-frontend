import queryString from "query-string";
import React from "react";
import { useLocation } from "react-router-dom";

export function useCountryIdsFromQueryString() {
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