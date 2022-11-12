import React, { Component } from 'react';
import { View, Text, ScrollView, Pressable, Dimensions, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import QRCodeScanner from 'react-native-qrcode-scanner';
import GlobalStyles from '../../styles/styles';
import Footer from '../components/footer';
import Header from '../components/header';
import IconMCI from 'react-native-vector-icons/MaterialIcons';
import reactAutobind from 'react-autobind';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import CryptoSign from './cryptoSign';
import ContextModule from '../../utils/contextModule';
import { Picker } from 'react-native-form-component';
import { abiERC20 } from "../../contracts/erc20"
import Web3 from 'web3';

import {NODE_ENV_CELO_RCP} from "../../../env"

function epsilonRound(num) {
    const zeros = 4;
    return Math.floor((num + Number.EPSILON) * Math.pow(10, zeros)) / Math.pow(10, zeros)
}

const tokens = [
    {
        name: "CELO",
        address: ""
    },
    {
        name: "CUSD",
        address: "0x765DE816845861e75A25fCA122bb6898B8B1282a"
    }
]

class WithdrawCrypto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 0,
            clear: false,
            token: {
                label: "CELO",
                value: ""
            },
            wallet: {
                kind: "ethereum",
                address: "0x",
                network: 42220
            },
            value: "0",
            transaction: null,
            hash: "",
            loading:false
        }
        reactAutobind(this)
        this.mount = true
        this.QRflag = true
        this.scanner = null
        this.web3 = new Web3(NODE_ENV_CELO_RCP)
        this.abiDecoder = require('abi-decoder')
    }

    static contextType = ContextModule;

    componentDidMount() {
        this.abiDecoder.addABI(abiERC20)
        this.props.navigation.addListener('focus', () => {
            this.QRflag = true
            this.mount = true
        })
        this.props.navigation.addListener('blur', () => {
            this.QRflag = false
            this.mount = false
            this.setState({
                stage: 0,
                clear: false,
                token: {
                    label: "CELO",
                    value: ""
                },
                wallet: {
                    kind: "ethereum",
                    address: "0x",
                    network: 42220
                },
                value: "0",
                transaction: null,
                hash: "",
                loading:false
            })
        })
    }

    async onSuccess(e) {
        if (e.data.substring(0, 3) === "wc:" && this.QRflag) {
            this.QRflag = false
            console.log("WC")
            console.log(e.data)
        }
        else if (e.data.substring(0, 2) === "0x" && this.QRflag) {
            this.QRflag = false
            let temp = {
                kind: "ethereum",
                address: e.data,
                network: 42220
            }
            this.setState({
                wallet: temp,
                stage: 1
            })
        }
        else if (e.data.substring(0, 9) === "ethereum:" && this.QRflag) {
            this.QRflag = false
            let temp = {
                kind: e.data.split(":")[0],
                address: e.data.split(":")[1].split("@")[0],
                network: parseInt(e.data.split(":")[1].split("@")[1])
            }
            this.setState({
                wallet: temp,
                stage: 1
            })
        }
    }

    clearKeyboard() {
        this.setState({
            clear: true
        }, () => {
            this.setState({
                clear: false
            })
        })
    }

    async changeText(val) {
        this.setState({
            value: val
        });
    }

    async acceptAndSign(signedTx) {
        console.log("send")
        this.setState({
            stage: 3
        })
        this.web3.eth.sendSignedTransaction(signedTx.rawTransaction, (error, hash) => {
            if (!error) {
                this.setState({
                    hash
                })
                let interval = null
                interval = setInterval(() => {
                    this.web3.eth.getTransactionReceipt(hash, async (err, rec) => {
                        if (rec) {
                            this.setState({
                                stage: 4
                            })
                            clearInterval(interval)
                        }
                        else {
                            console.log(".")
                        }
                    });
                }, 1000);
            } else {
                console.log("❗Something went wrong while submitting your transaction:", error)
            }
        })
    }

    async transfer() {
        let transaction = {
            from: this.context.value.account,
            to: this.state.wallet.address,
            data: "0x",
            value: this.web3.utils.toHex(this.web3.utils.toWei(this.state.value, "ether")),
        }
        const gas = await this.web3.eth.estimateGas(transaction)
        const gasPrice = await this.web3.eth.getGasPrice()
        const value = this.web3.utils.toHex(this.web3.utils.toWei(this.state.value, "ether") - gas * gasPrice)
        transaction = { ...transaction, gas, value: value - gas * gasPrice }
        if (parseFloat(value) > parseFloat(this.context.value.celoBalance)) {
            console.log("insufficient funds")
        }
        else {
            this.setState({
                transaction,
                stage: 2
            })
        }
    }

    async transferToken(tokenAddress) {
        const contract = new this.web3.eth.Contract(abiERC20, tokenAddress, { from: this.context.value.account })
        let decimals = await contract.methods.decimals().call()
        let transaction = {
            to: tokenAddress,
            from: this.context.value.account,
            data: contract.methods.transfer(this.state.wallet.address, this.web3.utils.toHex(parseInt(parseFloat(this.state.value) * Math.pow(10, decimals)))).encodeABI()
        }
        const decodedData = this.abiDecoder.decodeMethod(transaction.data);
        const gas = await contract.methods.transfer(decodedData.params[0].value, this.web3.utils.toHex(decodedData.params[1].value)).estimateGas({ 'from': this.context.value.account })
        const gasPrice = await this.web3.eth.getGasPrice()
        transaction = { ...transaction, gas }
        console.log({ gas: (gas * gasPrice), balance: this.web3.utils.toWei(this.context.value.celoBalance, "ether") })
        if ((gas * gasPrice) > this.web3.utils.toWei(this.context.value.celoBalance, "ether")){
            console.log("insufficient funds")
        }
        else {
            this.setState({
                transaction,
                stage: 2
            })
        }
        this.setState({
            loading:false
        })
    }

    async transfer() {
        let transaction = {
            from: this.context.value.account,
            to: this.state.wallet.address,
            data: "0x",
            value: this.web3.utils.toHex(this.web3.utils.toWei(this.state.value, "ether")),
        }
        const gas = await this.web3.eth.estimateGas(transaction)
        const gasPrice = await this.web3.eth.getGasPrice()
        if (parseFloat(this.web3.utils.toHex(this.web3.utils.toWei(this.state.value, "ether"))) === parseFloat(this.context.value.celoBalance)) {
            transaction = { ...transaction, gas, value: value - (gas * gasPrice) }
        }
        else {
            transaction = { ...transaction, gas }
        }
        console.log({ value: this.state.value, balance: this.context.value.celoBalance })
        if (parseFloat(this.web3.utils.toHex(this.web3.utils.toWei(this.state.value, "ether") + gas * gasPrice)) > parseFloat(this.context.value.celoBalance)) {
            console.log("insufficient funds")
        }
        else {
            this.mount && this.setState({
                transaction,
                stage: 2,
            })
        }
    }

    async transferToken(tokenAddress) {
        const contract = new this.web3.eth.Contract(abiERC20, tokenAddress, { from: this.context.value.account })
        let decimals = await contract.methods.decimals().call()
        let transaction = {
            to: tokenAddress,
            from: this.context.value.account,
            data: contract.methods.transfer(this.state.wallet.address, this.web3.utils.toHex(parseInt(parseFloat(this.state.value) * Math.pow(10, decimals)))).encodeABI()
        }
        const decodedData = this.abiDecoder.decodeMethod(transaction.data);
        const gas = await contract.methods.transfer(decodedData.params[0].value, this.web3.utils.toHex(decodedData.params[1].value)).estimateGas({ 'from': this.context.value.account })
        const gasPrice = await this.web3.eth.getGasPrice()
        transaction = { ...transaction, gas }
        console.log({ gas: (gas * gasPrice), balance: this.web3.utils.toWei(this.context.value.celoBalance, "ether") })
        if ((gas * gasPrice) > this.web3.utils.toWei(this.context.value.celoBalance, "ether")) {
            console.log("insufficient funds")
        }
        else {
            this.mount && this.setState({
                transaction,
                stage: 2,
            })
        }
        this.mount && this.setState({
            loading: false
        })
    }

    async maxSelected(token) {
        if (token.label === "CELO") {
            this.mount && this.setState({
                value: this.context.value.celoBalance
            })
        }
        else if (token.label === "CUSD") {
            this.mount && this.setState({
                value: this.context.value.CUSDBalance
            })
        }
    }

    render() {
        return (
            <View style={GlobalStyles.container}>
                <Header />
                {
                    <View style={{ position: "absolute", top: 9, left: 18 }}>
                        <Pressable onPress={() => this.props.navigation.navigate('CryptoAccount')}>
                            <IconMCI name="arrow-back-ios" size={36} color={"#32d180"} />
                        </Pressable>
                    </View>
                }
                {
                    this.state.stage === 0 &&
                    <View style={[GlobalStyles.mainSub, { flexDirection: "column", alignItems: "center", paddingTop: 20 }]}>
                        <Text style={{ textAlign: "center", width: "100%", fontSize: 24, fontFamily: "Helvetica", color: "white" }}>
                            Scan your wallet {"\n"} (only manager)
                        </Text>
                        <QRCodeScanner
                            containerStyle={{ marginTop: 60 }}
                            showMarker={false}
                            reactivate={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                            topContent={<></>}
                            bottomContent={<></>}
                        />
                    </View>
                }
                {
                    this.state.stage === 1 &&
                    <View style={[GlobalStyles.mainSub, { flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }]}>
                        <Text style={{ textAlign: "center", width: "100%", fontSize: 20, fontFamily: "Helvetica", color: "white" }}>
                            Celo Address:
                            {"\n"}
                            {
                                this.state.wallet.address.substring(0, 21)
                            }
                            {"\n"}
                            {
                                this.state.wallet.address.substring(21, 42)
                            }
                        </Text>
                        <View style={{ borderBottomWidth: 2, borderColor: "#32d180", width: "90%" }} />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 30 }}>
                            <Picker
                                isRequired
                                buttonStyle={{ fontSize: 20, textAlign: "center", backgroundColor: "black" }}
                                itemLabelStyle={[{ fontSize: 20, textAlign: "center", color: "white" }]}
                                selectedValueStyle={[{ fontSize: 20, textAlign: "center", color: "white" }]}
                                iconWrapperStyle={{ backgroundColor: "black" }}
                                items={tokens.map((item, index) => ({ label: item.name, value: item.address }))}
                                selectedValue={this.state.token.value}
                                onSelection={
                                    (item) => {
                                        if (JSON.stringify(item) !== JSON.stringify(this.state.token)) {
                                            this.setState({
                                                token: item,
                                                value: 0
                                            });
                                        }

                                    }
                                }
                            />
                            <Text style={{ fontSize: 36, fontFamily: "Helvetica", color: "white" }}>
                                {
                                    this.state.value.substring(0, this.state.value.indexOf(".") === -1 ? this.state.value.length : this.state.value.indexOf(".") + 6)
                                }
                            </Text>
                            <Pressable style={{ paddingTop: 6 }} onPress={() => this.maxSelected(this.state.token)}>
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
                            onPress={(val) => this.changeText(val)}
                            clear={this.state.clear}
                        />
                        <Pressable disabled={this.state.loading} style={[GlobalStyles.button, { marginTop: 10 }]} onPress={async () => {
                            if (this.state.token.label === "CELO") {
                                this.setState({
                                    loading:true
                                })
                                this.transfer()
                            }
                            else {
                                this.setState({
                                    loading:true
                                })
                                console.log("token")
                                this.transferToken(this.state.token.value)
                            }
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
                    this.state.stage === 2 &&
                    <CryptoSign transaction={this.state.transaction} signTrans={(e) => this.acceptAndSign(e)} cancelTrans={(e) => console.log(e)} />
                }
                {
                    this.state.stage === 3 &&
                    <View style={[GlobalStyles.mainSub, { flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", paddingTop: 20 }]}>
                        <Text style={{ textAlign: "center", color: "white", fontSize: 30, width: "80%" }}>
                            Waiting Confirmation...
                        </Text>
                    </View>
                }
                {
                    this.state.stage === 4 &&
                    <View style={[GlobalStyles.mainSub, { flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }]}>
                        <Icon2 name="check-circle" size={240} color="#32d180" />
                        <Text style={{
                            textShadowRadius: 1,
                            fontSize: 28, fontWeight: "bold", color: "white"
                        }}>
                            Completed
                        </Text>
                        <Pressable style={{ marginVertical: 30 }} onPress={() => Linking.openURL("https://explorer.celo.org/mainnet/tx/" + this.state.hash)}>
                            <Text style={{
                                fontSize: 24, fontWeight: "bold", color: "white", textAlign: "center"
                            }}>
                                View on Explorer
                            </Text>
                        </Pressable>
                        <Pressable style={[GlobalStyles.button]} onPress={() => {
                            this.props.navigation.navigate('CryptoAccount')
                        }}>
                            <Text style={[GlobalStyles.buttonText]}>
                                Done
                            </Text>
                        </Pressable>
                    </View>
                }
            </View>
        );
    }
}

export default WithdrawCrypto;