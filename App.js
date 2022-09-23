import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, TextInput, Button, Dimensions, TouchableOpacity, Alert,
  TouchableWithoutFeedback, FlatList,Keyboard, KeyboardAvoidingView, Platform
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';



export default function App() {

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const key = 'i9L5uAR2tSmhFNEKwpOL1V3kpaOjyjGJ';
  const [location, setLocation] = useState('Helsinki');
  const [region, setRegion] = useState({
    latitude: 60.200692, longitude: 24.934302,
    latitudeDelta: 0.0322, longitudeDelta: 0.0221
  });
  const url = 'https://reactnative.dev/movies.json';
  const url2 = `https://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${location}`;

  const buttonPressed = () => {
    fetch(url2)
      .then(response => response.json())
      .then(data => setRegion(
        {
          latitude: data.results[0].locations[0].latLng.lat,
          longitude: data.results[0].locations[0].latLng.lng,
          latitudeDelta: 0.0322, longitudeDelta: 0.0221
        }))
      .catch(error => Alert(error))
  };

  useEffect(() => {

    fetch(url2)
      .then(response => response.json())
      .then(data => setData2(data.results[0].locations[0].latLng))
      .catch(error => Alert(error))
  }, []);
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "android" ? "padding" : "height"}
    style={styles.container}
    >
      <MapView
        style={styles.map}
        region={region}>
        <Marker
          coordinate={{ latitude: region.latitude, longitude: region.longitude }} />


      </MapView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >

        <View>

          <TextInput
            style={{ width: Dimensions.get('window').width, marginBottom: 2}}
            onChangeText={location => setLocation(location)}
            value={location}
            placeholder='street, city'
          /> 
          <View style={{height: 150}}>
            <Button title='show' onPress={buttonPressed} />
          </View>
        </View>


      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  map: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').height) * 0.91,
    marginBottom: 10
  },
});