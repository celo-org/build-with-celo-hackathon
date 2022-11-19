import React from 'react';
import { SafeAreaView, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Text, Layout, Card, Icon, Input, Spinner } from '@ui-kitten/components';
import { backgrounds, colorPairs } from '../../colors';
import commonStyles from '../../commonStyles';
import EmptySpace from '../../components/EmptySpace';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { createNewToken } from '../../services/TokenServices/TokenFactoryService';

const num = (Math.floor((Math.random() * 100))) % colorPairs.length;

export default function CreateTokenScreen({ navigation }) {
  const connector = useWalletConnect();
  const scrollViewRef = React.useRef();
  const [projectTitle, setProjectTitle] = React.useState('');
  const [symbol, setSymbol] = React.useState('');
  const [numOfToken, setNumOfToken] = React.useState();
  const [sendingRequest, SetSendingRequest] = React.useState(false);
  const [isWalletConnected, setIsWalletConnected] = React.useState(connector.connected);

  React.useEffect(() => {
    setIsWalletConnected(connector.connected);
  }, [connector.connected]);

  async function handleInstall() {
    SetSendingRequest(true);
    createNewToken(connector, projectTitle, symbol, numOfToken, connector.accounts[0]).then((success) => {
      if (!success) {
        console.log("toast failed");
      }
      else {
        navigation.goBack();
        console.log("refresh to fetch project");
      }
      SetSendingRequest(false);
    })
  }


  return (
    <SafeAreaView style={commonStyles.pageView}>
    <Text>Create token Screen</Text>
      {!isWalletConnected && <View style={commonStyles.warningContainer}>
        <Text style={commonStyles.warningText}>Connect your Wallet to </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Wallet', { screen: 'WalletHomeScreen' })}><Text style={commonStyles.linkText}>continue</Text></TouchableOpacity>
      </View>}
      <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false} ref={scrollViewRef}>
        <EmptySpace />
        <View style={commonStyles.outerCard}>
          <View style={{ ...commonStyles.innerCard, backgroundColor: colorPairs[num].background, flexDirection: 'row' }}>
            <View>
              <Text style={{ color: colorPairs[num].text, ...styles.heading }}> Add Token </Text>
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
        {/* <Input
          style={commonStyles.input}
          label={() => <Text style={commonStyles.inputLabel}> Creators Phone Number</Text>}
          placeholder='8107599599'
        /> */}
        <Input
          style={commonStyles.input}
          onChangeText={setProjectTitle}
          value={projectTitle}
          label={() => <Text style={commonStyles.inputLabel}>Token Name</Text>}
          placeholder={'project Title'}
        />
        {/* <Input
          style={commonStyles.input}
          onChangeText={setDescription}
          value={description}
          label={() => <Text style={commonStyles.inputLabel}> Description</Text>}
          placeholder={'Description'}
          multiline
          numberOfLines={4}
        /> */}
        <Input
          style={commonStyles.input}
          value={symbol}
          onChangeText={setSymbol}
          label={() => <Text style={commonStyles.inputLabel}>Token Symbol</Text>}
          onTouchEnd={() => scrollViewRef.current.scrollToEnd()}
          placeholder={'project symbol eg.."SYM"'}
        />
        <Input
          style={commonStyles.input}
          value={numOfToken}
          onChangeText={setNumOfToken}
          label={() => <Text style={commonStyles.inputLabel}>Total Tokens to Mint</Text>}
          onTouchEnd={() => scrollViewRef.current.scrollToEnd()}
          placeholder='total tokens to mint eg.."20000"'
          keyboardType="numeric"
        />
        {/* <Input
          style={commonStyles.input}
          value={initialDeposit}
          label={() => <Text style={commonStyles.inputLabel}> Total Initial Deposit $</Text>}
          placeholder='2100'
          onChangeText={setInitialDeposit}
        /> */}
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
          {!sendingRequest && "Mint ERC20 Tokens"}
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
