import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import apiKey from "../../../utils/config";
const keys = apiKey.apiKey;

class MapInput extends React.Component {

    render() {
        return (


          <GooglePlacesAutocomplete
              placeholder='Enter Location'
              minLength={2}
              autoFocus={true}
              returnKeyType={'default'}
              fetchDetails={true}
              currentLocationLabel="Current location"
              onPress={(data, details = null) => {
                this.props.notifyChange(details);
                
              }}
              query={{
                  key: 'AIzaSyBQQ9N_ARnjqB1vx9VCL9E__pk3XNoDupA',
                  language: 'en',
              }}
              styles={{
                  textInputContainer: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderTopWidth: 0,
                  borderBottomWidth:0
              },
              textInput: {
                  marginRight: 0,
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 16
              },
              predefinedPlacesDescription: {
                  color: '#1faadb'
              },
              }}
              currentLocation={false}
              currentLocationLabel="Current location"
              nearbyPlacesAPI='GooglePlacesSearch'
              GooglePlacesSearchQuery={{
                  rankby: 'distance',
              }}
              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
              debounce={200}

          />



        );
    }
}
export default MapInput;
