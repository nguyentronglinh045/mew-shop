import React, { useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%'
}

const center = {
  lat: 10.872016736964001,
  lng: 106.72784942086358
}

const GoogleMapApi: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDAmYTmpk3q7DtVB-Tql4LCiW3ltsn9zQQ' // Replace with your Google Maps API key
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    // This is just an example of getting and using the map instance. Don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15} onLoad={onLoad} onUnmount={onUnmount}>
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}

export default GoogleMapApi
