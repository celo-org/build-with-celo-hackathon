import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Button, Text, Layout, Card, Icon, Spinner } from '@ui-kitten/components';
// import LinearGradient from 'react-native-linear-gradient';
import CardList from '../../components/CardList';

import commonStyles from '../../commonStyles';
import { COLORS } from '../../colors';
import DaoCardSummary from '../../components/DaoCardSummary';
import EmptySpace from '../../components/EmptySpace';

//importing web3 Services
import { getProjectList } from '../../services/FactoryServices';

export default function DaoListScreen({ navigation }) {

  //const data = [{ key: 0, title: "Equistart", token: "EQI", amount: "21000000", value: "0.0001" }, { key: 1, title: "Company2", token: "CMP2", amount: "100000", value: "1" }, { key: 2, title: "Company3", token: "CMP3", amount: "100000", value: "1" }, { key: 3, title: "Company4", token: "CMP4", amount: "100000", value: "1" },];
  const [data, setData] = React.useState([{ key: 0, title: "0", token: "0", amount: "0", address: "0.0" }]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    loadProjAddList();
  }, [])


  async function loadProjAddList() {
    setIsLoading(true);
    const projectList = await getProjectList();
    let listOfObjects = [];
    if (projectList.length > 0) {
      for (let i = 0; i < projectList.length; i++) {
        const tempProj = projectList[i];
        listOfObjects.push({ key: tempProj[0], title: tempProj[1], token: tempProj[2], amount: tempProj[3], address: tempProj[4] })
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
            <Text style={commonStyles.tertiaryTextGrey}>browse projects</Text>
            <Text style={commonStyles.tertiaryTextGrey}>or get started by creating yours </Text>
          </View>
          <View>
            <Button style={commonStyles.button} onPress={loadProjAddList} accessoryLeft={<Icon name='refresh-outline' />} status='warning' />
          </View>
        </View>
        {!isLoading && <CardList cardListData={data} card={DaoCardSummary} navigation={navigation} />}
        {isLoading && <View style={{ alignItems: 'center' }}><EmptySpace space={50} /><Spinner status='basic' /></View>}
        <EmptySpace space={40} />
      </ScrollView>
      <View style={commonStyles.rowButtonContainer}>
        <Button style={commonStyles.singleButton} onPress={() => { navigation.navigate('CreateDao') }}>
          Create New Project
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
