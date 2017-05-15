import { mapClicked } from './mapClicked'

it('returns correct action', () => {
  const lat = 1.4
  const lng = 2.5
  const expected = {
    type: 'MAP_CLICKED',
    position: { lat, lng }
  }
  const result = mapClicked(lat, lng)
  expect(result).toEqual(expected)

})
