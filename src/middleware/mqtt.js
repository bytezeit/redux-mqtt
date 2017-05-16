import { addMarker } from '../actions/addMarker'

export const mqtt = (client) => ({ dispatch }) => {
  const setupReceiveAndSendActionsMiddleware = () => {
    receiveAndDispatchIncomingActions(client, dispatch)
    return publishOutgoingActionsMiddleware
  }

  const receiveAndDispatchIncomingActions = () => {
    ensureClientIsConnected()
    subscribeToMessages()
    client.on('message', handleIncomingMessage)
  }

  const ensureClientIsConnected = () => {
    if(!client.connected) throw new Error('Passed an unconnected client to mqtt middleware.')
  }

  const subscribeToMessages = () => {
    client.subscribe('actions')
  }

  const handleIncomingMessage = (channel, message) => {
    const allowedTypes = ['ADD_MARKER']
    switch(channel) {
      case 'actions':
        const action = JSON.parse(message)
        if(allowedTypes.includes(action.type)) return dispatch(action)
    }
  }

  const publishOutgoingActionsMiddleware = (next) => (action) => {
    if(action.type === 'MAP_CLICKED') handleMapClickedAction(action)
    next(action)
  }

  const handleMapClickedAction = (action) => {
    const { lat, lng } = action.position
    const actionToPublish = addMarker(lat, lng)
    publishAction(actionToPublish)
  }

  const publishAction = (action) => {
    client.publish('actions', JSON.stringify(action))
  }

  return setupReceiveAndSendActionsMiddleware()
}

