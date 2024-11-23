import { CountryIso3 } from '@geo-utils';
import { getColorIntensity, noDataColor } from '@color-utils';
import { choroplethLayerId } from './add-choropleth-layer';

export function updateChoroplethColors<DataType extends Record<string, string | number>>(
  map: mapboxgl.Map,
  data: DataType[],
  selectedColumnName: keyof DataType,
  countryIsoCodeColumn = 'code',
) {
  if (data.length === 0) {
    return;
  }

  const columnFirstValue = Number(data[0][selectedColumnName] || 0);

  if (Number.isNaN(columnFirstValue)) {
    console.error('Selected column is not a number, skipping map coloring');
    return;
  }

  const valueByCountry: Record<string, number | undefined | null> = {};

  let minValue = columnFirstValue;
  let maxValue = minValue;
  for (const dataRow of data) {
    const value = Number(dataRow[selectedColumnName]);
    valueByCountry[dataRow[countryIsoCodeColumn]] = value;

    if (value > maxValue) {
      maxValue = value;
    }

    if (value < minValue) {
      minValue = value;
    }
  }
  console.log(JSON.stringify({ maxValue, minValue, selectedColumnName, valueByCountry }));

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
