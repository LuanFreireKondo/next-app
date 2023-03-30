
import { useState } from 'react'

// google maps
import { CONFIG, DEFAULT_OPTIONS } from '../../config/google-maps'

// components
import Map from '../../components/google-maps/Map'
import MapPopup from '../../components/google-maps/MapPopup'
import Layout from '../../components/Layout'

export default function Maps() {
  const [event, setEvent] = useState<String>('')

  function handleEvent (e: string) {
    setEvent(e)
  }

  return (
    <Layout>
      <p>Event: {event}</p>

      <br/>

      <Map config={CONFIG} options={DEFAULT_OPTIONS} event={handleEvent}>
        <MapPopup />
      </Map>
    </Layout>
  )
}