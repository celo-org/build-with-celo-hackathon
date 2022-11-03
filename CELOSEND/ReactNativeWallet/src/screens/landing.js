// Basic Imports
import React, { Component } from 'react';
import { Image, ScrollView, Text, View, ActivityIndicator, Pressable } from 'react-native';
// Components Local
import Header from './components/header';
import Footer from './components/footer';
// Utils 
import reactAutobind from 'react-autobind';
// Utils Local
import ContextModule from '../utils/contextModule';
// Styles
import GlobalStyles from '../styles/styles';

import { NODE_ENV_CELO_RCP, NODE_ENV_CHAINLINK_FEED_CONTRACT, NODE_ENV_DATA_FEEDS_RCP } from "../../env"

// Price Feeds Contract
import { abiFeeds } from "../contracts/priceFeedContract"
import { abiERC20 } from "../contracts/erc20"
// Price Feeds Assets
import avax from "../assets/FeedAssets/avax.png"
import bnb from "../assets/FeedAssets/bnb.png";
import btc from "../assets/FeedAssets/btc.png";
import celos from "../assets/celo-token-icon.png";
import celosusd from "../assets/cusd-token-y.png"
import dot from "../assets/FeedAssets/polkadot.png"
import eth from "../assets/FeedAssets/eth.png";
import link from "../assets/FeedAssets/link.png";
import matic from "../assets/FeedAssets/polygon.png";
import neo from "../assets/FeedAssets/neo.png"
import sol from "../assets/FeedAssets/sol.png";
import usdc from "../assets/FeedAssets/usdc.png";
import xrp from "../assets/FeedAssets/xrp.png"
// Chainlink Price feeds
import Web3 from 'web3';

function epsilonRound(num) {
    const zeros = 2;
    return Math.round((num + Number.EPSILON) * Math.pow(10, zeros)) / Math.pow(10, zeros)
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

async function getCELOusd() {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://api.coingecko.com/api/v3/simple/price?ids=celo-dollar&vs_currencies=usd", requestOptions)
            .then(response => response.text())
            .then(result => resolve(JSON.parse(result)["celo-dollar"].usd))
            .catch(error => console.log('error', error));
    })
}

