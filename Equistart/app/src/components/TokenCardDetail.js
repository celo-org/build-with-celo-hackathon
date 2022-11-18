import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, Spinner, Icon, Input } from '@ui-kitten/components'
import commonStyles from '../commonStyles'
import { formatAddress, formatNumber } from '../services/FormatterService'
import EmptySpace from './EmptySpace';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { colorPairs, backgrounds } from '../colors';
import { getUserBalance, getUserVotes, delegateUser } from '../services/TokenServices/ERC20TokenService';
import TextToClipBoard from '../components/TextToClipBoard';

let num = (Math.floor((Math.random() * 100))) % colorPairs.length;
const TokenCardDetail = ({ cardData, navigation }) => {
    const [balance, setBalance] = React.useState('');
    const [fetching, setFetching] = React.useState(false);
    const [votes, setVotes] = React.useState('');
    const [delegatePopup, setDelegatePopup] = React.useState(false);
    const [address, setAddress] = React.useState('');
    const connector = useWalletConnect();

    React.useEffect(() => {
        refreshCardDetails();
    }, []);

    const refreshCardDetails = (tokenAddress = cardData.address) => {
        if (connector.connected) {
            setFetching(true);
            setBalance('');
            setVotes('');
            Promise.all([getUserBalance(tokenAddress, connector.accounts[0]), getUserVotes(tokenAddress, connector.accounts[0])])
                .then(([bal, votes]) => {
                    setBalance(bal);
                    setVotes(votes);
                    setFetching(false);
                })
        }
    }

    const delegateVotes = () => {
        if(address !== '')
            delegateUser(connector, cardData.address, address).then((success) => {
                if (success) {
                    setFetching(true);
                    refreshCardDetails();
                    setAddress('');
                }
            })
    }

    const renderCaption = () => {
        return (
          <View style={styles.captionContainer}>
            <Icon name='alert-circle-outline' />
            <Text style={styles.captionText}>Tip: You can delegate yourself too</Text>
          </View>
        )
      }

    return (
        <>
            <View>
                <EmptySpace />
                <View style={{ ...commonStyles.innerCard, backgroundColor: '#F8F8F8' }}>
                    <View style={styles.nameContainer}>
                        <Text numberOfLines={1} style={styles.headerText} category='h3'>{cardData.title}</Text>
                        <Text style={styles.text} category='s1'>({cardData.token})</Text>
                        <Button style={{ ...commonStyles.button, marginLeft: 'auto' }} size='small'
                            onPress={() => refreshCardDetails()} disabled={!connector.connected} status="warning">
                            {fetching && <Spinner size='tiny' status='basic' />}
                            {!fetching && "Refresh"}
                        </Button>
                    </View>
                    <Text style={commonStyles.primaryTextOrange}>About</Text>
                    <View style={commonStyles.rowButtonContainer}>
                        <View>
                            <Text style={commonStyles.secondaryTextGrey}>Project Address</Text>
                            <TextToClipBoard text={cardData.address} textFormatter={formatAddress} />
                            <Text style={commonStyles.secondaryTextGrey}>Your Votes</Text>
                            <Text style={styles.text}>   {formatNumber(votes) || '---'} </Text>
                        </View>
                        <View>
                            <Text style={commonStyles.secondaryTextGrey}>Total token</Text>
                            <Text style={styles.text}>   {formatNumber(cardData.amount)} </Text>
                            <Text style={commonStyles.secondaryTextGrey}>Your Balance</Text>
                            <Text style={styles.text}>   {formatNumber(balance) || '---'} </Text>
                        </View>
                    </View>
                    <EmptySpace />
                    <View style={commonStyles.rowButtonContainer}>
                        {!connector.connected && <Button appearance='outline' size='small' style={{ ...commonStyles.button, width: '45%' }} onPress={() => navigation.navigate('Wallet', { screen: 'WalletHomeScreen' })} accessoryRight={<Icon name='arrow-forward-outline' />}>Connect Wallet</Button>}
                        {connector.connected && <><Button appearance={delegatePopup ? 'filled' : 'outline'} size='small' style={{ ...commonStyles.button, width: '40%' }} onPress={() => setDelegatePopup(!delegatePopup)}>Delegate Votes</Button>
                            <Button appearance='outline' size='small' style={{ ...commonStyles.button, width: '40%' }} onPress={() => navigation.navigate('Wallet', { screen: 'SendScreen', params: { data: cardData } })} accessoryRight={<Icon name='arrow-forward-outline' />}>Send Token</Button></>}
                    </View>
                </View>
                <EmptySpace />
            </View>
            {delegatePopup &&
                <View>
                    <View style={{ ...commonStyles.innerCard, backgroundColor: colorPairs[num].background }}>
                        <Text style={{  ...styles.heading }}>Delegate your Votes</Text>
                        <Text style={{ color: colorPairs[num].text, ...styles.inputLabel}}>Enter the Wallet address, of the person you want to delegate</Text>
                        <Input
                            style={commonStyles.input}
                            onChangeText={setAddress}
                            value={address}
                            placeholder="address"
                            caption={renderCaption}
                        />
                        <View style={{ flexDirection: 'row', marginVertical: '5%', justifyContent: 'space-around' }}>
                            <Button style={{ ...commonStyles.button, width: '35%' }} onPress={() => delegateVotes()}>
                                Confirm
                            </Button>
                        </View>
                    </View>
                    <EmptySpace />
                </View>
            }
        </>
    )
}

export default TokenCardDetail;

const styles = StyleSheet.create({
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#9C9DA0',
        paddingLeft: 6
    },
    headerText: {
        color: '#404248',
        maxWidth: '50%',
        flex: 1
    },
    delegateForm: {
        margin: '3%'
    },
    inputLabel: {
        padding: '2%'
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#404248',
        padding: '2%'
    },
    captionIcon: {
        width: 10,
        height: 10,
        marginRight: 5
      },
      captionText: {
        fontSize: 10,
        color: '#404248',
        marginLeft: 'auto'
      }
})
