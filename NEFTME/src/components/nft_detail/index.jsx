import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, View } from 'react-native';
import BackIcon from '@assets/icons/back.svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux';
import { Loading, TruncatedText } from '@library';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useSmartContract } from '@hooks';
import {
  fetchNFTBids,
  fetchNFTDetails,
  fetchStakers,
  fetchUserStakes,
  selectNFTDetails,
  selectNFTStakers,
  selectNFTUserStakes,
} from '@features/on_chain/nft';
import { selectNFTTokenId } from '@features/nft';
import styles from './styles';
import SocialInfo from '../home/timeline/nft/social_info';
import Tokenomics from '../home/timeline/nft/tokenomics';
import CarouselItem from './carousel_item';
import NftInfoItem from './nftInfo_item';
import StakersItem from './stakers_item';
import categories from './nft_categories';
import Stake from './stake';
import Unstake from './unstake';
import MakeOffer from './make_offer';
import ActivityItem from './activity/activity_item';
import OfferModal from './offer_modal';
import EmptyItem from './empty_card';

const NFTDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const { getContractMethods, getContract } = useSmartContract();
  const connector = useWalletConnect();
  const nftData = useSelector((state) =>
    selectNFTTokenId(state, route.params.nftTokenId)
  );
  const nftDetails = useSelector((state) =>
    selectNFTDetails(state, route.params.nftTokenId)
  );
  const nftStakers = useSelector((state) =>
    selectNFTStakers(state, route.params.nftTokenId)
  );
  const nftStakes = useSelector((state) =>
    selectNFTUserStakes(state, route.params.nftTokenId)
  );
  const [offerModalVisible, setOfferModalVisible] = useState(false);
  const [chosenUser, setChosenUser] = useState({});
  const [chosenEventInfo, setChosenEventInfo] = useState({});
  const constant = Constants.manifest.extra;

  const [activity, setActivity] = useState([
    {
      eventName: '',
      eventInfo: {},
      id: 0,
    },
  ]);

  const fillActivityDetails = async (tokenID, eventName) => {
    // Instead of the usual contract methods, to get events we need to use the contract instance
    const activityMethods = await getContract(constant.neftmeErc721Address);

    try {
      const pastEvents = activityMethods.getPastEvents(eventName, {
        filter: {
          tokenId: tokenID,
        },
        // TODO -> get block number at NFT mint time to make search more efficient
        fromBlock: 10000000,
        toBlock: 'latest',
      });
      return pastEvents;
    } catch (err) {
      // console.log('partiu aqui');
    }
    return null;
  };

  const fillNFTDetails = async (tokenID) => {
    // TODO chamar mais metodos
    const stakedEvent = fillActivityDetails(tokenID, 'Staked');
    const unstakedEvent = fillActivityDetails(tokenID, 'Unstaked');
    const transferEvent = fillActivityDetails(tokenID, 'Transfer');
    const bidEvent = fillActivityDetails(tokenID, 'BidCreated');
    const bidAcceptedEvent = fillActivityDetails(tokenID, 'BidAccepted');
    Promise.all([
      stakedEvent,
      unstakedEvent,
      transferEvent,
      bidEvent,
      bidAcceptedEvent,
    ]).then((response) => {
      setActivity(
        response
          .flat()
          .sort((a, b) => {
            if (a.blockNumber > b.blockNumber) return -1;
            if (a.blockNumber < b.blockNumber) return 1;
            return 0;
          })
          .map((pastEvent) => ({
            eventName: pastEvent.event,
            eventInfo: pastEvent.returnValues,
            id: pastEvent.id,
            blockNumber: pastEvent.blockNumber,
          }))
      );
    });
  };

  const showStakers = () => {
    if (nftStakers?.data?.length !== 0) {
      return nftStakers?.data?.map((stakerObj) => (
        <StakersItem stakerInfo={stakerObj} key={stakerObj[0]} />
      ));
    }
    return <EmptyItem text="Currently there are no active stakers" />;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { neftmeErc721Address, neftmeViewContractAddress } =
        Constants.manifest.extra;
      const contractMethods = await getContractMethods(neftmeErc721Address);
      const viewContractMethods = await getContractMethods(
        neftmeViewContractAddress
      );

      dispatch(fetchNFTBids({ tokenId: nftData.tokenId, contractMethods }));
      dispatch(
        fetchNFTDetails({
          tokenId: nftData.tokenId,
          contractMethods: viewContractMethods,
        })
      );
      dispatch(fetchStakers({ tokenId: nftData.tokenId, contractMethods }));
      dispatch(
        fetchUserStakes({
          tokenId: nftData.tokenId,
          account: connector.accounts[0],
          contractMethods,
        })
      );
      fillNFTDetails(nftData.tokenId);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (
      nftData &&
      nftDetails?.loading === 'succeeded' &&
      nftStakers?.loading === 'succeeded' &&
      nftStakes?.loading === 'succeeded'
    ) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [nftData, nftDetails, nftStakers, nftStakes]);

  return (
    <ScrollView style={styles.scrollView}>
      <Loading visible={isLoading} />
      {isLoading ? null : (
        <>
          <Pressable style={styles.backIcon} onPress={navigation.goBack}>
            <BackIcon width={18.67} height={18.67} />
          </Pressable>
          <Image source={{ uri: nftData.resource }} style={styles.image} />
          <View>
            <SocialInfo nft={nftData} />
            <TruncatedText
              text={nftData.description}
              textStyle={styles.nftDescription}
            />
            <View style={styles.tokenomicsContainer}>
              <Tokenomics tokenId={nftData.tokenId} />
              <View style={styles.tokenomicsCard}>
                <Stake tokenId={nftData.tokenId} owner={nftDetails.data[4]} />
                <Unstake tokenId={nftData.tokenId} />
                <MakeOffer
                  tokenId={nftData.tokenId}
                  owner={nftDetails.data[4]}
                />
                <OfferModal
                  offerModalVisible={offerModalVisible}
                  setOfferModalVisible={setOfferModalVisible}
                  chosenEventInfo={chosenEventInfo}
                  chosenUser={chosenUser}
                  tokenId={nftData.tokenId}
                />
              </View>
            </View>
          </View>
          <View style={styles.carouselContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              renderItem={({ item, index }) => (
                <CarouselItem
                  key={`icon_profile_${index}`}
                  item={item}
                  index={index}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              )}
            />
          </View>
          <View style={styles.horizontalBar} />
          <View style={styles.nftDetailView}>
            {
              // NFT Info
              selectedCategory === categories[0].id && (
                <>
                  <NftInfoItem nftInfo={nftDetails.data[4]} isCreator={false} />
                  <NftInfoItem nftInfo={nftDetails.data[5]} isCreator />
                </>
              )
            }
            {
              // Stakers
              selectedCategory === categories[1].id && showStakers()
            }
            {
              // Activity
              selectedCategory === categories[2].id &&
                activity.map((eventObject) => (
                  <ActivityItem
                    key={eventObject.id}
                    activityInfo={eventObject.eventInfo}
                    type={eventObject.eventName}
                    blockNumber={eventObject.blockNumber}
                    // TODO mudar la dentro para redux
                    owner={nftDetails.data[4]}
                    offerModalVisible={offerModalVisible}
                    setOfferModalVisible={setOfferModalVisible}
                    setChosenEventInfo={setChosenEventInfo}
                    setChosenUser={setChosenUser}
                    activity={activity}
                  />
                ))
            }
            {
              // Colection
              selectedCategory === categories[3].id && (
                <>
                  <NftInfoItem nftInfo={nftDetails.data[4]} isCreator={false} />
                  <NftInfoItem nftInfo={nftDetails.data[5]} isCreator />
                </>
              )
            }
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default NFTDetail;
