import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Button, Text, Layout, Card, Icon, Spinner } from '@ui-kitten/components';
// import LinearGradient from 'react-native-linear-gradient';
import CardList from '../../components/CardList';
import { CommonActions, useNavigation } from '@react-navigation/native';
import commonStyles from '../../commonStyles';
import { COLORS } from '../../colors';
import TokenCardSummary from '../../components/TokenCardSummary';
import EmptySpace from '../../components/EmptySpace';

//importing web3 Services
// import { getProjectList } from '../../services/FactoryServices';
import { getAllDeployedTokens } from '../../services/TokenServices/TokenFactoryService';


export default function TokenListScreen({ navigation }) {

  //const data = [{ key: 0, title: "Equistart", token: "EQI", amount: "21000000", value: "0.0001" }, { key: 1, title: "Company2", token: "CMP2", amount: "100000", value: "1" }, { key: 2, title: "Company3", token: "CMP3", amount: "100000", value: "1" }, { key: 3, title: "Company4", token: "CMP4", amount: "100000", value: "1" },];
  const [data, setData] = React.useState([{ key: 0, title: "0", token: "0", amount: "0", address: "0.0" }]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    loadProjAddList();
  }, [])


  async function loadProjAddList() {
    setIsLoading(true);
    const projectList = await getAllDeployedTokens();
    let listOfObjects = [];
    if (projectList.length > 0) {
      for (let i = 0; i < projectList.length; i++) {
        const tempProj = projectList[i];
        // console.log("TokenDetail", i,":", tempProj);
        listOfObjects.push({ key: tempProj[0], title: tempProj[1], token: tempProj[2], amount: tempProj[3], address: tempProj[5] })
      }
      setData(listOfObjects);
    }
    setIsLoading(false);
  }

  return (
    <SafeAreaView style={commonStyles.pageView}>
      {/* <Text>TokenListing Screen</Text> */}
      
      <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false}>
        <EmptySpace />
        <View style={{ ...styles.messageContainer, ...commonStyles.row }}>
          <View>
            <Text style={commonStyles.primaryTextWhite}>Hi, there </Text>
            <Text style={commonStyles.tertiaryTextGrey}>browse Already created tokens</Text>
            <Text style={commonStyles.tertiaryTextGrey}>or get started by creating your own </Text>
          </View>
          <View>
            <Button style={commonStyles.button} onPress={() => loadProjAddList()} accessoryLeft={<Icon name='refresh-outline' />} status='warning' />
          </View>
        </View>
        {!isLoading && <CardList cardListData={data} card={TokenCardSummary} navigation={navigation} />}
        {/* Add Details Button Navigation for new page */}
        {isLoading && <View style={{ alignItems: 'center' }}><EmptySpace space={50} /><Spinner status='basic' /></View>}
        <EmptySpace space={40} />
      </ScrollView>
      <View style={commonStyles.rowButtonContainer}>
        <Button style={commonStyles.singleButton} onPress={() => { navigation.navigate('CreateToken') }}>
          Create New Token
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
