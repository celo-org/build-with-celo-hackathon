import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView
} from 'react-native';
import commonStyles from '../../commonStyles'
import { Button, Text, Layout, Card, Icon, Input, Select, SelectItem, Spinner } from '@ui-kitten/components';
import { colorPairs } from '../../colors';
import EmptySpace from '../../components/EmptySpace';
import { getAllDeployedTokens } from '../../services/TokenServices/TokenFactoryService';
import { getUserBalance, transferTokens } from '../../services/TokenServices/ERC20TokenService';
import Web3 from 'web3';
import { Factory_ABI, Project_ABI } from '../../ABI';
import { newKitFromWeb3 } from '@celo/contractkit';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { fetchUserBalance } from '../../services/UserServices';
import { CommonActions } from "@react-navigation/native";

let num = (Math.floor((Math.random() * 100))) % colorPairs.length;

export default function ({ route, navigation }) {
  const [sendingAmount, setSendingAmount] = React.useState();
  const [sendingAddress, setSendingAddress] = React.useState();
  const [selectedIndex, _setSelectedIndex] = React.useState();
  const [tokenList, setTokenList] = React.useState([]);
  const [sending, setSending] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);
  const [balance, setBalance] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);

  const connector = useWalletConnect();
  const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
  const kit = newKitFromWeb3(web3);
  kit.defaultAccount = connector.accounts[0];
  const scrollViewRef = React.useRef();

  const setSelectedIndex = (idx) => {
    _setSelectedIndex(idx);
    fetchBalance(tokenList[idx - 1].address);
  }

  React.useEffect(() => {
    _setSelectedIndex(undefined);
    setTokenList([]);
    setDisabled(false);
    if (!!route.params && !!route.params.data && !!Object.keys(route.params.data).length) {
      setTokenList([route.params.data]);
    }
    else {
      fetchTokenList();
    }
  }, [route.params]);

  React.useEffect(() => {
    if (!!route.params && !!route.params.data && !!Object.keys(route.params.data).length && tokenList.length > 0) {
      setDisabled(true);
      setSelectedIndex(1);
    }
  }, [tokenList])

  const fetchTokenList = async () => {
    const projectList = await getAllDeployedTokens();
    setTokenList(projectList.map((x) => ({ key: x[0], title: x[1], token: x[2], amount: x[3], address: x[5] })));
  }

  const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward' />
  );

  const fetchBalance = (projectAddress) => {
    setFetching(true);
    setBalance('');
    getUserBalance(projectAddress, connector.accounts[0]).then((val) => {
      setBalance(val);
      setFetching(false);
    });
  }

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={() => { }}>
      <Icon {...props} name='minus-square-outline' />
    </TouchableWithoutFeedback>
  );

  const sendTokens = () => {
    if(!!sendingAddress && !!sendingAmount)
      transferTokens(connector, tokenList[selectedIndex - 1].address, sendingAddress, sendingAmount)
  }

  const sendNativeToken = async () => {
    try {
      let amount = kit.web3.utils.toWei('1', 'ether');
      const tx = {
        from: connector.accounts[0],
        to: "0x2F15F9c7C7100698E10A48E3EA22b582FA4fB859",
        value: amount,
      }
      const txn = await connector.sendTransaction(tx)
      console.log("Transaction: ", txn);

    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  const handleNavigation = () => {
    console.log(!!Object.keys(route.params.data).length, Object.keys(route.params.data).length)
    if(!!route.params && !!Object.keys(route.params.data).length) {
      navigation.navigate('Tokens', { screen: 'TokenHomeScreen', params: { data: route.params.data}});
    }
    else {
      navigation.navigate('WalletHomeScreen');
    }
  }
  return (
    <SafeAreaView style={commonStyles.pageView}>
      <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false} ref={scrollViewRef}>
        <EmptySpace />
        <View style={commonStyles.outerCard}>
          <View style={{ ...commonStyles.innerCard, backgroundColor: colorPairs[num].background, flexDirection: 'row' }}>
            <View>
              <Text style={{ color: colorPairs[num].text, ...styles.heading }}> Add Payment </Text>
              <Text style={{ color: colorPairs[num].text, ...styles.heading }}>  Details</Text>
            </View>
            <View>
              <Image
                style={{
                  width: 180,
                  height: 100,
                  resizeMode: 'contain'
                }}
                source={require('../../../assets/images/transfer.png')}
              />
            </View>
          </View>
        </View>
        <EmptySpace />
        <Select
          style={{ height: 70, justifyContent: 'space-between' }}
          status="warning"
          label={() => {
            return <View style={commonStyles.row}>
              <Text style={commonStyles.inputLabel}>Token</Text>
              <View style={{ flexDirection: 'row' }}>
                {!!selectedIndex && <Text style={styles.balanceCaption}>Balance:  {balance}</Text>}
                {fetching && <View style={{ paddingTop: 3 }}><Spinner style={{ height: 12, width: 12 }} size='tiny' status='basic' /></View>}
              </View>
            </View>;
          }}
          disabled={disabled}
          placeholder="Select a Token"
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}
          value={tokenList[selectedIndex - 1]?.token}>
          {tokenList.map((x) => (
            <SelectItem
              key={x.key}
              title={x.token}
              accessoryRight={ForwardIcon}
            />
          ))}
        </Select>
        <EmptySpace />
        <Input
          style={commonStyles.input}
          onChangeText={setSendingAddress}
          onTouchEnd={() => scrollViewRef.current.scrollToEnd()}
          value={sendingAddress}
          placeholder="address"
          // accessoryRight={renderIcon}
          label={() => <Text style={commonStyles.inputLabel}>Address</Text>}
        />
        <Input
          style={commonStyles.input}
          onChangeText={setSendingAmount}
          onTouchEnd={() => scrollViewRef.current.scrollToEnd()}
          value={sendingAmount}
          placeholder="amount"
          label={() => <Text style={commonStyles.inputLabel}>Amount</Text>}
          keyboardType="numeric"
        />
        <EmptySpace space={110} />
      </ScrollView>
      <View style={commonStyles.rowButtonContainer}>
        <Button style={commonStyles.doubleButton} status="warning" onPress={() => handleNavigation()}>
          Back
        </Button>
        <Button style={commonStyles.doubleButton} onPress={sendTokens}>
          {!sending && "Sign and Send"}
          {sending && <Spinner size='tiny' status='basic' />}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  balanceCaption: {
    color: '#9e9e9e',
    fontWeight: 'bold',
    fontSize: 13
  }
});
