import { addMarker } from './addMarker'

it('returns correct action', () => {
  const lat = 1.4
  const lng = 2.5
  const expected = {
    type: 'ADD_MARKER',
    marker: { lat, lng }
  }
  const result = addMarker(lat, lng)
  expect(result).toEqual(expected)

})
