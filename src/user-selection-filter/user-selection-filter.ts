import { createContext, useContext } from 'react';

export type DatasetContext = {
  selectedColumnNames: string[];
  selectedCountryIsoCodes: string[];
};

export const defaultUserSelectionFilter = {
  selectedColumnNames: ['total_cases', 'total_deaths', 'total_vaccinations'],
  selectedCountryIsoCodes: ['BRA', 'CAN', 'USA'],
};

const userSelectionFilter = createContext(defaultUserSelectionFilter);

export function useSelectionFilterContext() {
  return useContext(userSelectionFilter);
}
