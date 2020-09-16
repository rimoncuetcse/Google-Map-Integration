import React from 'react';
import './App.css';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyC4Y5eGN7r-M4motH72OZsXQ4bIZmXOo9Q")
class App extends React.Component {
  state =  {
    value:'',
    zoom: 15,
    mapPosition :{
      lat: 0,
      lng: 0,
    }
  }

  componentDidMount() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                mapPosition: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
            })
            //console.log(position.coords.latitude,position.coords.longitude);
          });

        }
    };  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      console.log('Latitude: ' + this.state.mapPosition.lat);
      console.log('Longitude: '+ this.state.mapPosition.lng);
      console.log('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }

render(){
  const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={this.state.zoom}
      defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
    > 
      <Marker position={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }} >
        <InfoWindow>
          <div>
              <p>Latitude: {this.state.mapPosition.lat}</p>
              <p>Longitude: {this.state.mapPosition.lng}</p>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <label>
                  Name:
                  <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)}/>
                </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </InfoWindow>
      </Marker>
    
    </GoogleMap>
  ));
  return(
      <MapWithAMarker
       googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4Y5eGN7r-M4motH72OZsXQ4bIZmXOo9Q&v=3.exp&libraries=geometry,drawing,places"
       loadingElement={<div style={{ height: `100%` }} />}
       containerElement={<div style={{ height: `100vh` }} />}
       mapElement={<div style={{ height: `100%` }} />}
    />
  );
}
}

export default App;
