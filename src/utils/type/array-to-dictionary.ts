import { CountryIso3, stringIsCountryIso3 } from "../geo";

function validateIsoCountryCode(countryIsoString: string): asserts countryIsoString is CountryIso3 {
  const isoCode = stringIsCountryIso3(countryIsoString)

  if (!isoCode) {
    throw Error(`${isoCode} is not an iso 3 in enum`)
  }
}