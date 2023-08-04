export const noDataColor = 'rgb(100, 100, 100)';

export function getColorIntensity(dataValue: number | undefined, minValue: number, maxValue: number) {
  const value = dataValue || minValue;
  const intensity = (value - minValue) / maxValue;
  const redIntensity = Math.min(intensity * 255, 50);
  const color = `rgba(255, ${255 - redIntensity}, ${255 - redIntensity}, 0.8)`;
  return color;
}
