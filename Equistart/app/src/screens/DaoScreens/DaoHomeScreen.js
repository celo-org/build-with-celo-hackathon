import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Button, Text, Icon, Spinner } from '@ui-kitten/components';
import { Dimensions } from 'react-native';
import DaoCardDetail from '../../components/DaoCardDetail';
import ProposalCardSummary from '../../components/ProposalCardSummary';
import CardList from '../../components/CardList';
import commonStyles from '../../commonStyles';
import { Platform } from 'react-native';
import EmptySpace from '../../components/EmptySpace';
import { getProposalList } from '../../services/ProjectServices';

export default function DaoHomeScreen({ route, navigation }) {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    loadProposalList();
  }, [])


  async function loadProposalList() {
    setIsLoading(true);
    const proposalList = await getProposalList(route.params.data.address);
    console.log(proposalList);
    let listOfObjects = [];
    let currentTimestamp = Number(new Date())/1000;
    if (proposalList.length > 0) {
      for (let i = 0; i < proposalList.length; i++) {
        const prop = proposalList[i];
        listOfObjects.push({ key: prop[0], 
          header: prop[1], 
          description: prop[2], 
          address: prop[3],
          isActive: currentTimestamp < prop[4],
          votingEndDate: String(new Date(prop[4] * 1000)),
          yesCount: prop[5], 
          noCount: prop[6], 
          isPassed: prop[7], 
          projectData: route.params.data });
      }
      setData(listOfObjects);
    }
    setIsLoading(false);
  }

  return (
    <SafeAreaView style={commonStyles.pageView}>
      <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false}>
        <DaoCardDetail cardData={route.params.data} navigation={navigation} />
        <View style={{ ...commonStyles.row, marginHorizontal: 5 }}>
          <Text style={commonStyles.secondaryTextGrey}> All Proposals </Text>
          <Button style={commonStyles.button} onPress={loadProposalList} accessoryLeft={<Icon name='refresh-outline' />} status='warning' />
        </View>
        <View>
          {!isLoading && <CardList cardListData={data} card={ProposalCardSummary} navigation={navigation} />}
          {!isLoading && !data.length && <View style={{ alignItems: 'center' }}><EmptySpace space={40} /><Text style={commonStyles.tertiaryTextGrey}>No Proposals</Text></View>}
          {isLoading && <View style={{ alignItems: 'center' }}><EmptySpace space={50} /><Spinner status='basic' /></View>}
        </View>
        <EmptySpace space={60} />
      </ScrollView>
      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.navigate('DaoList')}
          status="warning">
          Back
        </Button>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.navigate('CreateProposal', { data: route.params.data })}
          size="medium">
          Create Proposal
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});
