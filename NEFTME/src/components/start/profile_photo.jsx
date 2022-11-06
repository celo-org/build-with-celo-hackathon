import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { removeData } from '@services/storage';
import {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
} from '@features/current_user';
import { Button, Loading } from '@library';
import { useSmartContract } from '@hooks';
import { withOnboardingView } from '@hocs';
import { mintNFT } from '@services/nft';
import Constants from 'expo-constants';
import styles from './styles';

const navigateTo = (navigation, route) =>
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [route],
    })
  );

const ProfilePhoto = () => {
  const connector = useWalletConnect();
  const navigation = useNavigation();
  const route = useRoute();
  const { getContractMethods } = useSmartContract();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: currentUser } = useGetCurrentUserQuery();
  const [updateCurrentUser] = useUpdateCurrentUserMutation();

  useEffect(() => {
    setIsLoading(true);
    if (currentUser?.profileImage) {
      setProfilePhoto(currentUser.profileImage);
    }
    setIsLoading(false);
  }, [currentUser]);

  useEffect(() => {
    const checkConnector = async () => {
      await removeData('newUser');
      if (connector && !connector.connected) {
        navigateTo(navigation, { name: 'Home' });
      }
    };
    checkConnector();
  }, [connector]);

  useEffect(() => {
    if (route?.params?.nft?.resource) {
      setProfilePhoto(route.params.nft.resource);
    }
  }, [route]);

  const onUploadPhotoPress = () => {
    navigation.navigate('CreateNFT', {
      screen: 'Gallery',
      params: {
        returnTo: 'startProfilePhoto',
        profilePhoto: true,
      },
    });
  };

  const onSetPress = async () => {
    try {
      setIsLoading(true);
      const nft = {
        description: route?.params?.nft?.description || 'My Profile Photo',
        price: 0,
        communityPercentage: 0,
        resource: profilePhoto,
      };
      const contractMethods = await getContractMethods(
        Constants.expoConfig.extra.neftmeErc721Address
      );
      const mintedNFT = await mintNFT(
        contractMethods,
        nft,
        connector.accounts[0]
      );
      if (mintedNFT?.success === true) {
        const response = await updateCurrentUser({
          profileImage: mintedNFT.url,
        });
        setIsLoading(false);
        if (response?.data) {
          Alert.alert('Success', 'Your first NFT was minted successfully!', [
            {
              text: 'Discover NEFTME',
              onPress: () => navigateTo(navigation, { name: 'Home' }),
            },
          ]);
        } else {
          Alert.alert(
            'Error',
            "Your NFT was minted successfully but we couldn't set it as Profile Photo"
          );
        }
      } else {
        setIsLoading(false);
        Alert.alert('Error', 'Something went wrong. Please try again');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Please try again');
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.startTitle}>Create your first NFT!</Text>
      <Text style={styles.startTitle}>It&apos;s Free!</Text>
      <Text style={styles.startSubTitle}>
        Upload an image to set your profile photo.
      </Text>
      <TouchableOpacity onPress={onUploadPhotoPress}>
        <View style={[styles.profilePhotoSize, styles.profilePhotoContainer]}>
          {profilePhoto ? (
            <Image
              source={{ uri: profilePhoto }}
              style={styles.profilePhotoSize}
            />
          ) : (
            <Text style={styles.profilePhotoPlaceholder}>Tap to add photo</Text>
          )}
        </View>
      </TouchableOpacity>
      <Button
        text="Set as profile photo"
        buttonStyle={styles.setProfilePhotoButton}
        primary={!!profilePhoto}
        onPress={profilePhoto ? onSetPress : () => { }}
      />
      {isLoading && <Loading />}
    </View>
  );
};

export default withOnboardingView((navigation) =>
  navigateTo(navigation, { name: 'Home' })
)(ProfilePhoto);
