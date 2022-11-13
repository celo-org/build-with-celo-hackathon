import React, { Component } from 'react';
import { View, Text, ScrollView, Pressable, Dimensions, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import GlobalStyles from '../../styles/styles';
import Header from '../components/header';
import IconMC from 'react-native-vector-icons/MaterialIcons';
import QRCodeScanner from 'react-native-qrcode-scanner';
import reactAutobind from 'react-autobind';
import ContextModule from '../../utils/contextModule';
import FiatSign from './fiatSign';
import { Picker } from 'react-native-form-component';
import VirtualKeyboard from 'react-native-virtual-keyboard';

const tokens = [
    {
        name: "USD",
    },
    {
        name: "MXN",
    }
]

class WithdrawFiat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mount: true,
            stage: 0, // 0 
            publish: {
                message: '',
                topic: '',
            },
            wallet: {
                ewallet: "ewallet_4210219bc40014979eb9b594b006abe8", //  ""
                phone: "+525512345678"    // ""
            },
            token: {
                label: "USD",
                value: "USD"
            },
            amount: "0"
        }
        reactAutobind(this)
        this.axios = require('axios');
        this.source = this.axios.CancelToken.source();
        this.scanner = null
        this.mount = true
        this.scanFlag = true
    }

    static contextType = ContextModule;

    componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            this.mount = true
            this.scanFlag = true
            this.mount && this.setState({
                mount: true,
                stage: 0, // 0 
                publish: {
                    message: '',
                    topic: '',
                },
                wallet: {
                    ewallet: "", //  ""
                    phone: ""    // ""
                },
                token: {
                    label: "USD",
                    value: "USD"
                },
                amount: "0"
            })
            this.getBalanceRapyd()
        })
        this.props.navigation.addListener('blur', async () => {
            this.mount = false
            this.scanFlag = false
            this.setState({
                mount: true,
                stage: 0, // 0 
                publish: {
                    message: '',
                    topic: '',
                },
                wallet: {
                    ewallet: "", //  ""
                    phone: ""    // ""
                },
                token: {
                    label: "USD",
                    value: "USD"
                },
                amount: "0"
            })
        })
    }

    async componentWillUnmount() {
        this.scanFlag = false
        this.setState({
            mount: true,
            stage: 0, // 0 
            publish: {
                message: '',
                topic: '',
            },
            wallet: {
                ewallet: "", //  ""
                phone: ""    // ""
            },
            token: {
                label: "USD",
                value: "USD"
            },
            amount: "0"
        })
    }

    async onSuccess(e) {
        if (e.data.substring(0, 8) === "ewallet_" && this.scanFlag) {
            this.scanFlag = false
            this.mount && this.setState({
                stage: 1,
                wallet: {
                    ewallet: e.data.split(",")[0],
                    phone: e.data.split(",")[1]
                }
            })
        }
    }

    async transfer() {
        if (this.state.token.label === "USD") {
            if (parseFloat(this.state.amount) > this.context.value.fiatBalanceUSD) {
                console.log("insufficient funds")
            }
            else {
                this.mount && this.setState({
                    stage: 3
                })
            }
        }
        else if (this.state.token.label === "MXN") {
            if (parseFloat(this.state.amount) > this.context.value.fiatBalanceMXN) {
                console.log("insufficient funds")
            }
            else {
                this.mount && this.setState({
                    stage: 3,
                })
            }
        }
    }

    async acceptAndSign() {
        this.mount && this.setState({
            stage: 4
        })
        this.axios({
            method: 'get',
            url: 'https://e9wzhv9k7d.execute-api.us-east-1.amazonaws.com/transfer',
            headers: {
                'ewallets': this.context.value.ewallet,
                'ewalletd': this.state.wallet.ewallet,
                'amount': this.state.amount,
                'currency': this.state.token.label
            },
            cancelToken: this.source.token
        })
            .then((response) => {
                this.axios({
                    method: 'get',
                    url: 'https://e9wzhv9k7d.execute-api.us-east-1.amazonaws.com/transaction-decide',
                    headers: {
                        'id': response.data.data.id,
                        'status': 'accept'
                    },
                    cancelToken: this.source.token
                })
                    .then(() => {
                        this.mount && this.setState({
                            stage: 5
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async maxSelected() {
        if (this.state.token.label === "USD") {
            this.mount && this.setState({
                amount: this.context.value.fiatBalanceUSD.toString()
            })
        }
        else if (this.state.token.label === "MXN") {
            this.mount && this.setState({
                amount: this.context.value.fiatBalanceMXN.toString()
            })
        }
    }

    clearKeyboard() {
        this.mount && this.setState({
            clear: true
        }, () => {
            this.mount && this.setState({
                clear: false
            })
        })
    }

    async getBalanceRapyd() {
        this.axios({
            method: 'get',
            url: 'https://e9wzhv9k7d.execute-api.us-east-1.amazonaws.com/get-account-balance',
            headers: {
                'ewallet': this.context.value.ewallet,
            },
            cancelToken: this.source.token
        })
            .then((response) => {
                if (response.data.data.accounts.length > 0) {
                    this.context.setValue({
                        phone: response.data.data.phone_number
                    })
                    response.data.data.accounts.forEach(element => {
                        if (element.currency === "MXN") {
                            this.context.setValue({
                                fiatBalanceMXN: element.balance
                            })
                        }
                        else if (element.currency === "USD") {
                            this.context.setValue({
                                fiatBalanceUSD: element.balance
                            })
                        }
                    });
                }
                else {

                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <View style={GlobalStyles.container} >
                <Header />
                {
                    <View style={{ position: "absolute", top: 9, left: 18 }} >
                        <Pressable onPress={() => this.props.navigation.navigate('FiatAccount')}>
                            <IconMC name="arrow-back-ios" size={36} color={"#32d180"} />
                        </Pressable>
                    </View >
                }
                {
                    this.state.stage === 0 &&
                    <View style={[GlobalStyles.mainSub, { flexDirection: "column", alignItems: "center", paddingTop: 20 }]}>
                        <View>
                            <Text style={{ textAlign: "center", color: "white", fontSize: 24, width: "80%" }}>
                            Scan your ewallet {"\n"} (only manager)
                            </Text>
                        </View>
                        <View>
                            <QRCodeScanner
                                containerStyle={{  }}
                                showMarker={false}
                                reactivate={true}
                                ref={(node) => { this.scanner = node }}
                                onRead={this.onSuccess}
                                topContent={<></>}
                                bottomContent={<></>}
                            />
                        </View>
                    </View>
                }
                {
                    this.state.stage === 1 &&
                    <View style={[GlobalStyles.mainSub, { flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }]}>
                        <Text style={{ textAlign: "center", width: "100%", fontSize: 26, fontFamily: "Helvetica", color: "white" }}>
                            To Ewallet:
                            {"\n"}
                            {
                                this.state.wallet.phone
                            }
                        </Text>
                        <View style={{ borderBottomWidth: 2, borderColor: "#32d180", width: "90%" }} />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                            <Picker
                                isRequired
                                buttonStyle={{ fontSize: 20, textAlign: "center", backgroundColor: "black" }}
                                itemLabelStyle={[{ fontSize: 20, textAlign: "center", color: "white" }]}
                                selectedValueStyle={[{ fontSize: 20, textAlign: "center", color: "white" }]}
                                iconWrapperStyle={{ backgroundColor: "black" }}
                                items={tokens.map((item, index) => ({ label: item.name, value: item.name }))}
                                selectedValue={this.state.token.value}
                                onSelection={
                                    (item) => {
                                        if (JSON.stringify(item) !== JSON.stringify(this.state.token)) {
                                            this.mount && this.setState({
                                                token: item,
                                                amount: "0"
                                            });
                                        }

                                    }
                                }
                            />
                            <Text style={{ fontSize: 36, fontFamily: "Helvetica", color: "white" }}>
                                {
                                    this.state.amount.substring(0, this.state.amount.indexOf(".") === -1 ? this.state.amount.length : this.state.amount.indexOf(".") + 6)
                                }
                            </Text>
                            <Pressable style={{ paddingTop: 6 }} onPress={() => this.maxSelected()}>
                                <Text style={{ fontSize: 24, fontFamily: "Helvetica", color: "white" }}>
                                    max{"   "}
                                </Text>
                            </Pressable>
                        </View>
                        <VirtualKeyboard
                            style={{ marginTop: -20 }}
                            rowStyle={{
                                width: Dimensions.get('window').width,
                            }}
                            cellStyle={
                                {
                                    height: Dimensions.get('window').width / 8,
                                    borderWidth: 1,
                                    margin: 1,
                                }
                            }
                            colorBack={'black'}
                            color='white'
                            pressMode='string'
                            decimal
                            onPress={(val) => this.mount && this.setState({ amount: val })}
                            clear={this.state.clear}
                        />
                        <Pressable disabled={this.state.loading} style={[GlobalStyles.button, { marginTop: 10 }]} onPress={async () => {
                            this.mount && this.setState({
                                loading: true
                            })
                            this.transfer()
                        }}>
                            <Text style={[GlobalStyles.buttonText]}>
                                {
                                    this.state.loading ? "Checking..." : "Send"
                                }
                            </Text>
                        </Pressable>
                    </View>
                }
                {
                    this.state.stage === 3 &&
                    <FiatSign transaction={this.state.transaction} signTrans={(e) => this.acceptAndSign(e)} cancelTrans={(e) => console.log(e)} />
                }
                {
                    this.state.stage === 4 &&
                    <View style={[GlobalStyles.mainSub, { flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", paddingTop: 20 }]}>
                        <Icon name="timer-sand" size={240} color="#32d180" />
                        <Text style={{ textAlign: "center", color: "white", fontSize: 30, width: "80%" }}>
                            Waiting Confirmation...
                        </Text>
                        <Text style={{ textAlign: "center", color: "white", fontSize: 30, width: "80%" }}>
                            Amount: {this.state.amount}{" "}{this.state.token.label}
                        </Text>
                    </View>
                }
                {
                    this.state.stage === 5 &&
                    <View style={[GlobalStyles.mainSub, { flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }]}>
                        <Icon2 name="check-circle" size={240} color="#32d180" />
                        <Text style={{
                            textShadowRadius: 1,
                            fontSize: 28, fontWeight: "bold", color: "white"
                        }}>
                            Completed
                        </Text>
                        <Pressable style={[GlobalStyles.button]} onPress={() => {
                            this.props.navigation.navigate('FiatAccount')
                        }}>
                            <Text style={[GlobalStyles.buttonText]}>
                                Done
                            </Text>
                        </Pressable>
                    </View>
                }
            </View >
        );
    }
}

export default WithdrawFiat;