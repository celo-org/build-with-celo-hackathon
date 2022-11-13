import React, { Component } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import GlobalStyles from '../../styles/styles';
import Header from '../components/header';
import IconMC from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import reactAutobind from 'react-autobind';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import EncryptedStorage from 'react-native-encrypted-storage';
import ContextModule from '../../utils/contextModule';

import Web3 from 'web3';

import { NODE_ENV_CELO_RCP, NODE_ENV_CELO_API_APIKEY } from "../../../env"
import ReactNativeBiometrics from 'react-native-biometrics';

class FiatSign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pincode: "",
        };
        reactAutobind(this)
        this.mount = true
        this.web3 = new Web3(NODE_ENV_CELO_RCP)
    }

    static contextType = ContextModule;

    componentDidMount() {
        this.clearKeyboard()
        this.mount = true
    }

    componentWillUnmount() {
        this.mount = false
        this.setState({
            pincode: ""
        })
    }

    async changeText(val) {
        if (val.length < 4) {
            this.mount && this.setState({
                pincode: val
            });
        }
        else {
            try {
                const session = await EncryptedStorage.getItem("userPIN");
                if (session !== null) {
                    if (val === JSON.parse(session).value) {
                        this.props.signTrans()
                    }
                    else {
                        this.clearKeyboard()
                        this.mount && this.setState({
                            pincode: ""
                        });
                    }
                }
                else {
                    this.clearKeyboard()
                    this.mount && this.setState({
                        pincode: ""
                    });
                }
            } catch (error) {
                this.clearKeyboard()
                this.mount && this.setState({
                    pincode: ""
                });
            }
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

    checkBiometrics() {
        ReactNativeBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
            .then(async (resultObject) => {
                const { success } = resultObject
                if (success) {
                    try {
                        this.props.signTrans()
                    } catch (error) {
                        // There was an error on the native side
                    }
                } else {
                    console.log('user cancelled biometric prompt')
                }
            })
            .catch(() => {
                console.log('biometrics failed')
            })
    }

    render() {
        return (
            <>
                {
                    <View style={{ position: "absolute", top: 9, left: 18, width: 36, height: 36 }}>
                        <Pressable onPress={() => this.props.cancelTrans("cancel")}>
                            <IconMC name="arrow-back-ios" size={36} color={"#32d180"} />
                        </Pressable>
                    </View>
                }
                <View style={[GlobalStyles.mainSub, { flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", paddingTop: 20 }]}>
                    <Text style={{ textAlign: "center", fontSize: 36, fontFamily: "Helvetica", color: "white" }}>
                        Pincode
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 10 }}>
                        <Text style={{ textAlign: "center", width: "20%", fontSize: 36, fontFamily: "Helvetica", color: "white" }}>
                            {
                                this.state.pincode.substring(0, 1) === "" ? "." : "•"
                            }
                        </Text>
                        <Text style={{ textAlign: "center", width: "20%", fontSize: 36, fontFamily: "Helvetica", color: "white" }}>
                            {
                                this.state.pincode.substring(1, 2) === "" ? "." : "•"
                            }
                        </Text>
                        <Text style={{ textAlign: "center", width: "20%", fontSize: 36, fontFamily: "Helvetica", color: "white" }}>
                            {
                                this.state.pincode.substring(2, 3) === "" ? "." : "•"
                            }
                        </Text>
                        <Text style={{ textAlign: "center", width: "20%", fontSize: 36, fontFamily: "Helvetica", color: "white" }}>
                            {
                                this.state.pincode.substring(3, 4) === "" ? "." : "•"
                            }
                        </Text>
                    </View>
                    <VirtualKeyboard
                        rowStyle={{
                            width: Dimensions.get('window').width,
                        }}
                        cellStyle={
                            {
                                height: Dimensions.get('window').width / 6,
                                borderWidth: 1,
                                margin: 1,
                            }
                        }
                        colorBack={'black'}
                        color='white'
                        pressMode='string'
                        onPress={(val) => this.changeText(val)}
                        clear={this.state.clear}
                    />
                    {
                        this.context.value.biometrics &&
                        <Pressable onPress={() => this.checkBiometrics()}>
                            <Icon name="fingerprint" size={128} color={"white"} />
                        </Pressable>
                    }
                </View>
            </>
        );
    }
}

export default FiatSign;