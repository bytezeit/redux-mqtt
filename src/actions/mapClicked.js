export const mapClicked = (lat, lng) => ({
  type: 'MAP_CLICKED',
  marker: { lat, lng }
})
