import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import * as Device from 'expo-device';
import { Button, Loading, ProfileImage } from '@library';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useSmartContract } from '@hooks';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { useGetCurrentUserQuery } from '@features/current_user';
import { useDispatch } from 'react-redux';
import { fetchNFTDetails } from '@features/on_chain/nft';
import styles from './offer_modal_styles';

const OfferModal = ({
  offerModalVisible,
  setOfferModalVisible,
  chosenEventInfo,
  chosenUser,
  tokenId,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigateToProfile = () =>
    navigation.navigate('CreatorProfile', { username: chosenUser.username });
  const amount = chosenEventInfo.amount * 10 ** -18;
  const { getContractMethods } = useSmartContract();
  const { data: currentUser } = useGetCurrentUserQuery();
  const [transactionApproved, setTransactionApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Se passar true é para aceitar, false é para recusar
  const acceptOrDeclineOffer = async (isAccept) => {
    // contrato de NFT para executar lógica
    const contractMethods = await getContractMethods(
      Constants.expoConfig.extra.neftmeErc721Address
    );
    // Para esta fase dos contratos temos de fazer assim
    // Primeiro fazer get bids e depois encontrar o index da bid que tem o address
    // do user que fez a oferta
    // Necessita de ser melhorado na próxima iteração com a PREXIs
    try {
      const bidList = await contractMethods.getBids(0).call();
      const bidIndex = bidList?.findIndex(
        (element) => element[0] === chosenUser.walletAddress
      );

      if (isAccept) {
        if (!transactionApproved) {
          Alert.alert('Please approve your transaction first');
          return;
        }
        setIsLoading(true);

        await contractMethods
          .acceptBidERC20(tokenId, bidIndex)
          .send({ from: currentUser.walletAddress })
          .then((response) => {
            if (response?.status) {
              setIsLoading(false);
              Alert.alert('Success!', 'The bid was successfully accepted!', [
                {
                  text: 'Ok',
                  onPress: async () => {
                    const viewContractMethods = await getContractMethods(
                      Constants.expoConfig.extra.neftmeViewContractAddress
                    );
                    const baseParams = {
                      contractMethods,
                      tokenId,
                      forceRefresh: true,
                    };
                    dispatch(
                      fetchNFTDetails({
                        ...baseParams,
                        contractMethods: viewContractMethods,
                      })
                    );
                    setOfferModalVisible(false);
                  },
                },
              ]);
              setTransactionApproved(true);
            }
          });
      } else {
        // TODO, isto não está correto! Este método só pode ser chamado por
        // quem fez a oferta, não quem a recebeu
        // É necessário novo método na chain para quem recebe oferta, a recusar
        contractMethods
          .cancelBidERC20(tokenId, bidIndex)
          .send({ from: currentUser.walletAddress })
          .then((response) => {
            if (response?.status) {
              setIsLoading(false);
              Alert.alert('Success!', 'The bid was successfully declined!', [
                {
                  text: 'Ok',
                  onPress: async () => {
                    setOfferModalVisible(false);
                  },
                },
              ]);
            }
          });
      }
    } catch (err) {
      setIsLoading(false);
      // log something
    }
  };

  const approveOffer = async () => {
    try {
      if (transactionApproved) return;

      const contractMethods = await getContractMethods(
        Constants.expoConfig.extra.neftmeErc721Address
      );
      contractMethods
        .approve(chosenUser?.walletAddress, tokenId)
        .send({ from: currentUser.walletAddress })
        .then((response) => {
          if (response?.status) {
            Alert.alert('Transaction approved, you can now accept the offer!');
            setTransactionApproved(true);
          }
        })
        .catch(() => {
          Alert.alert('Something went wrong, please try again');
        });
    } catch (err) {
      Alert.alert('Something went wrong, please try again');
    }
  };

  return (
    <GestureRecognizer
      onSwipeDown={() => setOfferModalVisible((prevValue) => !prevValue)}
    >
      <Modal
        animationType="slide"
        transparent
        visible={offerModalVisible}
        onRequestClose={() => setOfferModalVisible((prevValue) => !prevValue)}
      >
        {isLoading ? <Loading /> : null}
        <TouchableOpacity
          style={styles.stakeModal}
          activeOpacity={1}
          onPressOut={() => setOfferModalVisible((prevValue) => !prevValue)}
        >
          <KeyboardAvoidingView
            behavior={Device.osName === 'iOS' ? 'padding' : 'height'}
            style={styles.container}
          >
            <View style={styles.topBar} />
            <View style={styles.stakeModalView}>
              <TouchableWithoutFeedback>
                <View style={styles.acceptDenyContainer}>
                  <View style={styles.offerAndAmountBox}>
                    <Pressable onPress={navigateToProfile}>
                      <ProfileImage
                        profileImage={chosenUser.profileImage}
                        imageStyle={styles.image}
                        avatarWidth={30}
                        avatarHeight={30}
                      />
                    </Pressable>
                    <View>
                      <Text style={styles.description}>Made Offer</Text>
                      <Text style={styles.description}>
                        {amount.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.approveAcceptRow}>
                    <Button
                      buttonStyle={[
                        styles.acceptDenyContainer,
                        styles.acceptButton,
                        {
                          backgroundColor: transactionApproved
                            ? '#41414A'
                            : 'rgba(105, 210, 88, 1)',
                        },
                      ]}
                      primary={!transactionApproved}
                      onPress={approveOffer}
                      text="Approve"
                    >
                      <Text style={styles.acceptDenyText}>Approve</Text>
                    </Button>
                    <Button
                      buttonStyle={[
                        styles.acceptDenyContainer,
                        styles.acceptButton,
                        {
                          backgroundColor: transactionApproved
                            ? 'rgba(105, 210, 88, 1)'
                            : '#41414A',
                        },
                      ]}
                      primary={transactionApproved}
                      onPress={() => acceptOrDeclineOffer(true)}
                      text="Accept"
                    >
                      <Text style={styles.acceptDenyText}>Accept</Text>
                    </Button>
                  </View>
                  <Button
                    buttonStyle={styles.denyButton}
                    onPress={() => Alert.alert('Available soon')}
                    text="Decline"
                  >
                    <Text style={styles.acceptDenyText}>Decline</Text>
                  </Button>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
    </GestureRecognizer>
  );
};

OfferModal.propTypes = {
  offerModalVisible: PropTypes.bool.isRequired,
  setOfferModalVisible: PropTypes.func.isRequired,
  chosenEventInfo: PropTypes.shape({
    amount: PropTypes.string,
  }).isRequired,
  chosenUser: PropTypes.shape({
    profileImage: PropTypes.string,
    username: PropTypes.string,
    walletAddress: PropTypes.string,
  }).isRequired,
  tokenId: PropTypes.string.isRequired,
};

export default OfferModal;
