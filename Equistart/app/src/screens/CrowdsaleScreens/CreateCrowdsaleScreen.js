import React from 'react';
import { SafeAreaView, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Text, Layout, Card, Icon, Input, Spinner } from '@ui-kitten/components';
import { backgrounds, colorPairs } from '../../colors';
import commonStyles from '../../commonStyles';
import EmptySpace from '../../components/EmptySpace';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { createNewCrowdsale } from '../../services/CrowdsaleServices/CrowdsaleFactoryService';

const num = (Math.floor((Math.random() * 100))) % colorPairs.length;

export default function CreateCrowdsaleScreen({ navigation }) {
  const connector = useWalletConnect();
  const scrollViewRef = React.useRef();
  const [tokenAddr, setTokenAddr] = React.useState('');
  const [beneficiaryAddr, setBeneficiaryAddr] = React.useState('');
  const [rate, setRate] = React.useState();
  const [sendingRequest, SetSendingRequest] = React.useState(false);
  const [isWalletConnected, setIsWalletConnected] = React.useState(connector.connected);

  React.useEffect(() => {
    setIsWalletConnected(connector.connected);
  }, [connector.connected]);

  async function handleInstall() {
    SetSendingRequest(true);
    createNewCrowdsale(connector, tokenAddr, beneficiaryAddr, rate).then((success) => {
      if (!success) {
        console.log("toast failed");
      }
      else {
        navigation.goBack();
        console.log("Crowdsale Deployed")
        console.log("Transfer tokens to this crowdsale to sell");
      }
      SetSendingRequest(false);
    })
  }


  return (
    <SafeAreaView style={commonStyles.pageView}>
    
      {!isWalletConnected && <View style={commonStyles.warningContainer}>
        <Text style={commonStyles.warningText}>Connect your Wallet to </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Wallet', { screen: 'WalletHomeScreen' })}><Text style={commonStyles.linkText}>continue</Text></TouchableOpacity>
      </View>}
      <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false} ref={scrollViewRef}>
        <EmptySpace />
        <View style={commonStyles.outerCard}>
          <View style={{ ...commonStyles.innerCard, backgroundColor: colorPairs[num].background, flexDirection: 'row' }}>
            <View>
              <Text style={{ color: colorPairs[num].text, ...styles.heading }}> Add Crowdsale </Text>
              <Text style={{ color: colorPairs[num].text, ...styles.heading }}>  Details</Text>
            </View>
            <View>
              <Image
                style={{
                  width: 140,
                  height: 100,
                  resizeMode: 'contain'
                }}
                source={require('../../../assets/images/project_details.png')}
              />
            </View>
          </View>
        </View>
        <EmptySpace />
        
        <Input
          style={commonStyles.input}
          onChangeText={setTokenAddr}
          value={tokenAddr}
          label={() => <Text style={commonStyles.inputLabel}>Token Address</Text>}
          placeholder={'your token address'}
        />
        
        <Input
          style={commonStyles.input}
          value={beneficiaryAddr}
          onChangeText={setBeneficiaryAddr}
          label={() => <Text style={commonStyles.inputLabel}>Beneficiary Address</Text>}
          onTouchEnd={() => scrollViewRef.current.scrollToEnd()}
          placeholder={'address to receive funds'}
        />
        <Input
          style={commonStyles.input}
          value={rate}
          onChangeText={setRate}
          label={() => <Text style={commonStyles.inputLabel}>Sale Rate:</Text>}
          onTouchEnd={() => scrollViewRef.current.scrollToEnd()}
          placeholder='rate at which the tokens are sold "wei"'
          keyboardType="numeric"
        />
        
        <EmptySpace space={120} />
      </ScrollView>
      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          // onPress={() => navigation.navigate('DaoList')}
          onPress={() => navigation.goBack()}
          status='warning'>
          Back
        </Button>
        <Button
          style={commonStyles.doubleButton}
          // onPress={() => navigation.navigate('cofounderDetails', {projectTitle: projectTitle, symbol: symbol, numOfToken: numOfToken} )}
          onPress={handleInstall}
          disabled={!isWalletConnected}
        >
          {!sendingRequest && "Deploy Crowdsale"}
          {sendingRequest && <Spinner size='tiny' status='basic' />}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
  }
});
