import { getColorIntensity, noDataColor } from 'src/utils/color';
import { choroplethLayerId } from './add-choropleth-layer';

export function updateChoroplethColors(map: mapboxgl.Map, columnValueByCountry: Record<string, number>) {
  const matchExpression = getMatchExpression(columnValueByCountry);

  map.setPaintProperty(choroplethLayerId, 'fill-color', matchExpression);
}

function getMatchExpression(columnValueByCountry: Record<string, number>) {
  const matchExpression = ['match', ['get', 'iso_3166_1_alpha_3']];

  const columnValues = Object.values(columnValueByCountry)
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
