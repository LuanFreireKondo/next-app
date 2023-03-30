const CONFIG = {
  apiKey: 'YOUR_API_KEY_HERE',
  version: 'weekly',
  region: 'BR',
  language: 'pt',
}

const DEFAULT_OPTIONS = {
  mapId: 'YOUR_MAP_ID_HERE',
  disableDefaultUI: true,
  gestureHandling: 'greedy',
  center: {
    lat: -23.484788599511774,
    lng: -46.677022641105346,
  },
  zoom: 14.5,
  maxZoom: 20,
  minZoom: 14,
}

export {
  CONFIG,
  DEFAULT_OPTIONS,
}