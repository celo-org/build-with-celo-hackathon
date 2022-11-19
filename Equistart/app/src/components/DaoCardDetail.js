import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, Spinner, Card, Icon } from '@ui-kitten/components'
import commonStyles from '../commonStyles'
import { backgrounds } from '../colors'
import { formatAddress, formatMobileNumber, formatNumber } from '../services/FormatterService'
import EmptySpace from './EmptySpace';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { fetchUserBalance } from '../services/UserServices';

const DaoCardDetail = ({ cardData, navigation }) => {
    const [balance, setBalance] = React.useState('');
    const [fetching, setFetching] = React.useState(false);
    const connector = useWalletConnect();

    React.useEffect(() => {
        fetchBalance(cardData.address);
    }, []);

    const fetchBalance = (projectAddress) => {
        if (connector.connected) {
            setFetching(true);
            setBalance('');
            fetchUserBalance(projectAddress, connector).then((val) => {
                setBalance(val);
                setFetching(false);
            });
        }
    }

    return (
        <View>
            <EmptySpace />
            <View style={{ ...commonStyles.innerCard, backgroundColor: '#F8F8F8' }}>
                <View style={styles.nameContainer}>
                    <Text style={styles.headerText} category='h3'>{cardData.title}</Text>
                    <Text style={styles.text} category='s1'>({cardData.token})</Text>
                </View>
                <Text style={commonStyles.primaryTextOrange}>About</Text>
                <View style={commonStyles.rowButtonContainer}>
                    <View>
                        <Text style={commonStyles.secondaryTextGrey}>Symbol: </Text>
                        <Text style={styles.text}>   {cardData.token} </Text>
                        <Text style={commonStyles.secondaryTextGrey}>Project Address: </Text>
                        <Text style={styles.text}>   {formatAddress(cardData.address)} </Text>
                    </View>
                    <View>
                        <Text style={commonStyles.secondaryTextGrey}>Total token: </Text>
                        <Text style={styles.text}>   {formatNumber(cardData.amount)} </Text>
                        <Text style={commonStyles.secondaryTextGrey}>Your Balance: </Text>
                        {connector.connected && !fetching && <Text style={styles.text}>   {formatNumber(balance)} </Text>}
                        {connector.connected && fetching && <View style={{ marginTop: 4, marginLeft: 30 }}><Spinner size='tiny' status='info' /></View>}
                        {!connector.connected && <Button appearance='outline' size='tiny' style={{ ...commonStyles.button, width: 100 }} onPress={() => navigation.navigate('Wallet', { screen: 'WalletHomeScreen' })}>Connect Wallet</Button>}
                    </View>
                </View>

                {/* <Text style={commonStyles.primaryTextOrange}>Balance</Text>
                <View style={commonStyles.rowButtonContainer}>
                <Text style={styles.text}>
                    500 EQUI
                </Text>
                <Button appearance='ghost' style={commonStyles.button} onPress={() => navigation.navigate('Wallet', { screen: 'SendScreen' })}>Transfer</Button>
                <Icon name='star'/>
                </View> */}
            </View>
            <EmptySpace />
        </View>
    )
}

export default DaoCardDetail;

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
        color: '#404248'
    }
})
