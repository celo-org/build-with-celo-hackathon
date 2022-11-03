// Basic Imports
import React, { Component } from 'react';
import { Text, View, Pressable, Dimensions } from 'react-native';
// Components
import QRCode from 'react-native-qrcode-svg';
// Components Local
import Header from "../components/header"
// Utils 
import reactAutobind from 'react-autobind';
// Utils Local
import ContextModule from '../../utils/contextModule';
// Assets
import IconMC from 'react-native-vector-icons/MaterialIcons';
// Styles
import GlobalStyles from '../../styles/styles';
import Clipboard from '@react-native-clipboard/clipboard';
import FadeInOut from 'react-native-fade-in-out';

class DepositFiat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        reactAutobind(this)
        this.axios = require('axios');
        this.source = this.axios.CancelToken.source();
        this.mount = true
        this.interval = null
    }

    static contextType = ContextModule;

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.mount = true
            this.interval = null
            this.getBalanceRapyd()

        })
        this.props.navigation.addListener('blur', () => {
            this.setState({

            })
            this.mount = false
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
                this.context.setValue({
                    phone: response.data.data.phone_number
                })
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
                        <View style={{ position: "absolute", top: 9, left: 18, width: 36, height: 36 }}>
                            <Pressable onPress={() => this.props.navigation.navigate('FiatAccount')}>
                                <IconMC name="arrow-back-ios" size={36} color={"#32d180"} />
                            </Pressable>
                        </View>
                    }
                    <View style={[GlobalStyles.mainSub, { flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }]}>
                        <Text style={{ textAlign: "center", color: "white", fontSize: 30, }}>
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
                        <View style={{ borderColor: "#32d180", borderWidth: 2 }}>
                            <QRCode
                                value={this.context.value.ewallet + "," + this.context.value.phone}
                                size={360}
                                quietZone={10}
                                ecl="H"
                            />
                        </View>
                        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                            <View style={{ position: "absolute", bottom: Dimensions.get("window").height * 0.085, width: "100%" }}>
                                <View style={{ flexDirection: "column", alignItems: "center" }}>
                                    <FadeInOut visible={this.state.modal}>
                                        <View style={{ backgroundColor: "#ffffff44", borderRadius: 500, width: "80%" }}>
                                            <Text style={{ textAlign: "center", color: "white", fontSize: 21, padding: 4 }}>
                                                CLABE copied to clipboard
                                            </Text>
                                        </View>
                                    </FadeInOut>
                                </View>
                            </View>
                            <Text style={{ textAlign: "center", color: "white", fontSize: 30, width: "100%" }}>
                                CLABE:{"\n"}
                                {
                                    this.context.value.show ? this.context.value.clabe : "***"
                                }
                            </Text>
                            <Pressable
                                style={{ position: "absolute", right: 0, width: 40, height: 24 }}
                                onPress={() => {
                                    console.log("Copy")
                                    Clipboard.setString(this.context.value.clabe)
                                    this.mount && this.setState({
                                        modal: true
                                    }, () => {
                                        setTimeout(() => {
                                            this.mount && this.setState({
                                                modal: false
                                            })
                                        }, 2000)
                                    })
                                }}>
                                <IconMC name="content-copy" size={24} color={"#32d180"} />
                            </Pressable>
                        </View>
                        <Pressable style={[GlobalStyles.button]} onPress={() => this.props.navigation.navigate('FiatAccount')}>
                            <Text style={[GlobalStyles.buttonText]}>
                                Done
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </>
        );
    }
}

export default DepositFiat;