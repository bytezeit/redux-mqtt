import React, { Component } from 'react';
import { Map, Marker } from 'google-maps-react'
import { mapClicked } from './actions/mapClicked'
import { connect } from 'react-redux'

class App extends Component {
  mapClick = (mapProps, map, event) => {
    const action = mapClicked(event.latLng.lat(), event.latLng.lng())
    this.props.dispatch(action)
  }

  render() {
    return (
      <div>
        <Map google={window.google} onClick={this.mapClick}>
          {this.props.markers.map((position) => <Marker position={position} />)}
        </Map>
      </div>
    );
  }
}

const mapStateToProps = ({ markers }) => ({
  markers 
})
App = connect(mapStateToProps)(App)

export default App;
