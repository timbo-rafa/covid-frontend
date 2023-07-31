import { CountryIso3, stringIsCountryIso3 } from "../geo";
import { assertIsNumber } from "./assert-is-number";

export function arrayToDictionary<CovidDataType, CountryDataType extends { isoCode: string, covidData: CovidDataType[] }>(countryData: CountryDataType[], dataColumn: keyof CovidDataType) {
  console.log(`array to dictionary: dataColumn=${String(dataColumn)}, value=${countryData[0].covidData[0][dataColumn]}`)
  console.log(`${typeof countryData} JSON=${JSON.stringify(countryData)}`)
  let maxValue = countryData[0].covidData[0][dataColumn] as number;
  assertIsNumber(maxValue);

  const valueByCountry: Partial<Record<CountryIso3, number>> = {}

  for (const countryRow of countryData) { // this should
    validateIsoCountryCode(countryRow.isoCode)
    // assuming its sorted most-recent first, getting most up to date value
    const currentValue = countryRow.covidData[0][dataColumn] as number
    if (currentValue > maxValue) {
      maxValue = currentValue
    }

    valueByCountry[countryRow.isoCode] = currentValue
  }

  return { valueByCountry, maxValue }
}

function validateIsoCountryCode(countryIsoString: string): asserts countryIsoString is CountryIso3 {
  const isoCode = stringIsCountryIso3(countryIsoString)

  if (!isoCode) {
    throw Error(`${isoCode} is not an iso 3 in enum`)
  }
}