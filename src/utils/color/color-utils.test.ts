import { getColorIntensity } from "./color-utils"

describe('red color intensity', () => {
  const maxValue = 500000
  const minValue = 1000
  it('should return strong red for max value', () => {

    const rgbString = getColorIntensity(maxValue, minValue, maxValue)

    expect(rgbString).toEqual(`rgba(255, 0, 0, 0.8)`)
  })

  it('should return weak red for min value', () => {

    const rgbString = getColorIntensity(minValue, minValue, maxValue)

    expect(rgbString).toEqual(`rgba(255, 255, 255, 0.8)`)
  })
})