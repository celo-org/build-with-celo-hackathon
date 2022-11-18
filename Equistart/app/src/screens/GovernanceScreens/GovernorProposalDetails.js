import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
} from 'react-native';
import commonStyles from '../../commonStyles';
import VotingDetailSummary from '../../components/VotingDetailSummary';
import EmptySpace from '../../components/EmptySpace';

import {Button, Text, Icon, Spinner, Layout, Card} from '@ui-kitten/components';
import Badge from '../../components/Badge';
import CardList from '../../components/CardList';
import {
  formatAddressLong,
  formatDate,
  formatAddress,
  formatNumber,
  formatNumWithDecimal
} from '../../services/FormatterService';
import {
  castVote,
  getVoteList,
  queueProposal,
  executeProposal,
  getVoteCount,
} from '../../services/GovernorServices/MyGovernorService';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {stateMap} from '../../components/GovernorProposalSummary';

const GovernorProposalDetailsScreen = ({route, navigation}) => {
  const connector = useWalletConnect();
  const [votedList, setVotedList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [yesCount, setYesCount] = React.useState(0);
  const [noCount, setNoCount] = React.useState(0);
  const [votingStatus, setVotingStatus] = React.useState(true);

  const cardData = route.params.cardData;
  console.log('route to carddata: ', cardData);

  // console.log('Proposal Params, target: ', cardData.targets);
  // console.log('value:', cardData.values, " calldatas: ", cardData.callDatas, " description: ", cardData.description );
  //   ProposalCreated(proposalId, proposer, targets, values, signatures, calldatas, startBlock, endBlock, description)

  React.useEffect(() => {
    const state = route.params.cardData.proposalState;
    if (state == 1) {
      setVotingStatus(() => false);
    }
    loadVotinglList();
  }, []);

  const handleVote = async vote => {
    try {
      const castedVote = await castVote(
        connector,
        route.params.cardData.governor,
        route.params.cardData.proposalId,
        vote,
      );
      console.log('Voting Successful:', castedVote);
    } catch (error) {
      console.log('Voting Error:', error);
    }
  };

  const loadVotinglList = async () => {
    setIsLoading(true);
    let voteCount = await getVoteCount(
      route.params.cardData.governor,
      route.params.cardData.proposalId,
    );
    console.log("VOTE COUNTS:", voteCount);
    setYesCount(voteCount.forVotes);
    setNoCount(voteCount.againstVotes);
    const votingList = await getVoteList(
      route.params.cardData.governor,
      route.params.cardData.proposalId,
    );
    console.log('Voting List:', votingList);
    let listOfVoteEvents = [];
    for (let index = 0; index < votingList.length; index++) {
      const currentVotingObj = votingList[index];
      console.log(
        'voter ',
        currentVotingObj.returnValues.voter,
        ' voted ',
        currentVotingObj.returnValues.support,
        'with weight: ',
        currentVotingObj.returnValues.weight,
      );
      listOfVoteEvents.push({
        key: index,
        proposalId: currentVotingObj.returnValues.proposalId,
        voter: currentVotingObj.returnValues.voter,
        decision: currentVotingObj.returnValues.support,
        weight: currentVotingObj.returnValues.weight,
      });
    }
    console.log('LIST oF Voting Events:', listOfVoteEvents);
    setVotedList(listOfVoteEvents);
    setIsLoading(false);
  };

  const queue = async () => {
    const queueTxn = await queueProposal(
      connector,
      cardData.governor,
      cardData.targets,
      cardData.values,
      cardData.callDatas,
      cardData.description,
    );
    console.log('QUEUE TRX: ', queueTxn);
  };

  const execute = async () => {
    const queueTxn = await executeProposal(
      connector,
      cardData.governor,
      cardData.targets,
      cardData.values,
      cardData.callDatas,
      cardData.description,
    );
    console.log('QUEUE TRX: ', queueTxn);
  };

  return (
    <SafeAreaView style={commonStyles.pageView}>
      <ScrollView
        style={commonStyles.pageContent}
        showsVerticalScrollIndicator={false}>
        <EmptySpace />

        <View style={{...commonStyles.innerCard, backgroundColor: '#F8F8F8'}}>
          <View style={styles.nameContainer}>
            <Text style={commonStyles.primaryTextOrange}>Proposal Id</Text>
            <Badge
              text={stateMap[route.params.cardData.proposalState].name}
              color={stateMap[route.params.cardData.proposalState].color}
            />
          </View>
          <TouchableOpacity
            onPress={() => copyToClipboard(route.params.cardData.address)}>
            <Text style={commonStyles.activeText}>
              {formatAddress(route.params.cardData.address)}
            </Text>
          </TouchableOpacity>
          <EmptySpace />
          <Text style={commonStyles.primaryTextOrange}>Description</Text>
          <Text style={styles.text}>{route.params.cardData.description}</Text>
          <EmptySpace />
          <Text style={commonStyles.primaryTextOrange}>About</Text>
          <View>
            <Text style={commonStyles.secondaryTextGrey}>Creator: </Text>
            {
              <Text style={styles.text}>
                {' '}
                {formatAddressLong(route.params.cardData.address)}{' '}
              </Text>
            }
            <Text style={commonStyles.secondaryTextGrey}>
              Voting Started At:{' '}
            </Text>
            {
              <Text style={styles.text}>
                {' '}
                {formatDate(route.params.cardData.votingStartDate)}{' '}
              </Text>
            }
            <Text style={commonStyles.secondaryTextGrey}>Voting Ends At: </Text>
            {
              <Text style={styles.text}>
                {' '}
                {formatDate(route.params.cardData.votingEndDate)}{' '}
              </Text>
            }
          </View>

          <EmptySpace />
          <Text style={commonStyles.primaryTextOrange}>Results</Text>
          <View style={styles.bottomSection}>
              <View style={{marginLeft: '10%'}}></View>
              <Text style={commonStyles.secondaryTextGrey}>
                Yes {<Text style={styles.text}> {formatNumWithDecimal(yesCount, 18)} </Text>}{' '}
              </Text>
              <View style={{marginLeft: '10%'}}></View>
              <Text style={commonStyles.secondaryTextGrey}>
                No {<Text style={styles.text}> {formatNumWithDecimal(noCount, 18)} </Text>}{' '}
              </Text>
            </View>
          <EmptySpace />
          {/* <View style={styles.voteMessage}>
              <Text style={commonStyles.primaryTextOrange}>Vote</Text>
              {votingStatus && (
                <View style={{marginTop: 13, marginLeft: 3}}>
                  <Text style={commonStyles.smallTextRed}>
                    (Voting period is over for this proposal)
                  </Text>
                </View>
              )}
            </View> */}
          {route.params.cardData.proposalState == 1 ? (
            <View style={styles.bottomSection}>
              <Button
                style={commonStyles.doubleButton}
                onPress={() => {
                  handleVote(1);
                }}
                status="success"
                disabled={votingStatus}>
                FOR
              </Button>
              <Button
                style={commonStyles.doubleButton}
                onPress={() => {
                  handleVote(0);
                }}
                status="danger"
                disabled={votingStatus}>
                AGAINST
              </Button>
            </View>
          ) : (
            <></>
          )}
          {route.params.cardData.proposalState == 4 ? (
            <View>
              <Button style={commonStyles.primaryButton} onPress={queue}>
                QUEUE
              </Button>
            </View>
          ) : (
            <></>
          )}
          {route.params.cardData.proposalState == 5 ? (
            <View>
              <Button style={commonStyles.primaryButton} onPress={execute}>
                EXECUTE
              </Button>
            </View>
          ) : (
            <></>
          )}

          <EmptySpace />

          <View>
            <View style={{...commonStyles.row, marginHorizontal: 5}}>
              <Text style={commonStyles.secondaryTextGrey}> Voting List </Text>
              <Button
                style={commonStyles.button}
                onPress={loadVotinglList}
                accessoryLeft={<Icon name="refresh-outline" />}
                status="warning"
              />
            </View>

            <View>
              {!isLoading && (
                <CardList
                  cardListData={votedList}
                  card={VotingDetailSummary}
                  navigation={navigation}
                />
              )}
              {!isLoading && !votedList.length && (
                <View style={{alignItems: 'center'}}>
                  <EmptySpace space={40} />
                  <Text style={commonStyles.tertiaryTextGrey}>No Votes</Text>
                </View>
              )}
              {isLoading && (
                <View style={{alignItems: 'center'}}>
                  <EmptySpace space={50} />
                  <Spinner status="basic" />
                </View>
              )}
            </View>
          </View>
        </View>

        <EmptySpace space={30} />
      </ScrollView>
      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.singleButton}
          onPress={() => navigation.goBack()}
          status="warning">
          Back
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default GovernorProposalDetailsScreen;

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    margin: 4,
  },
  header: {
    maxWidth: '80%',
    color: '#404248',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: '10%',
  },
  voteMessage: {
    flexDirection: 'row',
  },
  text: {
    color: '#9C9DA0',
    paddingLeft: 6,
  },
});
