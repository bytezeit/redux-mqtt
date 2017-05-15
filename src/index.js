import React from 'react';
import ReactDOM from 'react-dom';
import mqtt from 'mqtt'
import App from './App';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { mqtt as createMqttMiddleware } from './middleware/mqtt'
import * as reducers from './reducers'
import './index.css';

const startApp = async () => {
  const client = mqtt.connect('ws://localhost:3000')
  await new Promise((resolve) => client.on('connect', resolve))
  const mqttMiddleware = createMqttMiddleware(client)
  const reducer = combineReducers(reducers)
  const store = createStore(reducer, applyMiddleware(mqttMiddleware))

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}
startApp()
