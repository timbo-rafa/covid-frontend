import { CountriesEnum } from "./countries.enum";

export type CountryIso3 = keyof typeof CountriesEnum

const countriesIso3Set = new Set(Object.keys(CountriesEnum))

export function stringToCountryIso3(string: string): CountryIso3 | null {
  if (countriesIso3Set.has(string)) {
    return string as CountryIso3
  }

  return null;
}