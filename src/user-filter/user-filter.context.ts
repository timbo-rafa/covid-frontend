import React, { createContext } from 'react';

export type DatasetContext = {
  selectedColumnNames: string[];
  selectedCountryIsoCodes: string[];
};

export const userFilterDefaults = {
  selectedColumnNames: ['total_cases', 'total_deaths', 'total_vaccinations'],
  setSelectedColumnNames: (_: string[]) => {},
  selectedKeyColumnValues: ['CHN', 'USA'],
  setSelectedKeyColumnValues: (_: string[]) => {},
};

export const UserFilterContext = createContext(userFilterDefaults);

export function useUserFilterContext() {
  return React.useContext(UserFilterContext)
}