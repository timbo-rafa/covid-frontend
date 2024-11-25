import { getColorIntensity, noDataColor } from 'src/utils/color';
import { choroplethLayerId } from './add-choropleth-layer';
import { isDefined } from 'src/utils/type';

export function updateChoroplethColors(map: mapboxgl.Map, columnValueByCountry: Record<string, number | undefined>) {
  const matchExpression = getMatchExpression(columnValueByCountry);

  map.setPaintProperty(choroplethLayerId, 'fill-color', matchExpression);
}

function getMatchExpression(columnValueByCountry: Record<string, number | undefined>) {
  const matchExpression = ['match', ['get', 'iso_3166_1_alpha_3']];

  const columnValues = Object.values(columnValueByCountry).filter(isDefined);
  const minValue = Math.min(...columnValues);
  const maxValue = Math.max(...columnValues);

  for (const countryIsoString in columnValueByCountry) {
    const countryIso3 = countryIsoString;
    const color = getColorIntensity(columnValueByCountry[countryIso3], minValue, maxValue);

    matchExpression.push(countryIso3, color);
  }

  matchExpression.push(noDataColor);

  return matchExpression;
}
