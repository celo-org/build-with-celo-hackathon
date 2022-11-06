import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Button, CustomTextInput, Loading } from '@library';
import Slider from '@react-native-community/slider';
import { useSmartContract } from '@hooks';
import { mintNFT } from '@services/nft';
import Constants from 'expo-constants';
import Header from './header';
import styles from './create_nft_tokenomics_styles';

const CreateNFTTokenomics = () => {
  const connector = useWalletConnect();
  const navigation = useNavigation();
  const route = useRoute();
  const { getContractMethods } = useSmartContract();
  const [isLoading, setIsLoading] = useState(false);
  const [communityPercentage, setCommunityPercentage] = useState(0);

  const onMintNFTPress = async () => {
    try {
      setIsLoading(true);
      const nft = {
        description: route.params.nft.description,
        communityPercentage,
        resource: route.params.nft.resource,
      };

      const contractMethods = await getContractMethods(
        Constants.expoConfig.extra.neftmeErc721Address
      );
      const mintedNFT = await mintNFT(
        contractMethods,
        nft,
        connector.accounts[0]
      );
      setIsLoading(false);
      if (mintedNFT?.success === true) {
        Alert.alert('NFT Minted', 'Your NFT was successfully minted', [
          {
            text: 'OK', onPress: () => {
              navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [{
                  name: 'Home',
                }],
              }));
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Please try again');
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header showNext={false} onPress={null} step={3} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.sliderContainer}>
            <Text style={styles.labelStyle}>Percentage for community</Text>
            <View style={styles.percentageContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                value={communityPercentage}
                onValueChange={(v) => setCommunityPercentage(Math.round(v))}
                minimumTrackTintColor="#F6C138"
                thumbTintColor="#F6C138"
                maximumTrackTintColor="#F0F0F0"
              />
              <CustomTextInput
                inputStyle={styles.percentageInput}
                value={`${communityPercentage}%`}
                inputPlaceholder=""
                keyboardType="numeric"
                onChangeText={(text) =>
                  setCommunityPercentage(text.replace('%', ''))
                }
              />
            </View>
          </View>
          <Button text="Mint NFT" onPress={onMintNFTPress} textStyle={{}} />
        </View>
      </ScrollView>
      <Loading visible={isLoading} />
    </View>
  );
};

export default CreateNFTTokenomics;
