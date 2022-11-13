// Basic Imports
import React, { Component } from 'react';
import { Text, View, Pressable, Image, Dimensions, Animated, ScrollView } from 'react-native';
// Components Local
import Footer from './components/footer';
import Header from './components/header';
import Chart from "./fiatAccountComponents/chart"
// Assets
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconAD from 'react-native-vector-icons/AntDesign';
import usd from "../assets/usd.png"
import mxn from "../assets/mxn.png"
// Utils 
import reactAutobind from 'react-autobind';
// Utils Local
import ContextModule from '../utils/contextModule';
// Styles
import GlobalStyles from '../styles/styles';

function epsilonRound(num, zeros = 4) {
    return Math.round((num + Number.EPSILON) * Math.pow(10, zeros)) / Math.pow(10, zeros)
}

class FiatAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone_number: "",
            show: false
        };
        reactAutobind(this)
        this.axios = require('axios');
        this.source = this.axios.CancelToken.source();
        this.mount = true
    }

    static contextType = ContextModule;

    async componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            this.mount = true
            this.mount && this.setState({

            })
            this.getBalanceRapyd()
        })
        this.props.navigation.addListener('blur', () => {
            this.mount = false
            this.setState({

            })
        })
    }

    componentWillUnmount() {
        this.mount = false
    }

    async getBalanceRapyd() {
        this.context.value.ewallet !== "" &&
            this.axios({
                method: 'get',
                url: 'https://e9wzhv9k7d.execute-api.us-east-1.amazonaws.com/get-account-balance',
                headers: {
                    'ewallet': this.context.value.ewallet,
                },
                cancelToken: this.source.token
            })
                .then((response) => {
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
                })
                .catch((error) => {
                    console.log(error);
                });
    }

    render() {
        return (
            <>
                <View style={GlobalStyles.container}>
                    <Header />
                    {
                        this.context.value.ewallet === "" ?
                            <View style={[GlobalStyles.main, { flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", paddingTop: 10 }]}>
                                <Text style={{ textAlign: "center", color: "white", fontSize: 30 }}>
                                    Complete KYC form{"\n"}to unlock this feature
                                </Text>
                                <Pressable style={[GlobalStyles.button, { width: "90%", marginTop: 30, alignSelf: "center" }]} onPress={async () => {
                                    this.context.setValue({
                                        kyc: true
                                    })
                                    setTimeout(() => {
                                        this.props.navigation.navigate('Setup')
                                    }, 1000)
                                }}>
                                    <Text style={[GlobalStyles.buttonText]}>
                                        Fill KYC
                                    </Text>
                                </Pressable>
                            </View>
                            :
                            <View style={[GlobalStyles.main, { flexDirection: "column", alignItems: "center", paddingTop: 10 }]}>
                                <View style={{ borderBottomWidth: 0.5, borderColor: "black", width: "100%" }}>
                                    <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>
                                        Rapyd Ewallet
                                    </Text>
                                    <Pressable onPress={() =>
                                        this.context.setValue({
                                            show: !this.context.value.show
                                        })
                                    }>
                                        <Text style={{ textAlign: "center", color: "white", fontSize: 30, width: "100%" }}>
                                            {
                                                this.context.value.show ? this.context.value.phone : this.context.value.phone.substring(0, 3) + "..." + this.context.value.phone.substring(this.context.value.phone.length - 2, this.context.value.phone.length)
                                            }
                                        </Text>
                                    </Pressable>
                                </View>
                                <View style={{ backgroundColor: "#78d64b", height: 2, width: "90%", marginVertical: 10 }} />
                                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>
                                        Balance
                                    </Text>
                                    <Pressable onPress={() =>
                                        this.context.setValue({
                                            show: !this.context.value.show
                                        })
                                    }>
                                        <Text style={{ fontSize: 30, color: 'white' }}>
                                            {"$ "}
                                            {
                                                this.context.value.show ? epsilonRound(this.context.value.fiatBalanceUSD + this.context.value.fiatBalanceMXN / 20, 2) : "***"
                                            }
                                            {" USD"}
                                        </Text>
                                    </Pressable>
                                    <View style={{ flexDirection: "row", marginVertical: 10 }}>
                                        <Pressable style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", width: "25%" }} onPress={() => this.props.navigation.navigate('DepositFiat')}>
                                            <View style={{ backgroundColor: "#78d64b", width: 40, height: 40, justifyContent: "center", alignItems: "center", borderRadius: 500 }}>
                                                <IconAD name="pluscircleo" size={24} color="white" />
                                            </View>
                                            <Text style={{ fontSize: 16, color: "white" }}>
                                                Deposit
                                            </Text>
                                        </Pressable>
                                        <Pressable style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", width: "25%" }} onPress={() => this.props.navigation.navigate('FiatTransactions')}>
                                            <View style={{ backgroundColor: "#78d64b", width: 40, height: 40, justifyContent: "center", alignItems: "center", borderRadius: 500 }}>
                                                <IconMI name="receipt-long" size={24} color="white" />
                                            </View>
                                            <Text style={{ fontSize: 16, color: "white" }}>
                                                Transactions
                                            </Text>
                                        </Pressable>
                                        <Pressable style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", width: "25%" }} onPress={() => this.props.navigation.navigate('CashOut')}>
                                            <View style={{ backgroundColor: "#78d64b", width: 40, height: 40, justifyContent: "center", alignItems: "center", borderRadius: 500 }}>
                                                <IconAD name="creditcard" size={24} color="white" />
                                            </View>
                                            <Text style={{ fontSize: 16, color: "white" }}>
                                                Cashout
                                            </Text>
                                        </Pressable>
                                        <Pressable style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", width: "25%" }} onPress={() => this.props.navigation.navigate('WithdrawFiat')}>
                                            <View style={{ backgroundColor: "#78d64b", width: 40, height: 40, justifyContent: "center", alignItems: "center", borderRadius: 500 }}>
                                                <IconAD name="minuscircleo" size={24} color="white" />
                                            </View>
                                            <Text style={{ fontSize: 16, color: "white" }}>
                                                Pay
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: "#78d64b", height: 2, width: "90%", marginVertical: 10 }} />
                                <View style={{ height: "16%" }}>
                                    <ScrollView persistentScrollbar>
                                        {
                                            this.context.value.fiatBalanceUSD > 0 &&
                                            <>
                                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                                    <View style={{ width: "33.33%" }}>
                                                        <Image source={usd} style={{ width: 20, height: 20, alignSelf: 'center' }} />
                                                    </View>
                                                    <Text style={{ fontSize: 20, color: 'white', width: "33.33%", textAlign: "center" }} >
                                                        USD
                                                    </Text>
                                                    <Text style={{ fontSize: 20, color: 'white', width: "33.33%", textAlign: "center" }} >
                                                        {
                                                            " $"
                                                        }
                                                        {
                                                            this.context.value.show ? epsilonRound(this.context.value.fiatBalanceUSD, 2).toString() : "***"
                                                        }
                                                        {
                                                            " "
                                                        }
                                                    </Text>
                                                </View>
                                            </>
                                        }
                                        {
                                            this.context.value.fiatBalanceMXN > 0 &&
                                            <>
                                                {
                                                    this.context.value.fiatBalanceUSD > 0 &&
                                                    <View style={{ backgroundColor: "#78d64b55", height: 0.5, width: Dimensions.get("window").width * 0.9, marginVertical: 8, alignSelf: "center" }} />
                                                }
                                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                                    <View style={{ width: "33.33%" }}>
                                                        <Image source={mxn} style={{ width: 20, height: 20, alignSelf: 'center' }} />
                                                    </View>
                                                    <Text style={{ fontSize: 20, color: 'white', width: "33.33%", textAlign: "center" }} >
                                                        MXN
                                                    </Text>
                                                    <Text style={{ fontSize: 20, color: 'white', width: "33.33%", textAlign: "center" }} >
                                                        {
                                                            " $"
                                                        }
                                                        {
                                                            this.context.value.show ? this.context.value.fiatBalanceMXN + " \n($" + epsilonRound(this.context.value.fiatBalanceMXN / 20, 2).toString() + " USD)" : "***"
                                                        }
                                                        {
                                                            " "
                                                        }
                                                    </Text>
                                                </View>
                                            </>
                                        }
                                    </ScrollView>
                                </View>
                                <View style={{ backgroundColor: "#78d64b", height: 2, width: "90%", marginVertical: 10 }} />
                                <Chart size={300} data={[this.context.value.fiatBalanceUSD, this.context.value.fiatBalanceMXN / 20]} dataColors={["#b22234", "#006847"]} dataLabels={["USD", "MXN"]} dataMultipliers={[1, 20]} dataIcons={[usd]} show={this.context.value.show} />
                            </View>
                    }
                    <Footer navigation={this.props.navigation} />
                </View>
            </>
        );
    }
}

export default FiatAccount;