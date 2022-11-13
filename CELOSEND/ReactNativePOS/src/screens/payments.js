import React, { Component } from 'react';
import { Text, View, Pressable, Image } from 'react-native';
import reactAutobind from 'react-autobind';
// Utils
import ContextModule from '../utils/contextModule';
// Styles
import GlobalStyles from '../styles/styles';
import Web3 from 'web3';
import Footer from './components/footer';
import Header from './components/header';
// Assets
import WClogo from "../assets/wclogo.png"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { NODE_ENV_CELO_RCP } from "../../env"

class Payments extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        reactAutobind(this)
        this.web3 = new Web3(NODE_ENV_CELO_RCP)
    }

    static contextType = ContextModule;

    render() {
        return (
            <>
                <View style={GlobalStyles.container}>
                    <Header />
                    <View style={[GlobalStyles.main, { flexDirection: "row", justifyContent: "space-evenly", alignItems: "flex-start", flexWrap: "wrap" }]}>
                        <Pressable style={[GlobalStyles.buttonBig]} onPress={() => this.props.navigation.navigate('Wallet')}>
                            <Image source={WClogo} style={{ width: 608 / 7, height: 388 / 7, alignSelf: "center" }} />
                            <Text style={[GlobalStyles.buttonText, { marginTop: 20 }]}>
                                Wallet Connect
                            </Text>
                        </Pressable>
                        <Pressable style={[GlobalStyles.buttonBig]} onPress={() => this.props.navigation.navigate('DepositCrypto')}>
                            <Icon name="ethereum" size={64} color="white" style={{ alignSelf: "center" }} />
                            <Text style={[GlobalStyles.buttonText, { marginTop: 10 }]}>
                                Crypto Deposit
                            </Text>
                        </Pressable>
                        <Pressable style={[GlobalStyles.buttonBig]} onPress={() => this.props.navigation.navigate('DepositFiat')}>
                            <Icon name="wallet-outline" size={64} color="white" style={{ alignSelf: "center" }} />
                            <Text style={[GlobalStyles.buttonText, { marginTop: 10 }]}>
                                Wallet Deposit
                            </Text>
                        </Pressable>
                        <Pressable style={[GlobalStyles.buttonBig]}>
                            <Icon name="cash" size={64} color="white" style={{ alignSelf: "center" }} />
                            <Text style={[GlobalStyles.buttonText, { marginTop: 10 }]}>
                                Cash Payment
                            </Text>
                        </Pressable>
                    </View>
                    <Footer navigation={this.props.navigation} />
                </View>
            </>
        );
    }
}

export default Payments;