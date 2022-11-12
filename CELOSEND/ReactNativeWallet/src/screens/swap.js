// Basic Imports
import React, { Component } from 'react';
import { Text, View, Pressable, Image, Dimensions, Animated, ScrollView, TextInput } from 'react-native';
import Footer from './components/footer';
import Header from './components/header';
// Crypto
import Web3 from 'web3';
// Contracts
import { abiFeeds } from "../contracts/priceFeedContract"
// Assets
import Icon from 'react-native-vector-icons/MaterialIcons';
// Utils 
import reactAutobind from 'react-autobind';
// Utils Local
import ContextModule from '../utils/contextModule';
// Styles
import GlobalStyles from '../styles/styles';

import { NODE_ENV_CELO_RCP, NODE_ENV_CELO_API_APIKEY, NODE_ENV_CHAINLINK_FEED_CONTRACT } from "../../env"

function epsilonRound(num, zeros = 4) {
    return Math.round((num + Number.EPSILON) * Math.pow(10, zeros)) / Math.pow(10, zeros)
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

async function getCELO() {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://api.coingecko.com/api/v3/simple/price?ids=celo&vs_currencies=usd", requestOptions)
            .then(response => response.text())
            .then(result => resolve(JSON.parse(result).celo.usd))
            .catch(error => console.log('error', error));
    })
}

class Swap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from: 0,
            to: 0,
            flag: false // true -> fiat to crypto // false -> crypto to fiat
        };
        reactAutobind(this)
        this.web3 = new Web3(NODE_ENV_CELO_RCP)
        this.contract = new this.web3.eth.Contract(abiFeeds, NODE_ENV_CHAINLINK_FEED_CONTRACT)
        this.mount = true
    }

    static contextType = ContextModule;

    async componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            this.mount = true
            const celo = await getCELO()
            this.context.setValue({
                celoUSD: parseFloat((celo)),
            })
            this.mount && this.setState({

            })
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
                                <Text style={{ textAlign: "center", color: "white", fontSize: 24 }}>
                                    Swap
                                </Text>
                                <View style={{ backgroundColor: "#32d180", height: 2, width: "90%", marginVertical: 10 }} />
                                <Text style={{ textAlign: "center", color: "white", fontSize: 30 }}>
                                    {
                                        this.state.flag ? "USD" : "Celo"
                                    }
                                </Text>
                                <TextInput
                                    style={{ fontSize: 24, textAlign: "center", borderRadius: 6, backgroundColor: 'white', color: "black", width: "100%", marginVertical: 20, borderWidth: 1, borderColor: "#32d180" }}
                                    keyboardType="number-pad"
                                    value={this.state.from.toString()}
                                    onChangeText={(value) => {
                                        if (value === "") {
                                            this.mount && this.setState({
                                                from: "",
                                                to: 0
                                            })
                                        }
                                        else {
                                            this.mount && this.setState({
                                                from: value,
                                                to: this.state.flag ? parseFloat(value) * this.context.value.celoUSD : epsilonRound(parseFloat(value) / this.context.value.celoUSD, 2)
                                            })
                                        }
                                    }}
                                />
                                <Pressable style={{ width: 40, height: 40, backgroundColor: "#32d180", borderRadius: 100, alignItems: "center", justifyContent: "center" }} onPress={() => {
                                    let from = this.state.to
                                    let to = this.state.from
                                    this.mount && this.setState({
                                        from,
                                        to: to === "" ? 0 : to,
                                        flag: !this.state.flag
                                    })
                                }}>
                                    <Icon name="swap-vert" size={24} color="white" />
                                </Pressable>
                                <TextInput
                                    editable={false}
                                    selectTextOnFocus={false}
                                    style={{ fontSize: 24, textAlign: "center", borderRadius: 6, backgroundColor: 'white', color: "black", width: "100%", marginVertical: 20, borderWidth: 1, borderColor: "#32d180" }}
                                    value={this.state.to.toString()}
                                />
                                <Text style={{ textAlign: "center", color: "white", fontSize: 30 }}>
                                    {
                                        this.state.flag ? "Celo" : "USD"
                                    }
                                </Text>
                            </View>
                    }
                    <Footer navigation={this.props.navigation} />
                </View>
            </>
        );
    }
}

export default Swap;