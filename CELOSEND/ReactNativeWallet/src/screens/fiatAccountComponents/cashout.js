// Basic Imports
import React, { Component } from 'react';
import { Text, View, Pressable, Image, Dimensions, Animated, ScrollView, TextInput, Keyboard, Linking } from 'react-native';
// Components
import CreditCard from 'react-native-credit-card';
// Local Components
import Header from '../components/header';
// Assets
import IconMC from 'react-native-vector-icons/MaterialIcons';
// Utils 
import reactAutobind from 'react-autobind';
// Utils Local
import ContextModule from '../../utils/contextModule';
// Styles
import GlobalStyles from '../../styles/styles';

const generator = require('creditcard-generator')

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

class CashOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cvc: randomNumber(111, 999),
            expiry: '1226',
            name: 'EffiCard APP',
            number: generator.GenCC("VISA"),
            imageFront: require('../../assets/CardAssets/card-front.png'),
            imageBack: require('../../assets/CardAssets/card-back.png'),
            cardHolder: false,
            amount: '',
            redirect_url: '',
            creating: false,
            names: '',
            clabe: '',
            keyboard: false
        };
        reactAutobind(this)
        this.axios = require('axios');
        this.source = this.axios.CancelToken.source();
        this.mount = true
        this.keyboardShow = null
        this.keyboardHide = null
    }

    static contextType = ContextModule;

    async componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            this.mount = true
            this.mount && this.setState({

            })
            this.keyboardShow = Keyboard.addListener("keyboardDidShow", () => {
                this.mount && this.setState({
                    keyboard: true
                })
            });
            this.keyboardHide = Keyboard.addListener("keyboardDidHide", () => {
                this.mount && this.setState({
                    keyboard: false
                })
            });
        })
        this.props.navigation.addListener('blur', () => {
            this.mount = false
            this.setState({

            })
            this.keyboardShow !== null && this.keyboardShow.remove()
            this.keyboardHide !== null && this.keyboardHide.remove()
        })
    }

    componentWillUnmount() {
        this.mount = false
        this.keyboardShow !== null && this.keyboardShow.remove()
        this.keyboardHide !== null && this.keyboardHide.remove()
    }


    createSpeiTransfer() {
        let _this = this;
        this.axios({
            method: 'get',
            url: 'https://e9wzhv9k7d.execute-api.us-east-1.amazonaws.com/create-SPEI',
            headers: {
                'amount': this.state.amount,
            },
            cancelToken: this.source.token
        })
            .then((response) => {
                this.mount && this.setState({
                    redirect_url: response.data.data.redirect_url,
                    creating: false
                });
            })
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
                    <View style={[GlobalStyles.mainSub, { flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", paddingTop: 10 }]}>
                        {
                            this.state.cardHolder ?
                                <View style={{ height: 180 }}>
                                    <CreditCard
                                        type={this.state.type}
                                        imageFront={this.state.imageFront}
                                        imageBack={this.state.imageBack}
                                        shiny={false}
                                        bar={false}
                                        focused={this.state.focused}
                                        number={this.state.number}
                                        name={this.state.name}
                                        expiry={this.state.expiry}
                                        cvc={this.state.cvc} />
                                </View>
                                :
                                <Pressable style={[GlobalStyles.button]} onPress={() => {
                                    this.mount && this.setState({ cardHolder: true });
                                }}>
                                    <Text style={[GlobalStyles.buttonText]}>
                                        Issue Virtual Card
                                    </Text>
                                </Pressable>
                        }
                        <View style={{ backgroundColor: "#32d180", height: 2, width: "90%", marginVertical: 10 }} />
                        <View style={{ height: "60%" }}>
                            <ScrollView>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "white", fontSize: 30, marginVertical: 10 }}>
                                        Spei Transfer
                                    </Text>
                                    <Text style={{ color: "white", fontSize: 24 }}>
                                        Name
                                    </Text>
                                    <TextInput
                                        style={{
                                            width: Dimensions.get("window").width * 0.9,
                                            borderRadius: 5,
                                            borderWidth: 1,
                                            backgroundColor: '#fff',
                                            color: 'black',
                                            color: "#000",
                                            marginVertical: 10
                                        }}
                                        value={this.state.names}
                                        onChangeText={(event) => {
                                            this.mount && this.setState({
                                                names: event
                                            })
                                        }}
                                    />
                                    <Text style={{ color: "white", fontSize: 24 }}>
                                        CLABE
                                    </Text>
                                    <TextInput
                                        style={{
                                            width: Dimensions.get("window").width * 0.9,
                                            borderRadius: 5,
                                            borderWidth: 1,
                                            backgroundColor: '#fff',
                                            color: 'black',
                                            paddingLeft: 12,
                                            color: "#000",
                                            marginVertical: 10
                                        }}
                                        keyboardType="number-pad"
                                        value={this.state.clabe}
                                        onChangeText={(text) => {
                                            console.log(text);
                                            if (isNumeric(text)) {
                                                if (text === ".") {
                                                    this.mount && this.setState({
                                                        clabe: "",
                                                    });
                                                }
                                                else if (text.substring(text.length - 1) === ".") {
                                                    this.mount && this.setState({
                                                        clabe: text.substring(0, text.length - 1),
                                                    });
                                                }
                                                else {
                                                    this.mount && this.setState({
                                                        clabe: text,
                                                    });
                                                }
                                            }
                                        }}
                                    />
                                    <Text style={{ color: "white", fontSize: 24 }}>
                                        Amount USD
                                    </Text>
                                    <TextInput
                                        style={{
                                            width: Dimensions.get("window").width * 0.9,
                                            borderRadius: 5,
                                            borderWidth: 1,
                                            backgroundColor: '#fff',
                                            color: 'black',
                                            paddingLeft: 12,
                                            color: "#000",
                                            marginVertical: 10
                                        }}
                                        keyboardType="number-pad"
                                        value={this.state.amount}
                                        onChangeText={(text) => {
                                            if (isNumeric(text) || text === "" || text === "0." || text === "0..") {
                                                if (text === "") {
                                                    this.mount && this.setState({
                                                        amount: "0",
                                                    });
                                                }
                                                else if (text === "0.") {
                                                    this.mount && this.setState({
                                                        amount: "0.",
                                                    });
                                                }
                                                else if (text === "0..") {
                                                    this.mount && this.setState({
                                                        amount: "0",
                                                    });
                                                }
                                                else if (text.substring(text.length - 1) === ".") {
                                                    this.mount && this.setState({
                                                        amount: text,
                                                    });
                                                }
                                                else {
                                                    if (parseFloat(text) >= parseFloat(this.context.value.ewalletBalance)) {
                                                        this.mount && this.setState({
                                                            amount: parseFloat(this.context.value.ewalletBalance).toString(),
                                                        });
                                                    }
                                                    else {
                                                        this.mount && this.setState({
                                                            amount: parseFloat(text).toString(),
                                                        });
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                    <Text>
                                    </Text>
                                    <View >
                                        <Pressable
                                            disabled={this.state.creating}
                                            style={[GlobalStyles.button]}
                                            onPress={() => {
                                                if (this.state.redirect_url === '') {
                                                    this.mount && this.setState({ creating: true });
                                                    this.createSpeiTransfer();
                                                } else {
                                                    console.log("redirecting");
                                                    Linking.openURL(this.state.redirect_url);
                                                }
                                            }}>
                                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                                <Text style={{ color: "white", fontSize: 24 }}>
                                                    {
                                                        this.state.redirect_url === '' ?
                                                            <>
                                                                {
                                                                    !this.state.creating ? "Create Spei Transfer" : "Creating..."
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {
                                                                    "Open SPEI URL"
                                                                }
                                                            </>
                                                    }
                                                </Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={{ height: this.state.keyboard ? Dimensions.get("window").height * 0.3 : 0 }} />
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </>
        );
    }
}

export default CashOut;