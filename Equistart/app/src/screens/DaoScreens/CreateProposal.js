import React from 'react'
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import commonStyles from '../../commonStyles'
import { Button, Text, Layout, Card, Icon, Input, Datepicker, Spinner } from '@ui-kitten/components'
import EmptySpace from '../../components/EmptySpace';
import { colorPairs } from '../../colors'
import { createProposal } from '../../services/ProjectServices';
import { useWalletConnect } from '@walletconnect/react-native-dapp';


let num = (Math.floor((Math.random() * 100))) % colorPairs.length;

const CreateProposal = ({ route, navigation }) => {
    const [description, setDescription] = React.useState('');
    const [header, setHeader] = React.useState('');
    const [sending, setSending] = React.useState(false);
    const connector = useWalletConnect();
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
        setSending(true);
        createProposal(route.params.data.address, header, description, connector).then(success => {
            setSending(false);
            if (success) {
                console.log("refresh to view proposal");
                navigation.goBack();
            }
            else
                console.log("request failed");
        });
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
                    value={header}
                    onChangeText={header => setHeader(header)}
                    placeholder="Header"
                    label={() => <Text style={commonStyles.inputLabel}> Header </Text>}
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
                {/* <View style={styles.datePickerContainer}>
                    <Datepicker
                        controlStyle={commonStyles.input}
                        min={today}
                        date={startDate}
                        label={() => <Text style={commonStyles.inputLabel}> Start date  </Text>}
                        onSelect={nextStartDate => { setStartDate(nextStartDate); setEndDate('') }}
                        accessoryRight={CalendarIcon}
                        backdropStyle={styles.backdrop}
                    />
                    <Text style={{ ...styles.toText, ...commonStyles.secondaryTextGrey }}> To </Text>
                    <Datepicker
                        controlStyle={commonStyles.input}
                        min={startDate}
                        date={endDate}
                        label={() => <Text style={commonStyles.inputLabel}> End date  </Text>}
                        onSelect={nextEndDate => setEndDate(nextEndDate)}
                        accessoryRight={CalendarIcon}
                        placement={PopoverPlacements.BOTTOM_END}
                        backdropStyle={styles.backdrop}
                    />
                </View> */}
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
                    {!sending && "Publish"}
                    {sending && <Spinner size='tiny' status='basic' />}
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default CreateProposal

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
    }
})
