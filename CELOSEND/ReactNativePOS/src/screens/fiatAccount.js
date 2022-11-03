// Basic Imports
import React, { Component } from 'react';
import { Text, View, Pressable, Image, Dimensions, Animated, ScrollView } from 'react-native';
// Components Local
import Footer from './components/footer';
import Header from './components/header';
import Chart from "./fiatAccountComponents/chart"
// Assets
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
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
            <>
                <View style={GlobalStyles.container}>
                    <Header />
                    <View style={{ position: "absolute", top: 9, left: 18 }}>
                        <Pressable style={{ alignSelf: "center" }} onPress={() => this.props.navigation.navigate('FiatTransactions')}>
                            <IconMI name="receipt-long" size={24} color={"#FFC000"} />
                        </Pressable>
                        <Text style={{ color: "white" }}>
                            Transactions
                        </Text>
                    </View>
                    <View style={{ position: "absolute", top: 9, right: 18 }}>
                        <Pressable style={{ alignSelf: "center" }} onPress={() => this.props.navigation.navigate('WithdrawFiat')}>
                            <IconMCI name="cash-fast" size={24} color={"#FFC000"} />
                        </Pressable>
                        <Text style={{ color: "white" }}>
                            Withdraw
                        </Text>
                    </View>
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
                                <Text style={{ textAlign: "center", color: "white", fontSize: 20, width: "100%" }}>
                                    {
                                        this.context.value.show ? this.context.value.phone : this.context.value.phone.substring(0, 3) + "..." + this.context.value.phone.substring(this.context.value.phone.length - 2, this.context.value.phone.length)
                                    }
                                </Text>
                            </Pressable>
                        </View>
                        <View style={{ backgroundColor: "#32d180", height: 2, width: "90%", marginVertical: 10 }} />
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
                        </View>
                        <View style={{ backgroundColor: "#32d180", height: 2, width: "90%", marginVertical: 10 }} />
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
                                            <View style={{ backgroundColor: "#32d18055", height: 0.5, width: Dimensions.get("window").width * 0.9, marginVertical: 8, alignSelf: "center" }} />
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
                        <View style={{ backgroundColor: "#32d180", height: 2, width: "90%", marginVertical: 10 }} />
                        <Chart size={180} data={[this.context.value.fiatBalanceUSD, this.context.value.fiatBalanceMXN / 20]} dataColors={["#b22234", "#006847"]} dataLabels={["USD", "MXN"]} dataMultipliers={[1, 20]} dataIcons={[usd]} show={this.context.value.show} />
                    </View>
                    <Footer navigation={this.props.navigation} />
                </View>
            </>
        );
    }
}

export default FiatAccount;