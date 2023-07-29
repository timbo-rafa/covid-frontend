import { CountryIso3 } from "@geo-utils";
import { arrayToDictionary } from "../../utils/type";
import { CovidDataType } from "./covid-data.models";
import { sourceLayerName } from "./use-mapbox-choropleth-map";

export function updateChoroplethColors(map: mapboxgl.Map, data: CovidDataType[], dataColumn: keyof CovidDataType) {

  if (data.length === 0) {
    return
  }

  const { valueByCountry, maxValue } = arrayToDictionary(data, dataColumn)

  const matchExpression = getMatchExpression(valueByCountry, maxValue)

  map.setPaintProperty(sourceLayerName, 'fill-color', matchExpression)
}

function getMatchExpression(countryColorMatchExpression: Partial<Record<CountryIso3, number>>, maxValue: number) {
  const matchExpression = ['match', ['get', 'iso_3166_1_alpha_3']];
  const defaultNoValueMatchExpression = 'rgba(0, 0, 0, 0)'

  for (const countryIsoString in countryColorMatchExpression) {
    const countryIso3 = countryIsoString as CountryIso3
    const color = getColorIntensity(countryColorMatchExpression[countryIso3], maxValue);

    matchExpression.push(countryIso3, color);
  }

  matchExpression.push(defaultNoValueMatchExpression);

  return matchExpression
}

function getColorIntensity(dataValue: number | undefined, maxValue: number) {
  const value = dataValue || 0
  const intensity = value / maxValue;
  const red = intensity * 255;
  const color = `rgb(${red}, 0, 0)`;
  return color;
}