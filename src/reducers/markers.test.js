import { markers } from './markers'


const baseState = []
const exampleState = [
  { lat: 20.5, lng: 30.5 },
  { lat: 40.5, lng: 50.5 }
]

it('initializes default state', () => {
  const result = markers()
  expect(result).toEqual(baseState)
})

it('ignores unregistered actions', () => {
  const action = {
    type: 'UNKNOWN'
  }
  const state = freeze([...exampleState])
  const result = markers(state, action)
  expect(result).toEqual(state)
})

it('ADD_MARKER adds new marker to list', () => {
  const marker = { lat: 40.5, lng: 50.5 }
  const action = {
    type: 'ADD_MARKER',
    marker
  }
  const state = freeze([...exampleState])
  const expected = [...state, marker]
  const result = markers(state, action)
  expect(result).toEqual(expected)
})
