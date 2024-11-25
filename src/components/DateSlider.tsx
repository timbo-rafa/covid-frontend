import { Slider, SliderOwnProps } from "@mui/material";
import React from "react";
type DateSliderProps = {
  dates: Date[],
  onChange: SliderOwnProps['onChange'],
  value: Date | undefined
}

export const DateSlider = React.memo(({dates, onChange, value}: DateSliderProps) => {

  const marks  = dates.map(date => ({
    value: date.getTime(),
    label: date.toLocaleDateString()
  }))

  return <Slider
  marks={marks}
  aria-label="Current date"
  valueLabelFormat={value => new Date(value).getTime()}
  getAriaValueText={value => new Date(value).toLocaleDateString()}
  valueLabelDisplay="auto"
  onChange={onChange}
  value={value?.getTime()}
  />
});