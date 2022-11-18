import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import { Button, Text, Layout, Card, Icon, Spinner } from '@ui-kitten/components';
// import LinearGradient from 'react-native-linear-gradient';
import CardList from '../../components/CardList';

import commonStyles from '../../commonStyles';
import { COLORS } from '../../colors';
import CrowdsaleCardSummary from '../../components/CrowdsaleCardSummary';
import EmptySpace from '../../components/EmptySpace';

//importing web3 Services
import { getTokenName } from '../../services/TokenServices/ERC20TokenService';
import { getAllDeployedCrowdsale } from '../../services/CrowdsaleServices/CrowdsaleFactoryService';


export default function CrowdsaleListScreen({ navigation }) {

  //const data = [{ key: 0, title: "Equistart", token: "EQI", amount: "21000000", value: "0.0001" }, { key: 1, title: "Company2", token: "CMP2", amount: "100000", value: "1" }, { key: 2, title: "Company3", token: "CMP3", amount: "100000", value: "1" }, { key: 3, title: "Company4", token: "CMP4", amount: "100000", value: "1" },];
  const [data, setData] = React.useState([{key: 0, tokenName:"0",  tokenAddr: "0.0", rate: 0, beneficiaryAddr: "0.0", crowdsaleAddr: "0.0" }]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    loadProjAddList();
  }, [])


  async function loadProjAddList() {
    setIsLoading(true);
    const projectList = await getAllDeployedCrowdsale();
    let listOfObjects = [];
    if (projectList.length > 0) {
      for (let i = 0; i < projectList.length; i++) {
        const tempProj = projectList[i];
        console.log("CrowdsaleDetail", i,":", tempProj);
        const tempTokenName = await getTokenName(tempProj[0])
        console.log("TokenName:", tempTokenName);
        listOfObjects.push({ key: i, tokenName: tempTokenName, tokenAddr: tempProj[0], rate: tempProj[1], beneficiaryAddr: tempProj[2], crowdsaleAddr: tempProj[3] })
      }
      setData(listOfObjects);
    }
    setIsLoading(false);
  }

  return (
    <SafeAreaView style={commonStyles.pageView}>
      
      <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false}>
        <EmptySpace />
        <View style={{ ...styles.messageContainer, ...commonStyles.row }}>
          <View>
            <Text style={commonStyles.primaryTextWhite}>Hi, there </Text>
            <Text style={commonStyles.tertiaryTextGrey}>browse Already created tokens</Text>
            <Text style={commonStyles.tertiaryTextGrey}>or get started by creating your own </Text>
          </View>
          <View>
            <Button style={commonStyles.button} onPress={loadProjAddList} accessoryLeft={<Icon name='refresh-outline' />} status='warning' />
          </View>
        </View>
        {!isLoading && <CardList cardListData={data} card={CrowdsaleCardSummary} navigation={navigation} />}
        {/* Add Details Button Navigation for new page */}
        {isLoading && <View style={{ alignItems: 'center' }}><EmptySpace space={50} /><Spinner status='basic' /></View>}
        <EmptySpace space={40} />
      </ScrollView>
      

      <View style={commonStyles.rowButtonContainer}>
        <Button style={commonStyles.singleButton} onPress={() => { navigation.navigate('CreateCrowdsale') }}>
          Create New Sale
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginHorizontal: 15
  }
});




//Steps to develop Crowdsale frontend.
//Use Remix and Metamask(celo-alfajores) to deploy the Crowdsale Factory Contract.
//Use a previously deployed tokenContract and instantiate one in remix.
//Deploy a sample Crowdsale using Remix (rate, beneficiary addr, token addr).
//Transfer tokens to Crowdsale contract.

//Frontend
//List Screen first 
//Use token address to get the name of Token sale
//Describe rate to buy.
//Balance of Crowdsale contract holding ERC20 token- should show on list and inside. (BETTER THAT WAY)

//"Create New Crowdsale" screen
//Input area for (rate, beneficiary addr, token addr).
//Transfer token to this newly created contract.
//Either go back to Token List screen, navigate to token and transfer OR next screen with token addr, and send functionality.

//Crowdsale Home Screen
//Get all read functions - token add - Name, symbol, etc.
//Rate, Beneficiary wallet, Wei Raised.
//Buy token function - need to send ETH/CELO in value param.