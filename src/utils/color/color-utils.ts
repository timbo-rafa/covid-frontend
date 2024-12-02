export const noDataColor = 'rgb(100, 100, 100)';

export function getColorIntensity(dataValue: number | null | undefined, minValue: number, maxValue: number) {
  const value = dataValue || minValue;
  const redIntensity = Math.ceil(((value - minValue) / maxValue) * 255);
  const color = `rgba(255, ${255 - redIntensity}, ${255 - redIntensity}, 0.8)`;
  return color;
}
