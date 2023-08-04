import { CountryCovidCasesDto, CountryDto } from '@generated-graphql-hooks';
import { CountryIso3 } from '@geo-utils';
import { getColorIntensity, noDataColor } from '@color-utils';
import { choroplethLayerId } from './add-choropleth-layer';

export function updateChoroplethColors(map: mapboxgl.Map, countries: CountryDto[], dataColumn: keyof CountryCovidCasesDto) {
  if (countries.length === 0) {
    return;
  }

  const valueByCountry: Record<string, number | undefined | null> = {};

  let minValue = countries[0].covidCases[0]?.[dataColumn] || 0;
  let maxValue = minValue;
  for (const country of countries) {
    const value = country.covidCases[0]?.[dataColumn];
    valueByCountry[country.isoCode] = value;

    if (value > maxValue) {
      maxValue = value;
    }

    if (value < minValue) {
      minValue = value;
    }
  }

  const matchExpression = getMatchExpression(valueByCountry, minValue, maxValue);

  map.setPaintProperty(choroplethLayerId, 'fill-color', matchExpression);
}

function getMatchExpression(
  countryColorMatchExpression: Partial<Record<CountryIso3, number>>,
  minValue: number,
  maxValue: number,
) {
  const matchExpression = ['match', ['get', 'iso_3166_1_alpha_3']];

  for (const countryIsoString in countryColorMatchExpression) {
    const countryIso3 = countryIsoString as CountryIso3;
    const color = getColorIntensity(countryColorMatchExpression[countryIso3], minValue, maxValue);

    matchExpression.push(countryIso3, color);
  }

  matchExpression.push(noDataColor);

  return matchExpression;
}
