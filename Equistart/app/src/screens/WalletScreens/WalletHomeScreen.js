import React from 'react';
import { View, StyleSheet, ScrollView, Image, ImageBackground, SafeAreaView } from 'react-native';
import { Button, Layout, Text, Icon, Card, Spinner } from '@ui-kitten/components';

import commonStyles from '../../commonStyles';
import { colorPairs, backgrounds } from '../../colors';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import EmptySpace from '../../components/EmptySpace';
import { formatMobileNumber, formatAddress, formatTokenValue } from '../../services/FormatterService';
//web3 imports
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';
let num = (Math.floor((Math.random() * 100))) % colorPairs.length;

export default function WalletHomeScreen({ navigation }) {
    const [connected, setConnected] = React.useState(false);
    const [confirmationPopup, setConfirmationPopup] = React.useState(false);
    const [userData, setUserData] = React.useState({ network: 'Alfajores', phone: '9999988888', address: '' });
    const [balance, setBalance] = React.useState({ "CELO": "0", "cEUR": "0", "cUSD": "0", "lockedCELO": "0", "pending": "0" });
    const [fetching, setFetching] = React.useState(false);
    const connector = useWalletConnect();
    const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
    const kit = newKitFromWeb3(web3);

    React.useEffect(() => {
        if (connector.connected) {
            setUserData((x) => ({ ...x, address: connector.accounts[0] }));
            setConnected(true);
            fetchBalance();
        }
    }, []);

    const handleConnect = async () => {
        if (!connector.connected) {
            connector.connect().then((res) => {
                console.log("Connector Result:", res);
                if (res.chainId == 44787) {
                    setUserData((x) => ({ ...x, network: 'alfajores', address: res.accounts[0] }))
                    setConnected(true);
                }


            })
        }
        else {
            setConnected(true);
        }
    }

    const handleDisconnect = async () => {
        // console.log(connector);
        connector.killSession();
        setUserData({ network: '', phone: '', address: '' });
        setBalance({ "CELO": "0", "cEUR": "0", "cUSD": "0", "lockedCELO": "0", "pending": "0" });
        setConnected(false);
        setConfirmationPopup(false);
    }

    const fetchBalance = async () => {
        setFetching(true);
        let totalBalance = await kit.getTotalBalance(connector.accounts[0]);
        console.log("Total balance:", totalBalance);
        // let bal = Object.keys(totalBalance).map((key) => totalBalance[key]);
        // if(totalBalance.CELO && totalBalance.cUSD){
        //     bal["CELO"] = totalBalance.CELO;
        //     bal["cUSD"] = totalBalance.cUSD;
        //     bal["cEUR"] = totalBalance.cEUR;
        // }

        // const projectList = await getProjectList();
        // console.log("contract List:", projectList);

        // for (var i = 0; i < projectList.length; i++) {
        //     console.log(projectList[i]);
        //     let contract = new kit.connection.web3.eth.Contract(Project_ABI, projectList[i][4]);
        //     let syb = await contract.methods.symbol().call();
        //     let val = await contract.methods.balanceOf(connector.accounts[0]).call();
        //     bal[syb] = val + "000000000000000000";
        //     console.log(contract.methods);
        // }
        setBalance(totalBalance);
        setFetching(false);
    }

    const LoadingIndicator = (props) => (
        <View style={[props.style, styles.indicator]}>
            <Spinner size='tiny' status='basic' />
        </View>
    );

    return (
        <SafeAreaView style={commonStyles.pageView}>
            <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false}>
                <EmptySpace />
                <View style={commonStyles.outerCard}>
                    <View style={{ ...commonStyles.innerCard, backgroundColor: colorPairs[num].background }}>
                        <View style={commonStyles.row}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...commonStyles.primaryTextBlack, color: colorPairs[num].text }}>{userData.network}</Text>
                                <View><Icon style={styles.icon} fill={colorPairs[num].text} name='link-2-outline' /></View>
                            </View>
                            <Button style={commonStyles.button} size="small" status="danger" onPress={() => setConfirmationPopup(true)}>
                                Disconnect
                            </Button>
                        </View>
                        <EmptySpace />
                        <View style={commonStyles.rowButtonContainer}>
                            <Image
                                style={{
                                    width: 65,
                                    height: 65,
                                    resizeMode: 'contain'
                                }}
                                source={require('../../../assets/images/user.png')}
                            />
                            {/* <EmptySpace /> */}
                            <View>
                                {/* <Text style={commonStyles.secondaryTextGrey}>    Phone:       {<Text style={commonStyles.tertiaryTextBlack}>{formatMobileNumber(userData.phone)}</Text>}</Text> */}
                                <Text style={commonStyles.secondaryTextGrey}>    Address:    {<Text style={commonStyles.tertiaryTextBlack}>{formatAddress(userData.address)}</Text>}</Text>
                            </View>
                        </View>
                    </View>
                    <EmptySpace />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '2%' }}>
                        <Text style={commonStyles.primaryTextOrange}>Native Tokens: </Text>
                        <Button style={commonStyles.button} status="info" size="small" onPress={() => fetchBalance()}>
                            {!fetching && "Refresh"}
                            {fetching && <LoadingIndicator />}
                        </Button>
                    </View>
                    <EmptySpace />
                    <View style={commonStyles.rowButtonContainer}>
                        <View>
                            <Text style={commonStyles.secondaryTextGrey}>CELO: {<Text>{formatTokenValue(balance.CELO)}</Text>}</Text>
                            <Text style={commonStyles.secondaryTextGrey}>cUSD: {<Text>{formatTokenValue(balance.cUSD)}</Text>}</Text>
                        </View>
                        <View>
                            <Text style={commonStyles.secondaryTextGrey}>cEUR: {<Text>{formatTokenValue(balance.cEUR)}</Text>}</Text>
                            <Text style={commonStyles.secondaryTextGrey}>lockedCELO: {<Text>{formatTokenValue(balance.lockedCELO)}</Text>}</Text>
                        </View>
                    </View>
                </View>
                {/* <View style={commonStyles.warningContainer}>
                    <Text style={commonStyles.warningText}>Project tokens </Text>
                </View> */}
            </ScrollView>

            <View style={commonStyles.rowButtonContainer}>
                <Button style={commonStyles.doubleButton} onPress={() => navigation.navigate('SendScreen', { data: {} })}>
                    Transfer
                </Button>
                <Button style={commonStyles.doubleButton} >
                    Recieve
                </Button>
            </View>

            {!connected &&
                <View style={styles.overlay}>
                    <EmptySpace space={50} />
                    <View style={commonStyles.outerCard}>
                        <View style={{ ...commonStyles.innerCard, backgroundColor: colorPairs[num].background }}>
                            <View style={{ flexDirection: 'row', marginVertical: '5%', justifyContent: 'flex-start' }}>
                                <View>
                                    <Text style={{ color: colorPairs[num].text, ...styles.heading }}> Connect only </Text>
                                    <Text style={{ color: colorPairs[num].text, ...styles.heading }}> Alfajores Wallet</Text>
                                </View>
                                    <Image
                                        style={{
                                            width: '50%',
                                            height: '100%',
                                            resizeMode: 'contain'

                                        }}
                                        source={require('../../../assets/images/wallet.png')}
                                    />
                                </View>
                            <Button style={commonStyles.button} onPress={() => handleConnect()}>
                                Connect
                            </Button>
                        </View>
                    </View>
                </View>
            }

            {confirmationPopup &&
                <View style={styles.overlay}>
                    <EmptySpace space={50} />
                    <View style={commonStyles.outerCard}>
                        <View style={{ ...commonStyles.innerCard, backgroundColor: colorPairs[num].background }}>
                            <Text style={{ color: colorPairs[num].text, ...styles.heading, textAlign: 'center' }}> Are You Sure? </Text>
                            <View style={{ flexDirection: 'row', marginVertical: '5%', justifyContent: 'space-around' }}>
                                <Button style={{...commonStyles.button, width: '44%'}} size="small" status="danger" onPress={() => handleDisconnect()}>
                                    Disconnect
                                </Button>
                                <Button style={{...commonStyles.button, width: '30%'}} size="small" onPress={() => setConfirmationPopup(false)}>
                                    Cancel
                                </Button>
                        </View>
                        </View>
                    </View>
                </View>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 2,
    },
    topCard: {
        padding: '5%',
        justifyContent: 'space-between',
        borderRadius: 15,
        marginHorizontal: '-4%',
        marginVertical: '-2%',
    },
    heading: {
        fontSize: 22,
        // fontWeight: 'bold',
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 1,
        backgroundColor: 'rgba(12,14,15,0.9)',
        width: '100%',
        height: '100%',
        padding: '5%'
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginTop: 5,
        marginLeft: 5,
        width: 25,
        height: 25,
    },
});
