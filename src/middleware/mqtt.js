export const mqtt = (client) => ({ dispatch }) => {
  const middleware = (next) => (action) => {
    switch(action.type) {
      case 'MAP_CLICKED':
        publishAction({
          type: 'ADD_MARKER',
          marker: action.position
        })
    }
    next(action)
  }

  const ensureClientIsConnected = () => {
    if(!client.connected) throw new Error('Passed an unconnected client to mqtt middleware.')
  }

  const subscribeToMessages = () => {
    client.subscribe('actions')
  }

  const receiveAndDispatchIncomingActions = () => {
    const allowedTypes = ['ADD_MARKER']
    client.on('message', (channel, message) => {
      switch(channel) {
        case 'actions':
          const action = JSON.parse(message)
          allowedTypes.includes(action.type) && dispatch(action)
      }
    })
  }

  const publishAction = (action) => {
    client.publish('actions', JSON.stringify(action))
  }

  ensureClientIsConnected(client)
  subscribeToMessages(client)
  receiveAndDispatchIncomingActions(client, dispatch)
  return middleware
}