const CUSDaddress = "0x765DE816845861e75A25fCA122bb6898B8B1282a"

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Price Feeds
            avax: 0,
            bnb: 0,
            btc: 0,
            dot: 0,
            eth: 0,
            link: 0,
            matic: 0,
            neo: 0,
            sol: 0,
            usdc: 0,
            xrp: 0,
            prices: [],
            symbol: ["AVAX", "BNB", "BTC","CELO", "CELO-USD",  "DOT", "ETH", "LINK", "MATIC", "NEO", "SOL", "USDC", "XRP"],
            icons: [avax, bnb, btc,celos, celosusd, dot, eth, link, matic, neo, sol, usdc, xrp],
        };
        reactAutobind(this)
        this.axios = require('axios');
        this.source = this.axios.CancelToken.source();
        this.web3 = new Web3(NODE_ENV_CELO_RCP)
        this.web3Feeds = new Web3(NODE_ENV_DATA_FEEDS_RCP)
        this.interval = null
        this.mount = true
        this.flag = true
        this.contract = new this.web3Feeds.eth.Contract(abiFeeds, NODE_ENV_CHAINLINK_FEED_CONTRACT)
    }

    static contextType = ContextModule;

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.interval = null
            this.mount = true
            this.flag = true
            this.getBalanceRapyd()
            this.web3.eth.getBalance(this.context.value.account).then((res) => {
                this.context.setValue({
                    celoBalance: this.web3.utils.fromWei(res, 'ether'),
                })
            })
            this.getBalanceToken(this.context.value.account, CUSDaddress).then((res) => {
                this.context.setValue({
                    CUSDBalance: res,
                })
            })
            this.updatePriceFeeds()
            this.interval = setInterval(async () => {
                if (this.flag) {
                    this.flag = false
                    await this.updatePriceFeeds()
                    this.flag = true
                }
            }, 1000);
        })
        this.props.navigation.addListener('blur', () => {
            this.setState({

            })
            this.mount = false
            this.flag = false
            clearInterval(this.interval)
        })
    }

    componentWillUnmount() {
        this.mount = false
        clearInterval(this.interval)
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

    async getBalanceToken(address, tokenAddress) {
        return new Promise(async (resolve, reject) => {
            const contract = new this.web3.eth.Contract(abiERC20, tokenAddress)
            let res = await contract.methods.balanceOf(address).call()
            let decimals = await contract.methods.decimals().call()
            resolve(res / (Math.pow(10, decimals)))
        })
    }

    async updatePriceFeeds() {
        let [
            priceAVAX,
            priceBNB,
            priceBTC,
            priceDOT,
            priceETH,
            priceLINK,
            priceMATIC,
            priceNEO,
            priceSOL,
            priceUSDC,
            priceXRP
        ] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        try {
            [
                priceAVAX,
                priceBNB,
                priceBTC,
                priceDOT,
                priceETH,
                priceLINK,
                priceMATIC,
                priceNEO,
                priceSOL,
                priceUSDC,
                priceXRP
            ] = await Promise.all(
                [
                    this.contract.methods.getLatestAVAXPrice().call(),
                    this.contract.methods.getLatestBNBPrice().call(),
                    this.contract.methods.getLatestBTCPrice().call(),
                    this.contract.methods.getLatestDOTPrice().call(),
                    this.contract.methods.getLatestETHPrice().call(),
                    this.contract.methods.getLatestLINKPrice().call(),
                    this.contract.methods.getLatestMATICPrice().call(),
                    this.contract.methods.getLatestNEOPrice().call(),
                    this.contract.methods.getLatestSOLPrice().call(),
                    this.contract.methods.getLatestUSDCPrice().call(),
                    this.contract.methods.getLatestXRPPrice().call()
                ]);
        }
        catch (e) {
            console.log(e)
        }
        const celo = await getCELO()
        const celoDollar = await getCELOusd()
        this.context.setValue({
            celoUSD: parseFloat((celo)),
            celoDollarUSD: parseFloat((celoDollar)),
        })
        this.context.setValue({
            ethUSD: parseFloat((priceETH).toString()) / 100000000
        })
        let prices = {
            avax: parseFloat((priceAVAX).toString()) / 100000000,
            bnb: parseFloat((priceBNB).toString()) / 100000000,
            btc: parseFloat((priceBTC).toString()) / 100000000,
            dot: parseFloat((priceDOT).toString()) / 100000000,
            eth: parseFloat((priceETH).toString()) / 100000000,
            link: parseFloat((priceLINK).toString()) / 100000000,
            matic: parseFloat((priceMATIC).toString()) / 100000000,
            neo: parseFloat((priceNEO).toString()) / 100000000,
            sol: parseFloat((priceSOL).toString()) / 100000000,
            usdc: parseFloat((priceUSDC).toString()) / 100000000,
            xrp: parseFloat((priceXRP).toString()) / 100000000,
        }
        this.mount && this.setState({
            prices: [
                epsilonRound(prices.avax),
                epsilonRound(prices.bnb),
                epsilonRound(prices.btc),
                epsilonRound(celo),
                epsilonRound(celoDollar),
                epsilonRound(prices.dot),
                epsilonRound(prices.eth),
                epsilonRound(prices.link),
                epsilonRound(prices.matic),
                epsilonRound(prices.neo),
                epsilonRound(prices.sol),
                prices.usdc,
                epsilonRound(prices.xrp),
            ],
        })
    }

    render() {
        return (
            <>
                <View style={GlobalStyles.container}>
                    <Header />
                    <View style={GlobalStyles.mainSub}>
                        <View style={{ height: "20%", marginTop: 30 }}>
                            <Text style={{ textAlign: "center", color: "white", fontSize: 24 }}>
                                Total Balance
                            </Text>
                            <Pressable onPress={() =>
                                this.context.setValue({
                                    show: !this.context.value.show
                                })
                            }>
                                <Text style={{ textAlign: "center", color: "white", fontSize: 36 }}>
                                    {"$ "}
                                    {
                                        this.context.value.show ? epsilonRound
                                            (
                                                this.context.value.celoBalance * this.context.value.celoUSD +
                                                this.context.value.CUSDBalance +
                                                this.context.value.fiatBalanceUSD +
                                                this.context.value.fiatBalanceMXN / 20
                                                , 2
                                            )
                                            :
                                            "***"
                                    }
                                    {" USD"}
                                </Text>
                            </Pressable>
                            <View style={{ backgroundColor: "#32d180", height: 1, width: "90%", alignSelf: "center", marginTop: 30 }} />
                        </View>
                        <View style={{ height: "70%", marginTop: -30 }}>
                            <Text style={{ textAlign: "center", color: "white", fontSize: 24 }}>
                                Markets
                            </Text>
                            {
                                this.state.prices.length === 0 ?
                                    <View style={{ marginTop: "50%" }}>
                                        <ActivityIndicator size={60} color="#32d180" />
                                    </View>
                                    :
                                    <ScrollView>
                                        {
                                            this.state.prices.map((price, index) => {
                                                return (
                                                    <View key={"Feed:" + index} style={[{ width: "100%" }]}>
                                                        <View style={{ marginVertical: 10, marginHorizontal: 20, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "#32d180", height: 50, borderRadius: 100 }}>
                                                            <Text style={{ color: "white", width: "33.33%", textAlign: "center", fontSize: 18 }}>
                                                                {
                                                                    this.state.symbol[index]
                                                                }
                                                            </Text>
                                                            <View style={{ width: "33.33%" }}>
                                                                <Image source={this.state.icons[index]} style={{ width: 30, height: 30, alignSelf: "center" }} />
                                                            </View>
                                                            <Text style={{ color: "white", width: "33.33%", textAlign: "center", fontSize: 18 }}>
                                                                ${price}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </ScrollView>
                            }
                        </View>
                    </View>
                </View>
                <Footer navigation={this.props.navigation} />
            </>
        );
    }
}

export default Landing;