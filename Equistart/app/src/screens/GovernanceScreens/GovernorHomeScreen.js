import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Button, Text, Icon, Spinner, Input } from '@ui-kitten/components';
import { Dimensions } from 'react-native';
import GovernorCardDetail from '../../components/GovernorCardDetail';
import GovernorProposalSummary from '../../components/GovernorProposalSummary';
import CardList from '../../components/CardList';
import commonStyles from '../../commonStyles';
import { backgrounds } from '../../colors';
import { Platform } from 'react-native';
import EmptySpace from '../../components/EmptySpace';
import { transferTokens, getUserBalance } from '../../services/TokenServices/ERC20TokenService';
import { getAllProposalList, getProposalState } from '../../services/GovernorServices/MyGovernorService';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { formatNumber } from '../../services/FormatterService';
import Toast from 'react-native-simple-toast';


export default function GovernorHomeScreen({ route, navigation }) {
  const connector = useWalletConnect();
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isWalletConnected, setIsWalletConnected] = React.useState(
    connector.connected,
  );

  const scrollViewRef = React.useRef();

  React.useEffect(() => {
    setIsWalletConnected(connector.connected);
    console.log("Route data:", route.params.data);
    loadProposalList();
  }, [connector.connected]);

  const loadProposalList = async () => {
    setIsLoading(true);
    const propList = await getAllProposalList(route.params.data.governor)
    console.log("proposal Result: ", propList[0].returnValues);
    let listOfObjects = [];
    for (let eachProp = 0; eachProp < propList.length; eachProp++) {
      const proposal = propList[eachProp];
      const proposalId = proposal.returnValues.proposalId;
      const proposalState = await getProposalState(route.params.data.governor, proposalId);
      listOfObjects.push({
        key: eachProp,
          governor:route.params.data.governor,
          timelock: route.params.data.timelock,
          token: route.params.data.token,
          proposalId: proposal.returnValues.proposalId, 
          header: proposal.blockHash,
          transactionHash: proposal.transactionHash, 
          description: proposal.returnValues.description, 
          address: proposal.returnValues.proposer,
          votingStartDate: proposal.returnValues.startBlock,
          votingEndDate: proposal.returnValues.endBlock, 
          proposalState: proposalState,
          targets: proposal.returnValues.targets,
          values: proposal.returnValues.values,
          callDatas: proposal.returnValues.calldatas
      });
    }
    console.log("LIST oF PROPOSALS:", listOfObjects)
    setData(listOfObjects);
    setIsLoading(false);
  }

  return (

    <SafeAreaView style={commonStyles.pageView}>
      <ScrollView
        style={commonStyles.pageContent}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}>
        <GovernorCardDetail cardData={route.params.data} navigation={navigation} />
        <Button size='tiny' style={styles.infoButton} onPress={() => navigation.navigate('Instructions', { screen: 'Governor' })} accessoryRight={<Icon name='alert-circle-outline' />} appearance='ghost' status='danger'>More Info</Button>
        <EmptySpace space={4} />
        <View style={{ ...commonStyles.row, marginHorizontal: 5 }}>
          <Text style={commonStyles.secondaryTextGrey}> All Proposals </Text>
          <Button style={commonStyles.button} onPress={() => loadProposalList()} accessoryLeft={<Icon name='refresh-outline' />} status='warning' />
        </View>
        <View>
          {!isLoading && <CardList cardListData={data} card={GovernorProposalSummary} navigation={navigation} />}
          {!isLoading && !data.length && <View style={{ alignItems: 'center' }}><EmptySpace space={40} /><Text style={commonStyles.tertiaryTextGrey}>No Proposals</Text></View>}
          {isLoading && <View style={{ alignItems: 'center' }}><EmptySpace space={50} /><Spinner status='basic' /></View>}
        </View>

        <EmptySpace space={120} />
      </ScrollView>

      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.goBack()}
          status="warning">
          Back
        </Button>
        <Button style={commonStyles.singleButton} onPress={() => { navigation.navigate('CreateProposalScreen', { data: route.params.data }) }}>
          Create Prosposal
        </Button>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: '#404248',
  },
  inputLabel: {
    color: '#000',
    fontWeight: 'bold',
  },
  infoButton: {
    width: '30%',
    marginLeft: '70%'
  }
});
