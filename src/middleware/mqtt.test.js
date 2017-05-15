import { mqtt } from './mqtt'
import eventEmitter from 'event-emitter'

let mockClient, store, next

beforeEach(() => {
  next = jest.fn()
  store = {
    dispatch: jest.fn()
  }
  mockClient = eventEmitter({
    subscribe: jest.fn(),
    publish: jest.fn(),
    connected: true
  })
})

it('subscribes to the actions channel', () => {
  const middleware = mqtt(mockClient)(store)
  expect(mockClient.subscribe).toBeCalledWith('actions')
})

it('throws error if passed an unconnected client', () => {
  mockClient.connected = false
  expect(() => mqtt(mockClient)(store)).toThrow()
})

it('publishes ADD_MARKER action on MAP_CLICKED', () => {
  const middleware = mqtt(mockClient)(store)
  const action = {
    type: 'MAP_CLICKED',
    position: {
      lat: 1.5,
      lng: 2.5
    }
  }
  const expectedAction = {
    type: 'ADD_MARKER',
    marker: action.position
  }
  middleware(next)(action)
  expect(mockClient.publish.mock.calls[0][0]).toBe('actions')
  expect(JSON.parse(mockClient.publish.mock.calls[0][1])).toEqual(expectedAction)
})

it('dispatches actions received as mqtt messages', () => {
  const middleware = mqtt(mockClient)(store)
  const action = {
    type: 'ADD_MARKER',
    marker: {
      lat: 1.5,
      lng: 2.5
    }
  }
  mockClient.emit('message', 'actions', JSON.stringify(action))
  expect(store.dispatch).toBeCalledWith(action)
})

it('does not dispatche actions from incorrect channel', () => {
  const middleware = mqtt(mockClient)(store)
  const action = {
    type: 'ADD_MARKER',
    marker: {
      lat: 1.5,
      lng: 2.5
    }
  }
  mockClient.emit('message', 'test', JSON.stringify(action))
  expect(store.dispatch).not.toBeCalled()
})

it('does not dispatche actions from incorrect type', () => {
  const middleware = mqtt(mockClient)(store)
  const action = {
    type: 'ADD_MARKER_FAKE',
    marker: {
      lat: 1.5,
      lng: 2.5
    }
  }
  mockClient.emit('message', 'actions', JSON.stringify(action))
  expect(store.dispatch).not.toBeCalled()
})

it('calls next()', () => {
  const middleware = mqtt(mockClient)(store)
  const action = {
    type: 'MAP_CLICKED',
    position: {
      lat: 1.5,
      lng: 2.5
    }
  }
  middleware(next)(action)
  expect(next).toBeCalled()
})

