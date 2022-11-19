import React from 'react'
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import commonStyles from '../../commonStyles'
import { Button, Text, Layout, Card, Icon, Input, Datepicker, Spinner } from '@ui-kitten/components'
import EmptySpace from '../../components/EmptySpace';
import { colorPairs, COLORS } from '../../colors'
import { createNewProposal } from '../../services/GovernorServices/MyGovernorService';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { formatAddress, formatNumber, copyToClipboard } from '../../services/FormatterService';
import {getUserBalance} from '../../services/TokenServices/ERC20TokenService';

let num = (Math.floor((Math.random() * 100))) % colorPairs.length;

const CreateProposalScreen = ({ route, navigation }) => {
    const connector = useWalletConnect();

    console.log("DATA FOR:", route.params.data.timelock);
    const [description, setDescription] = React.useState('');
    const [tokenAddr, setTokenAddr] = React.useState('');
    const [receiverAddr, setReceiverAddr] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [treasuryBal, setTreasuryBal] = React.useState('Enter token address');
    //HUMANS TOKEN
    // let tokenAddr = "0x7D0834ef50fcb367F675159e100E1b3620Aa9698";
    // let receiverAddr = "0x2F15F9c7C7100698E10A48E3EA22b582FA4fB859";
    // let amount = 3;
    // let description = "test propsosal";
    const [sending, setSending] = React.useState(false);
    const [isWalletConnected, setIsWalletConnected] = React.useState(connector.connected);
    const scrollViewRef = React.useRef();

    React.useEffect(() => {
        setIsWalletConnected(connector.connected);
    }, [connector.connected]);
    // const today = new Date();
    // const [startDate, setStartDate] = React.useState(today);
    // const [endDate, setEndDate] = React.useState();

    const CalendarIcon = (props) => (
        <Icon {...props} name='calendar' />
    );

    const addProposal = async () => {
        // setSending(true);
        // console.log("COMMON DUdE, CODE UP:", route );
        createNewProposal(connector, route.params.data.governor, tokenAddr, receiverAddr, amount, description).then(success => {
            setSending(false);
            if (success) {
                console.log("refresh to view proposal");
                navigation.goBack();
            }
            else
                console.log("request failed");
        }).error(err=>{
            console.log("Error while crating prop:", err)
        });
    }

    const getTreasuryBalance = async () => {
        const balance = await getUserBalance(tokenAddr, route.params.data.timelock);
        console.log("Treasury Balance:", balance);
        setTreasuryBal(()=>balance);
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
                            <Text style={{ color: colorPairs[num].text, ...styles.heading }}> Enter Proposal </Text>
                            <Text style={{ color: colorPairs[num].text, ...styles.heading }}>  Details</Text>
                            <Text style={commonStyles.tertiaryTextBlack}>Use Timelock contract</Text> 
                            <Text style={commonStyles.tertiaryTextBlack}>as treasury Address</Text>
                            
                            {/* <Text>{route.params.data.timelock}</Text> */}
                            <TouchableOpacity onPress={() => copyToClipboard(route.params.data.timelock)}>
                                <Text style={commonStyles.activeText}>{formatAddress(route.params.data.timelock)}</Text>
                            </TouchableOpacity>
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
                    value={tokenAddr}
                    onChangeText={val => setTokenAddr(val)}
                    placeholder="address"
                    label={() => <Text style={commonStyles.inputLabel}> Token Address </Text>}
                />
                <View>
                    <Button
                        style={styles.smallButton}
                        onPress={getTreasuryBalance}
                        status='warning'>
                        Get Treasury Balance
                    </Button>
                    <Text style={styles.smallText}>{treasuryBal}</Text>
                </View>
                <Input
                    style={commonStyles.input}
                    value={receiverAddr}
                    onChangeText={val => setReceiverAddr(val)}
                    placeholder="address"
                    label={() => <Text style={commonStyles.inputLabel}> Receivers Address </Text>}
                />
                <Input
                    style={commonStyles.input}
                    value={amount}
                    onChangeText={val => setAmount(val)}
                    placeholder="uint256[]"
                    label={() => <Text style={commonStyles.inputLabel}> Amount/Value </Text>}
                />
                <Input
                    style={commonStyles.input}
                    onChangeText={setDescription}
                    value={description}
                    onTouchEnd={() => scrollViewRef.current.scrollToEnd()}
                    label={() => <Text style={commonStyles.inputLabel}> Description </Text>}
                    placeholder='Description'
                    multiline
                    numberOfLines={4}
                />
                <EmptySpace space={120} />
            </ScrollView>
            <View style={commonStyles.rowButtonContainer}>
                <Button
                    style={commonStyles.doubleButton}
                    onPress={() => navigation.goBack(null)}
                    status='warning'>
                    Back
                </Button>
                <Button
                    style={commonStyles.doubleButton}
                    onPress={addProposal}
                    disabled={!isWalletConnected}
                >
                    {!sending && "Send"}
                    {sending && <Spinner size='tiny' status='basic' />}
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default CreateProposalScreen

const styles = StyleSheet.create({
    input: {
        margin: 4,
    },
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    formView: {
        padding: '3%',
    },
    toText: {
        marginTop: 30
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    smallText:{
        fontSize: 12,
        color: COLORS.secondaryWhite
    }
    
})
