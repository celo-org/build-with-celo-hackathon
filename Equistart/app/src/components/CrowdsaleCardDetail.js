import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Button, Text, Spinner, Card, Icon } from '@ui-kitten/components'
import commonStyles from '../commonStyles'
import { backgrounds } from '../colors'
import { formatAddress, formatNumber } from '../services/FormatterService'
import EmptySpace from './EmptySpace';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { getAmountRaised } from '../services/CrowdsaleServices/CrowdsaleService';
import { getTokenSupply, getUserBalance } from '../services/TokenServices/ERC20TokenService';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';

const CrowdsaleCardDetail = ({ cardData, navigation }) => {
    const [balance, setBalance] = React.useState('');
    const [crowdsaleBal, setCrowdsaleBal] = React.useState('');
    const [tokenSupply, setTokenSupply] = React.useState('');
    const [fetching, setFetching] = React.useState(false);

    const connector = useWalletConnect();

    React.useEffect(() => {
        fetchAmountRaised(cardData.crowdsaleAddr);
        fetchTotalTokenSupply(cardData.tokenAddr);
        fetchContractTokenBalance(cardData.tokenAddr, cardData.crowdsaleAddr);
    }, []);

    const fetchAmountRaised = (crowdsaleAddress) => {
            setFetching(true);
            setBalance('');
            getAmountRaised(crowdsaleAddress).then((val) => {
                console.log("Amount Raised(wei)", val);
                setBalance(val);
                setFetching(false);
            }).catch((err)=>{
                console.log("Error while fetching Amount Raised:", err );
            })
        
    }

    const fetchTotalTokenSupply = (tokenAddress) => {
            setFetching(true);
            setBalance('');
            getTokenSupply(tokenAddress).then((val) => {
                console.log("Token Supply:", val);
                setTokenSupply(val);
                setFetching(false);
            }).catch((err)=>{
                console.log("Error while fetching Amount Raised:", err );
            })
    }

    const fetchContractTokenBalance = (tokenAddress, crowdsaleAddress) => {
            setFetching(true);
            setBalance('');
            getUserBalance(tokenAddress, crowdsaleAddress).then((val) => {
                console.log("Crowdsale Token Balance:", val);
                setCrowdsaleBal(val);
                setFetching(false);
            }).catch((err)=>{
                console.log("Error while fetching crowdsale Balance:", err );
            })
        
    }

    const copyToClipboard = (address) => {
        Clipboard.setString(address);
        Toast.show('Address copied to clipboard!')
    }
    

    return (
        <View>
            <EmptySpace />
            <View style={{ ...commonStyles.innerCard, backgroundColor: '#F8F8F8' }}>
                <View style={styles.nameContainer}>
                    <Text style={styles.headerText} category='h3'>Sale: {cardData.tokenName}</Text>
                    <TouchableOpacity onPress={() => copyToClipboard(cardData.tokenAddr)}>
                        <Text style={commonStyles.activeText}>{formatAddress(cardData.tokenAddr)}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={commonStyles.primaryTextOrange}>About</Text>
                <View style={commonStyles.rowButtonContainer}>
                    <View>
                        <Text style={commonStyles.secondaryTextGrey}>Crowdsale Addr </Text>
                        <TouchableOpacity onPress={() => copyToClipboard(cardData.crowdsaleAddr)}>
                            <Text style={commonStyles.activeText}>{formatAddress(cardData.crowdsaleAddr)}</Text>
                        </TouchableOpacity>
                        <Text style={commonStyles.secondaryTextGrey}>Beneficiary Addr </Text>
                        <TouchableOpacity onPress={() => copyToClipboard(cardData.beneficiaryAddr)}>
                            <Text style={commonStyles.activeText}>{formatAddress(cardData.beneficiaryAddr)} </Text>
                        </TouchableOpacity>
                        {/* add total number of tokens */}
                        <Text style={commonStyles.secondaryTextGrey}>Token Supply </Text>
                        {!fetching && <Text style={styles.text}>   {formatNumber(tokenSupply)} </Text>}
                        {fetching && <View style={{ marginTop: 4, marginLeft: 30 }}><Spinner size='tiny' status='info' /></View>}
                    </View>
                    <View>
                        <Text style={commonStyles.secondaryTextGrey}>Rate </Text>
                        <Text style={styles.text}> {cardData.rate} Token/Celo</Text>
                        <Text style={commonStyles.secondaryTextGrey}>Amount Raised </Text>
                        {connector.connected && !fetching && <Text style={styles.text}>   {formatNumber(balance)} </Text>}
                        {connector.connected && fetching && <View style={{ marginTop: 4, marginLeft: 30 }}><Spinner size='tiny' status='info' /></View>}
                        {/* {!connector.connected && <Button appearance='outline' size='tiny' style={{ ...commonStyles.button, width: 100 }} onPress={() => navigation.navigate('Wallet', { screen: 'WalletHomeScreen' })}>Connect Wallet</Button>} */}
                        <Text style={commonStyles.secondaryTextGrey}>Sale Token Bal </Text>
                        {!fetching && <Text style={styles.text}>   {formatNumber(crowdsaleBal)} </Text>}
                        {fetching && <View style={{ marginTop: 4, marginLeft: 30 }}><Spinner size='tiny' status='info' /></View>}
                        {/* Balance of CrowdsaleContract */}
                        

                    </View>
                </View>

            </View>
            <EmptySpace />
        </View>
    )
}

export default CrowdsaleCardDetail;

const styles = StyleSheet.create({
    nameContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    text: {
        color: '#9C9DA0',
        paddingLeft: 6
    },
    headerText: {
        color: '#404248'
    }
})
