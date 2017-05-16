export const addMarker = (lat, lng) => ({
  type: 'ADD_MARKER',
  marker: { lat, lng }
})
