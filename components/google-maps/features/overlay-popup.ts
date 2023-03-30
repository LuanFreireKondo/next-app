const CustomPopup = () => {
  return class Popup extends google.maps.OverlayView {
    position: google.maps.LatLng;
    containerDiv: HTMLDivElement;

    constructor(position: google.maps.LatLng, content: HTMLElement) {
      super()
      this.position = position

      this.containerDiv = document.createElement('div')
      this.containerDiv.classList.add('popup-wrapper')
      this.containerDiv.style.display = 'none'
      this.containerDiv.style.visibility = 'visible'
      this.containerDiv.style.position = 'absolute'
      this.containerDiv.appendChild(content)
    }

    /** Called when the popup is added to the map. */
    onAdd() {
      this.getPanes()!.floatPane.appendChild(this.containerDiv)
      Popup.preventMapHitsAndGesturesFrom(this.containerDiv)
    }

    /** Called when the popup is removed from the map. */
    onRemove() {
      if (this.containerDiv.parentElement) {
        this.containerDiv.parentElement.removeChild(this.containerDiv);
      }
    }

    /** Called each frame when the popup needs to draw itself. */
    draw() {
      // We use the south-west and north-east
      // coordinates of the overlay to peg it to the correct position and size.
      // To do this, we need to retrieve the projection from the overlay.
      const overlayProjection = this.getProjection()
      // Retrieve the south-west and north-east coordinates of this overlay
      // in LatLngs and convert them to pixel coordinates.
      // We'll use these coordinates to resize the div.
      const sw = overlayProjection.fromLatLngToDivPixel(this.position)
      const ne = overlayProjection.fromLatLngToDivPixel(this.position)
  
      // Resize the image's div to fit the indicated dimensions.
      if (this.containerDiv) {
        this.containerDiv.style.left = sw?.x + 'px'
        this.containerDiv.style.top = ne?.y + 'px'
      }
    }

    setPosition (pos: google.maps.LatLng) {
      this.position = pos
    }

    hide() {
      this.containerDiv.style.display = 'none'
    }

    show() {
      this.containerDiv.style.display = 'block'
    }
  }
}

export default CustomPopup
