# MQTT with Redux
This is a demonstration of a Redux-based code architecture that closely integrates with MQTT.

# About the code
So far the architecture includes [two redux actions.](src/actions) A MAP_CLICKED action, which is fired upon a click event on the map, and an ADD_MARKER action, which displays a new marker on the map.

The [MQTT middleware](src/middleware/mqtt.js) has two responsibilities. The first responsibility is to listen to, and dispatch, actions published by other clients over MQTT. The second responsibility is to publish ADD_MARKER actions to all other connected clients based on local MAP_CLICKED events/actions. Further actions could be added with a few lines of code, but I keep it simple for now, for the sake of clarity.

The [Markers Reducer](src/reducers/markers.js) reflects ADD_MARKER actions in the local state.

The [index.js](src/index.js) links all of the above together.

The [Application component](src/App.js) displays a map with corresponding markers and dispatches MAP_CLICKED actions.

That's all the code there is to this application.

Start a Websocket base MQTT broker on port 3000, then open multiple instances of this Redux application, and click on the map to create a marker. You will see how all application instances will reflect the changes synchronously.
