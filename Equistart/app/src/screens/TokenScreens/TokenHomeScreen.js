import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Button, Text, Icon, Spinner, Input } from '@ui-kitten/components';
import TokenCardDetail from '../../components/TokenCardDetail';
import commonStyles from '../../commonStyles';
import { backgrounds } from '../../colors';
import EmptySpace from '../../components/EmptySpace';
import { transferTokens, getUserBalance, getUserVotes, delegateUser } from '../../services/TokenServices/ERC20TokenService';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { formatNumber } from '../../services/FormatterService';


export default function TokenHomeScreen({ route, navigation }) {
  const connector = useWalletConnect();
  const [cardBackgrounds, setCardBackground] = React.useState(Array.from({ length: 1 }).map(() => backgrounds[Math.floor(Math.random() * 100) % backgrounds.length]));
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [sendingAddress, setSendingAddress] = React.useState();
  const [sendingAmount, setSendingAmount] = React.useState();
  const [fetchinAddress, setFetchingAddress] = React.useState();
  const [fetchedBalance, setFetchedBalance] = React.useState(0);
  const [sending, setSending] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);
  const [isWalletConnected, setIsWalletConnected] = React.useState(
    connector.connected,
  );
  const scrollViewRef = React.useRef();

  React.useEffect(() => {
    setIsWalletConnected(connector.connected);
    console.log("TOken Data:", route.params.data);
  }, [connector.connected]);

  const sendTokens = async () => {
    setSending(true);
    console.log('contract address:', route.params.data.address);
    transferTokens(
      connector,
      route.params.data.address,
      sendingAddress,
      sendingAmount,
    ).then(success => {
      if (!success) {
        console.log('toast failed');
      } else {
        console.log(sendingAmount, 'tokens sent successfully');
      }
    });
    setSending(false);
  };


  const fetchBalance = async () => {
    setFetching(true);
    getUserBalance(route.params.data.address, fetchinAddress).then(result => {
      console.log("User Balance: ", result);
      setFetchedBalance(result);
    })
    setFetching(false);
  }

  return (
    <SafeAreaView style={commonStyles.pageView}>
      <ScrollView
        style={commonStyles.pageContent}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}>
        <TokenCardDetail cardData={route.params.data} navigation={navigation} />
        <View
          style={{
            ...commonStyles.innerCard,
            backgroundColor: cardBackgrounds[0],
          }}>
          <Text style={styles.headerText} category="h3">
            User Balance
          </Text>
          <Input
            style={commonStyles.input}
            onChangeText={setFetchingAddress}
            onTouchEnd={() => scrollViewRef.current.scrollToEnd()}
            value={fetchinAddress}
            placeholder="address"
            // accessoryRight={renderIcon}
            label={() => <Text style={styles.inputLabel}>Address</Text>}
          />
          <View style={commonStyles.rowButtonContainer}>
            <Button style={commonStyles.doubleButton} onPress={fetchBalance}>
              {!fetching && 'Get Balance'}
              {fetching && <Spinner size="tiny" status="basic" />}
            </Button>
          </View>
          <Text style={styles.inputLabel}>
            Balance: {formatNumber(fetchedBalance)}
          </Text>
        </View>
        <EmptySpace space={50} />
      </ScrollView>

      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.navigate('TokenListScreen')}
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
