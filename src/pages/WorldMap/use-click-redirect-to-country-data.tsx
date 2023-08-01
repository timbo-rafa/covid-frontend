import { stringToCountryIso3 } from "@geo-utils"
import mapboxgl from "mapbox-gl"
import React from "react"
import { hoverLayerId } from "./add-hover-layer"

export function useClickRedirectToCountryData(
  mapRef: React.MutableRefObject<mapboxgl.Map | null>,
) {
  if (!mapRef.current) {
    return
  }
  const map = mapRef.current;

  map.on('dblclick', (e) => {

    const features = map.queryRenderedFeatures(e.point, { layers: [hoverLayerId] })
    if (features.length) {
      const countryIso3 = features[0].properties?.iso_3166_1_alpha_3

      console.log('dblclick' + features.length + countryIso3)
      const validatedCountryIso3 = stringToCountryIso3(countryIso3)
      if (validatedCountryIso3) {

      } else {
        console.warn(`country iso 3 ${countryIso3} not recognized`)
      }
    }
  })
}