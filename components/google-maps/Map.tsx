import { useState, useEffect } from 'react';
import { Loader, LoaderOptions } from "@googlemaps/js-api-loader"

import CustomPopup from './features/overlay-popup'

// styles
import styles from '../../styles/Map.module.scss'

let map: google.maps.Map, popup: google.maps.OverlayView

function Map (props: { config: LoaderOptions; options: google.maps.MapOptions | undefined }) {
  const [loaded, setLoaded] = useState(false)

  function load () {
    new Loader(props.config).load().then((google) => {
      init(google)
      setLoaded(true)
    })
  }

  function init (google: typeof globalThis.google) {
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, props.options)

    map.addListener('click', onClick)
    map.addListener('dragend', onDragend)

    const customPopup = CustomPopup()

    popup = new customPopup(map.getCenter() as google.maps.LatLng,
    document.getElementById('popup') as HTMLElement)

    popup.setMap(map)

    // TODO: move to another method
    const marker = new google.maps.Marker({
      position: { 
        lat: -23.483536016575858, 
        lng: -46.67999684038946 
      },
      icon: '',
      map,
    })

    // TODO: move to another method
    marker.addListener('click', () => {
      const position = marker.getPosition() as google.maps.LatLng
      map.setCenter(position)

      if (popup) {
        popup.setPosition(position)
        popup.show()
      }
    })
  }

  function emit (event: string) {
    props.event(event)
  }

  function onClick (e: { latLng: { toJSON: () => any; }; }) {
    emit('click')

    popup.hide()

    console.log('lat|lng:', e.latLng.toJSON())
  }

  function onDragend () {
    emit('dragend')

    console.log('center:', map.getCenter()?.toJSON())
  }

  useEffect(() => {
    if(!map) {
      load()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, loaded])

  return (
    <div className={styles.map}>
      <div id="map" className={styles.map}></div>
      <div id="popup">
        {props.children}
      </div>
    </div>
  )
}

export default Map