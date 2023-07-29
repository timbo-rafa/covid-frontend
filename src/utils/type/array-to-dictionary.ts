import { CountryIso3, stringIsCountryIso3 } from "../geo";
import { assertIsNumber } from "./assert-is-number";

export function arrayToDictionary<DataType extends { countryIsoCode: CountryIso3 }>(data: DataType[], dataColumn: keyof DataType) {
  let maxValue = data[0][dataColumn] as number;
  assertIsNumber(maxValue);

  const valueByCountry: Partial<Record<CountryIso3, number>> = {}
  for (const row of data) {
    validateIsoCountryCode(row.countryIsoCode)
    const currentValue = row[dataColumn] as number
    if (currentValue > maxValue) {
      maxValue = currentValue
    }

    valueByCountry[row.countryIsoCode] = currentValue
  }

  return { valueByCountry, maxValue }
}

function validateIsoCountryCode(countryIsoString: string): asserts countryIsoString is CountryIso3 {
  const isoCode = stringIsCountryIso3(countryIsoString)

  if (!isoCode) {
    throw Error(`${isoCode} is not an iso 3 in enum`)
  }
}