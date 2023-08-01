import { CountryIso3, stringToCountryIso3 } from "../geo";

function validateIsoCountryCode(countryIsoString: string): asserts countryIsoString is CountryIso3 {
  const isoCode = stringToCountryIso3(countryIsoString)

  if (!isoCode) {
    throw Error(`${isoCode} is not an iso 3 in enum`)
  }
}