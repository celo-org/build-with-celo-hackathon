import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LocationIcon from '@assets/icons/location.svg';
import * as Location from 'expo-location';
import { google_api_key } from '@env';

const BACKGROUND_COLOR = '#21212b';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#21212b',
  },
  headerContainer: {
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: BACKGROUND_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    alignSelf: 'center',
    marginTop: 15,
  },
  centerHorVert: {
    justifyContent: 'center',
    marginHorizontal: 50,
    marginBottom: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  locationICon: {
    marginHorizontal: 10,
  },
});

const LocationNFT = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // console.log('Permission to access location was denied');
        // TODO ALERT
        // console.log('sem perms');
      }
    })();
  }, []);

  const fetchLocation = async () => {
    if (await Location.hasServicesEnabledAsync()) {
      const locationCoords = await Location.getCurrentPositionAsync({});
      const morada = await Location.reverseGeocodeAsync(locationCoords.coords);
      route.params.setLocation(`${morada[0].city} ${morada[0].country}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.centerHorVert}
          onPress={() => fetchLocation()}
        >
          <LocationIcon style={styles.locationICon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.centerHorVert}>
          <Text style={styles.button}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.centerHorVert}>
          <Text style={styles.button} onPress={navigation.goBack}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
      <GooglePlacesAutocomplete
        placeholder="Type a place"
        query={{ key: process.env.google_api_key }}
        styles={{
          container: {
            marginTop: 10,
          },
          textInput: {
            height: 38,
            color: '#F8F8F8',
            fontSize: 16,
            fontWeight: '500',
            backgroundColor: '#41414A',
          },
          textInputContainer: {
            marginTop: 10,
            borderRadius: 1,
            marginHorizontal: 10,
          },
          listView: {
            backgroundColor: '#2C2C39',
          },
          row: {
            backgroundColor: '#2C2C39',
          },
          separator: {
            backgroundColor: '#2C2C39',
          },
          description: {
            color: '#FFF',
            fontWeight: '500',
          },
          poweredContainer: {
            backgroundColor: '#2C2C39',
            borderTopColor: '#2C2C39',
          },
        }}
      />
    </View>
  );
};

LocationNFT.propTypes = {};

export default LocationNFT;
