import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { InputField } from '@library';
import LocationIcon from '@assets/icons/add_location.svg';
import Header from './header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#21212b',
  },
  formContainer: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  paddingTop16: {
    paddingTop: 16,
  },
  marginTop16: {
    marginTop: 16,
  },
  addLocation: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    marginLeft: 10,
  },
  locationText: {
    color: 'rgba(246, 193, 56, 1)',
    fontWeight: '500',
    fontSize: 15,
  },
});

const CreateNFTDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(undefined);

  const onNextPress = () => {
    if (route.params.origin?.profilePhoto) {
      if (route.params.origin?.returnTo === 'startProfilePhoto') {
        navigation.navigate('Start', {
          screen: 'ProfilePhoto',
          params: {
            nft: {
              resource: route.params.nftImage,
              description,
            },
          },
        });
      } else if (route.params.origin?.returnTo === 'editProfilePhoto') {
        navigation.navigate('EditProfile', {
          type: route.params.origin?.type,
          nft: {
            resource: route.params.nftImage,
            description,
          },
        });
      }
    } else {
      navigation.navigate('CreateNFT', {
        screen: 'CreateNFTTokenomics',
        params: {
          nft: {
            resource: route.params.resource,
            description,
            location,
          },
        },
      });
    }
  };

  const navigateToLocation = () => {
    navigation.navigate('CreateNFT', {
      screen: 'LocationNFT',
      params: {
        nft: {
          resource: route.params.resource,
          description,
        },
        setLocation,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Header showNext onPress={onNextPress} step={2} />
      <View style={styles.formContainer}>
        <InputField
          labelName="Description"
          value={description}
          resource={route.params.resource}
          onFieldChange={setDescription}
          inputPlaceholder="Describe your NFT, add hashtags or mention other Creators"
          multiline
          numberOfLines={Platform.OS === 'ios' ? null : 10}
          minHeight={Platform.OS === 'ios' ? 200 : null}
          inputStyle={styles.paddingTop16}
          containerStyle={styles.marginTop16}
        />
      </View>
      <TouchableOpacity
        style={styles.addLocation}
        onPress={() => navigateToLocation()}
      >
        {location ? (
          <Text style={styles.locationText}>{location}</Text>
        ) : (
          <>
            <Text style={styles.locationText}>Add location </Text>
            <LocationIcon style={styles.arrowIcon} />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CreateNFTDetails;
