import React from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {Button, Text, Icon, Spinner, Input} from '@ui-kitten/components';
import {Dimensions} from 'react-native';
import CrowdsaleCardDetail from '../../components/CrowdsaleCardDetail';
import commonStyles from '../../commonStyles';
import {backgrounds} from '../../colors';
import {Platform} from 'react-native';
import EmptySpace from '../../components/EmptySpace';
// import {transferTokens,getUserBalance } from '../../services/TokenServices/ERC20TokenService';
import {buyTokens} from '../../services/CrowdsaleServices/CrowdsaleService';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {formatNumber} from '../../services/FormatterService';

export default function CrowdsaleHomeScreen({route, navigation}) {
  const connector = useWalletConnect();

  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [sendingAddress, setSendingAddress] = React.useState();
  const [buyingAmount, setBuyingAmount] = React.useState(0);
  const [sending, setSending] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);
  const [isWalletConnected, setIsWalletConnected] = React.useState(
    connector.connected,
  );

  const scrollViewRef = React.useRef();

  React.useEffect(() => {
    setIsWalletConnected(connector.connected);
  }, [connector.connected]);

  const buyListedTokens = async () => {
    setSending(true);
    console.log('Crowdsale contract address:', route.params.data.crowdsaleAddr);
    buyTokens(
      connector,
      route.params.data.crowdsaleAddr,
      connector.accounts[0],
      buyingAmount,
    ).then(success => {
      if (!success) {
        console.log('toast failed');
      } else {
        console.log('Tokens bought successfully' );
      }
    });
    setSending(false);
  };


  // const fetchBalance = async () => {
  //   setFetching(true);
  //   getUserBalance(route.params.data.address, fetchinAddress).then(result => {
  //     console.log("User Balance: ", result);
  //     setFetchedBalance(result);
  //   })
  //   setFetching(false);
  // }

  return (
    
    <SafeAreaView style={commonStyles.pageView}>
      <ScrollView
        style={commonStyles.pageContent}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}>
        {/* TODO: Add Crowdsale Home Screen */}


        <CrowdsaleCardDetail cardData={route.params.data} navigation={navigation} />


        <View
          style={{
            ...commonStyles.innerCard,
            backgroundColor:
              backgrounds[Math.floor(Math.random() * 100) % backgrounds.length],
          }}>
          <Text style={styles.headerText} category="h3">
            Buy Tokens
          </Text>
          {/* <Input
            style={commonStyles.input}
            onChangeText={setSendingAddress}
            onTouchEnd={() => scrollViewRef.current.scrollToEnd()}
            value={sendingAddress}
            placeholder="address"
            // accessoryRight={renderIcon}
            label={() => <Text style={styles.inputLabel}>Address</Text>}
          /> */}
          <Input
            style={commonStyles.input}
            onChangeText={setBuyingAmount}
            onTouchEnd={() => scrollViewRef.current.scrollToEnd()}
            value={buyingAmount}
            placeholder="amount"
            label={() => <Text style={styles.inputLabel}>Amount (CELO)</Text>}
            keyboardType="numeric"
          />
          <Text style={styles.inputLabel}>Tokens to receive: {route.params.data.rate * buyingAmount}</Text>
          <View style={commonStyles.rowButtonContainer}>
            <Button style={commonStyles.doubleButton} onPress={buyListedTokens}>
              {!sending && 'Buy Tokens'}
              {sending && <Spinner size="tiny" status="basic" />}
            </Button>
          </View>
        </View>

        <EmptySpace space={12} />


        <EmptySpace space={60} />
      </ScrollView>

      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.goBack()}
          status="warning">
          Back
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
});
