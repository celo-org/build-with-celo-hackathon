import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, Spinner, Icon } from '@ui-kitten/components'
import commonStyles from '../commonStyles';
import { formatAddress, formatNumber } from '../services/FormatterService'
import EmptySpace from './EmptySpace';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { getTokenName, getUserVotes } from '../services/TokenServices/ERC20TokenService';
import TextToClipBoard from '../components/TextToClipBoard';

const GovernorCardDetail = ({ cardData, navigation }) => {
    const [fetching, setFetching] = React.useState(false);
    const [tokenName, setTokenName] = React.useState('');
    const [votes, setVotes] = React.useState('');
    const connector = useWalletConnect();

    React.useEffect(() => {
        fetchTokenName(cardData);
        fetchVotingPower(cardData);
    }, []);

    async function fetchTokenName(data) {
        try {
            const result = await getTokenName(data.token);
            console.log("TokenName:", result);
            setTokenName(() => result);
        } catch (error) {
            console.log("ERORO while geting token Name", error);
        }

    }

    async function fetchVotingPower(data) {
        try {
            const result = await getUserVotes(data.token, connector.accounts[0]);
            setVotes(result);
        } catch (error) {
            console.log("ERROR while geting voting Power", error);
        }
    }

    return (
        <View>
            <EmptySpace />
            <View style={{ ...commonStyles.innerCard, backgroundColor: '#F8F8F8' }}>
                <View style={styles.nameContainer}>
                    <Text style={styles.headerText} category='h3'>{tokenName}</Text>
                    <Button style={commonStyles.button} size='small' onPress={() => { navigation.navigate('GovernorSettingScreen', { data: cardData }) }} accessoryLeft={<Icon name='settings-2-outline' />} status='warning' />
                    {/* <Text style={styles.text} category='s1'>({cardData.timelock})</Text> */}
                </View>
                <Text style={commonStyles.primaryTextOrange}>About</Text>
                <View style={commonStyles.rowButtonContainer}>
                    <View>
                        <Text style={commonStyles.secondaryTextGrey}>Timelock </Text>
                        <TextToClipBoard text={cardData.timelock} textFormatter={formatAddress} />
                        <Text style={commonStyles.secondaryTextGrey}>Project Governor </Text>
                        <TextToClipBoard text={cardData.governor} textFormatter={formatAddress} />
                    </View>
                    <View>
                        <Text style={commonStyles.secondaryTextGrey}>Token Addr </Text>
                        <TextToClipBoard text={cardData.token} textFormatter={formatAddress} />
                        <Text style={commonStyles.secondaryTextGrey}>Your Power </Text>
                        {connector.connected && !fetching && <Text style={styles.text}>{formatNumber(votes)} </Text>}
                        {connector.connected && fetching && <View style={{ marginTop: 4, marginLeft: 30 }}><Spinner size='tiny' status='info' /></View>}
                        {!connector.connected && <Button appearance='outline' size='tiny' style={{ ...commonStyles.button, width: 100 }} onPress={() => navigation.navigate('Wallet', { screen: 'WalletHomeScreen' })}>Connect Wallet</Button>}
                    </View>
                </View>

            </View>
            <EmptySpace />
        </View>
    )
}

export default GovernorCardDetail;

const styles = StyleSheet.create({
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '4%'
    },
    text: {
        color: '#9C9DA0',
        paddingLeft: 6,
        fontWeight: 'bold'
    },
    headerText: {
        color: '#404248'
    }
})