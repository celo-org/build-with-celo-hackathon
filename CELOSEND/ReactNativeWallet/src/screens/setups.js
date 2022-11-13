// Basic Imports
import React, { Component } from 'react';
import { Dimensions, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
// Components
import VirtualKeyboard from 'react-native-virtual-keyboard';
// Utils
import reactAutobind from 'react-autobind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import ReactNativeBiometrics from 'react-native-biometrics'
// Utils Local
import ContextModule from '../utils/contextModule';
// Assets
import Icon from 'react-native-vector-icons/FontAwesome5';
import logoETH from "../assets/logoETH.png"
// Constants
import { code } from "../constants/countryCodes"
// Styles
import GlobalStyles from '../styles/styles';
import { Picker } from 'react-native-form-component';
import RNDateTimePicker from '@react-native-community/datetimepicker';

function subtractYears(numOfYears, date = new Date()) {
    date.setFullYear(date.getFullYear() - numOfYears);
    return date;
}

class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 0,
            pincode: "",
            text: "Create",
            phrase: "",
            biometric: false,
            date: false,
            form: {},
            prefix: "",
            creating: false
        };
        reactAutobind(this)
        this.mount = true
        this.checkPincode = false
        this.checkWallet = false
        this.checkAddress = false
        this.checkEwallet = false
        this.ethers = require('ethers')
        this.axios = require('axios');
    }

    static contextType = ContextModule;

    async componentDidMount() {
        //await this.erase()
        this.props.navigation.addListener('focus', async () => {
            this.mount = true
            if (this.context.value.kyc) {
                this.context.setValue({
                    kyc: false
                })
                this.setState({
                    stage: 6
                })
            }
            else {
                // Biometrics
                ReactNativeBiometrics.isSensorAvailable()
                    .then((resultObject) => {
                        const { available } = resultObject
                        this.setState({
                            biometric: available
                        })
                        this.context.setValue({
                            biometrics: true
                        })
                    }).catch((error) => console.log(error))
                // User Address
                try {
                    const session = await AsyncStorage.getItem('userAddress');
                    if (session !== null) {
                        this.context.setValue({
                            account: JSON.parse(session).value
                        })
                        this.checkAddress = true
                    }
                    else {
                        this.checkAddress = false
                    }
                } catch (error) {
                    this.checkAddress = false
                }
                // User Ewallet 
                try {
                    const session = await AsyncStorage.getItem('userEwallet');
                    if (session !== null) {
                        console.log(JSON.parse(session).value)
                        this.context.setValue({
                            ewallet: JSON.parse(session).value
                        })
                        this.checkEwallet = true
                    }
                    else {
                        this.checkEwallet = false
                    }
                } catch (error) {
                    this.checkEwallet = false
                }
                // User PIN
                try {
                    const session = await EncryptedStorage.getItem("userPIN");
                    if (session !== null) {
                        this.checkPincode = true
                    }
                    else {
                        this.checkPincode = false
                    }
                } catch (error) {
                    this.checkPincode = false
                }
                // User Privs
                try {
                    const session = await EncryptedStorage.getItem("userPrivs");
                    if (session !== null) {
                        this.checkWallet = true
                    }
                    else {
                        this.checkWallet = false
                    }
                } catch (error) {
                    this.checkWallet = false
                }
                if (this.checkWallet && this.checkPincode && this.checkAddress) {
                    this.props.navigation.navigate('CheckPin')
                }
                else {
                    this.setState({
                        stage: 1
                    })
                }
            }
        })
        this.props.navigation.addListener('blur', () => {
            this.mount = false
            this.setState({
                stage: 0,
                pincode: "",
                text: "Create",
                phrase: "",
                biometric: false,
                date: false,
                form: {},
                prefix: "",
                creating: false
            })
        })
    }

    async storeUserPIN() {
        try {
            await EncryptedStorage.setItem(
                "userPIN",
                JSON.stringify({
                    value: this.state.pincode.substring(0, 4)
                })
            );
        } catch (error) {
            // There was an error on the native side
        }
    }

    async storeUserPrivs(value) {
        try {
            await EncryptedStorage.setItem(
                "userPrivs",
                JSON.stringify({
                    value: value
                })
            );
        } catch (error) {
            // There was an error on the native side
        }
    }

    async storeUserAddress(value) {
        try {
            await AsyncStorage.setItem('userAddress', JSON.stringify({ value }))
            this.context.setValue({
                account: value
            })
        } catch (e) {
            // saving error
        }
    }

    async storeUserEwallet(value) {
        try {
            await AsyncStorage.setItem('userEwallet', JSON.stringify({ value }))
            this.context.setValue({
                ewallet: value
            })
        } catch (e) {
            // saving error
        }
    }

    storeUserBiometrics() {
        ReactNativeBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
            .then(async (resultObject) => {
                const { success } = resultObject
                if (success) {
                    try {
                        await AsyncStorage.setItem('userBiometrics', JSON.stringify({ value: true }))
                        this.context.setValue({
                            biometrics: true
                        })
                        this.setState({
                            stage: 5
                        })

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

    changeText = (val) => {
        if (val.length <= 4) {
            this.setState({
                pincode: val
            });
        }
    }

    createEwallet() {
        const temp = {
            ...this.state.form,
            phone: "+" + this.state.prefix + this.state.form.phone
        }
        var config = {
            method: 'get',
            url: 'https://e9wzhv9k7d.execute-api.us-east-1.amazonaws.com/create-wallet',
            headers: temp
        };
        this.axios(config)
            .then((response) => {
                this.storeUserEwallet(response.data.data.id)
                this.props.navigation.navigate('CheckPin')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Dev Only
    async erase() {
        try {
            await EncryptedStorage.clear();
            await AsyncStorage.clear()
            // Congrats! You've just cleared the device storage!
        } catch (error) {
            // There was an error on the native side
        }
    }

    render() {
        return (
            <View style={GlobalStyles.containerSetup}>
                {
                    this.state.date &&
                    <RNDateTimePicker
                        mode="date"
                        display="spinner"
                        value={subtractYears(18)}
                        maximumDate={subtractYears(18)}
                        onChange={(value) => {
                            console.log(value)
                            this.setState({
                                date: false,
                                form: {
                                    ...this.state.form,
                                    date: (new Date(value.nativeEvent.timestamp)).toLocaleDateString()
                                }
                            })
                        }}
                    />
                }
                {
                    this.state.stage === 0 &&
                    <>
                        <Image source={logoETH} style={{ height: 429 / 2, width: 476 / 2 }} />
                    </>
                }
                {
                    this.state.stage === 1 &&
                    <>
                        <View style={{ height: "10%" }} />
                        <Image source={logoETH} style={{ height: 429 / 2, width: 476 / 2 }} />
                        <Pressable style={[GlobalStyles.button]} onPress={() => this.setState({
                            stage: 2
                        })}>
                            <Text style={[GlobalStyles.buttonText]}>
                                Create new wallet
                            </Text>
                        </Pressable>
                    </>
                }
                {
                    this.state.stage === 2 &&
                    <>
                        <View style={{ height: "10%" }} />
                        <Icon name="shield-alt" size={128} color={"white"} />
                        <Text style={{ textAlign: "center", width: "80%", fontSize: 20, fontFamily: "Helvetica", color: "white" }}>
                            Protect your Wallet{"\n"}with a pincode
                            {
                                this.state.biometric &&
                                " and biometrics"
                            }
                        </Text>
                        <Pressable style={[GlobalStyles.button]} onPress={() => this.setState({
                            stage: 3
                        })}>
                            <Text style={[GlobalStyles.buttonText]}>
                                Set Pincode
                            </Text>
                        </Pressable>
                    </>
                }
                {
                    this.state.stage === 3 &&
                    <>
                        <Text style={{ textAlign: "center", fontSize: 42, fontFamily: "Helvetica", color: "white" }}>
                            Pincode Setup
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 10 }}>
                            <Text style={{ textAlign: "center", width: "20%", fontSize: 36, fontFamily: "Helvetica", color: "white" }}>
                                {
                                    this.state.pincode.substring(0, 1) === "" ? "•" : this.state.pincode.substring(0, 1)
                                }
                            </Text>
                            <Text style={{ textAlign: "center", width: "20%", fontSize: 36, fontFamily: "Helvetica", color: "white" }}>
                                {
                                    this.state.pincode.substring(1, 2) === "" ? "•" : this.state.pincode.substring(1, 2)
                                }
                            </Text>
                            <Text style={{ textAlign: "center", width: "20%", fontSize: 36, fontFamily: "Helvetica", color: "white" }}>
                                {
                                    this.state.pincode.substring(2, 3) === "" ? "•" : this.state.pincode.substring(2, 3)
                                }
                            </Text>
                            <Text style={{ textAlign: "center", width: "20%", fontSize: 36, fontFamily: "Helvetica", color: "white" }}>
                                {
                                    this.state.pincode.substring(3, 4) === "" ? "•" : this.state.pincode.substring(3, 4)
                                }
                            </Text>
                        </View>
                        <VirtualKeyboard
                            rowStyle={{
                                width: Dimensions.get('window').width,
                            }}
                            cellStyle={
                                {
                                    height: Dimensions.get('window').width / 7,
                                    borderWidth: 0,
                                    margin: 1,
                                }
                            }
                            colorBack={'black'}
                            color='white'
                            pressMode='string'
                            onPress={(val) => this.changeText(val)}
                        />
                        <Pressable style={[GlobalStyles.button]} onPress={async () => {
                            await this.storeUserPIN()
                            this.setState({
                                pincode: "",
                                stage: this.state.biometric ? 4 : 5
                            })
                        }}>
                            <Text style={[GlobalStyles.buttonText]}>
                                Set Pincode
                            </Text>
                        </Pressable>
                    </>
                }
                {
                    this.state.stage === 4 &&
                    <>
                        <View style={{ height: "10%" }} />
                        <Icon name="fingerprint" size={128} color={"white"} />
                        <Text style={{ textAlign: "center", width: "80%", fontSize: 20, fontFamily: "Helvetica", color: "white" }}>
                            Protect your Wallet{"\n"}with biometrics
                        </Text>
                        {
                            this.state.biometric &&
                            <Pressable style={[GlobalStyles.button]} onPress={() => this.storeUserBiometrics()}>
                                <Text style={[GlobalStyles.buttonText]}>
                                    Set Biometrics
                                </Text>
                            </Pressable>
                        }
                        <Pressable style={[GlobalStyles.button]} onPress={() => this.setState({
                            stage: 5
                        })}>
                            <Text style={[GlobalStyles.buttonText]}>
                                Continue
                            </Text>
                        </Pressable>
                    </>
                }
                {
                    this.state.stage === 5 &&
                    <>
                        <Text style={[GlobalStyles.simpleText, { fontSize: 20, width: "80%" }]}>
                            Secret Recovery Phrase
                        </Text>
                        <Text style={[GlobalStyles.simpleText, { fontSize: 16 }]}>
                            This is the only way you will be able to recover your wallet. Please store it somewhere safe.
                        </Text>
                        <View style={{ backgroundColor: "#242426", width: "80%", height: "30%", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap" }}>
                            {
                                ["", "", ""].map((item, index) => {
                                    return (
                                        <Text key={"phrase" + index} style={[GlobalStyles.simpleTextPhrase, { fontSize: 15, width: "33%" }]}>
                                            {
                                                item
                                            }
                                        </Text>
                                    )
                                })
                            }
                            {
                                this.state.phrase.split(" ").map((item, index) => {
                                    return (
                                        <Text key={"phrase" + index} style={[GlobalStyles.simpleTextPhrase, { fontSize: 20, width: "33%" }]}>
                                            {
                                                item
                                            }
                                        </Text>
                                    )
                                })
                            }
                        </View>
                        <Pressable disabled={this.state.text === "Creating"} style={[this.state.text === "Creating" ? GlobalStyles.buttonDisabled : GlobalStyles.button]} onPress={() => {
                            if (this.state.phrase !== "") {
                                this.setState({
                                    stage: 6
                                })
                            }
                            else {
                                this.setState({
                                    text: "Creating",
                                    phrase: "creating..."
                                }, () =>
                                    setTimeout(() => {
                                        const wallet = this.ethers.Wallet.createRandom()
                                        this.storeUserAddress(wallet.address)
                                        this.storeUserPrivs({
                                            address: wallet.address,
                                            phrase: wallet.mnemonic.phrase,
                                            privateKey: wallet.privateKey
                                        })
                                        this.setState({
                                            phrase: wallet.mnemonic.phrase,
                                            text: "Fill KYC",
                                        })
                                    }, 500))
                            }
                        }}>
                            <Text style={[GlobalStyles.buttonText]}>
                                {
                                    this.state.text
                                }
                            </Text>
                        </Pressable>
                        {
                            this.state.text === "Fill KYC" &&
                            <Pressable style={GlobalStyles.button} onPress={() => {
                                this.props.navigation.navigate('CheckPin')
                            }}>
                                <Text style={[GlobalStyles.buttonText]}>
                                    Complete w/o KYC
                                </Text>
                            </Pressable>}
                    </>
                }
                {
                    this.state.stage === 6 &&
                    <>
                        <Text style={[GlobalStyles.simpleText, { fontSize: 22, width: "80%", marginBottom: 20 }]}>
                            KYC form
                        </Text>
                        <View style={{ borderBottomWidth: 2, borderColor: "#32d180", width: "100%" }} />
                        <ScrollView style={{ width: "100%" }}>
                            <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <Text style={[GlobalStyles.simpleText, { fontSize: 22, width: "90%", marginTop: 10 }]}>
                                    Name
                                </Text>
                                <TextInput
                                    style={{ fontSize: 22, textAlign: "center", borderRadius: 6, backgroundColor: 'white', color: "black", width: "90%", borderWidth: 1, borderColor: "#32d180", marginTop: 10 }}
                                    keyboardType="default"
                                    value={this.state.form.name}
                                    onChangeText={(value) => {
                                        this.setState({
                                            form: {
                                                ...this.state.form,
                                                name: value
                                            }
                                        })
                                    }}
                                />
                                <Text style={[GlobalStyles.simpleText, { fontSize: 22, width: Dimensions.get("window").width, width: "90%", marginTop: 10 }]}>
                                    Last name
                                </Text>
                                <TextInput
                                    style={{ fontSize: 22, textAlign: "center", borderRadius: 6, backgroundColor: 'white', color: "black", width: "90%", borderWidth: 1, borderColor: "#32d180", marginTop: 10 }}
                                    keyboardType="default"
                                    value={this.state.form.lname}
                                    onChangeText={(value) => {
                                        this.setState({
                                            form: {
                                                ...this.state.form,
                                                lname: value
                                            }
                                        })
                                    }}
                                />
                                <View style={{ borderBottomWidth: 2, borderColor: "#32d180", width: "90%", alignSelf: "center", marginVertical: 20 }} />
                                <Text style={[GlobalStyles.simpleText, { fontSize: 22, width: "90%" }]}>
                                    Birth
                                </Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginTop: 10 }}>
                                    <TextInput
                                        editable={false}
                                        selectTextOnFocus={false}
                                        style={{ fontSize: 22, textAlign: "center", borderRadius: 6, backgroundColor: 'white', color: "black", width: "74%", borderWidth: 1, borderColor: "#32d180", marginRight: "4%" }}
                                        value={this.state.form.date === undefined ? "" : this.state.form.date}
                                    />
                                    <Pressable onPress={() => this.setState({
                                        date: true
                                    })}>
                                        <Icon name="calendar-alt" size={Dimensions.get("window").width * 0.12} color={"white"} />
                                    </Pressable>
                                </View>
                                <Text style={[GlobalStyles.simpleText, { fontSize: 22, width: Dimensions.get("window").width, width: "90%", marginTop: 10 }]}>
                                    Nationality
                                </Text>
                                <View style={{ width: "90%" }}>
                                    <Picker
                                        buttonStyle={{ fontSize: 22, textAlign: "center", borderWidth: 1, borderColor: "black", borderWidth: 1, borderColor: "#32d180", borderRadius: 6, marginTop: 10 }}
                                        itemLabelStyle={[{ fontSize: 22, textAlign: "center" }]}
                                        labelStyle={[{ fontSize: 22, textAlign: "center", color: "black" }]}
                                        selectedValueStyle={[{ fontSize: 22, textAlign: "center", color: "black" }]}
                                        items={code.map((item, index) => ({ label: item.name, value: item.iso_alpha2 }))}
                                        selectedValue={this.state.form.nationality}
                                        onSelection={
                                            (value) => {
                                                console.log(value)
                                                this.setState({
                                                    form: {
                                                        ...this.state.form,
                                                        nationality: value.value
                                                    }
                                                })
                                            }
                                        }
                                    />
                                </View>
                                <Text style={[GlobalStyles.simpleText, { fontSize: 22, width: "90%" }]}>
                                    Id Number
                                </Text>
                                <TextInput
                                    style={{ fontSize: 22, textAlign: "center", borderRadius: 6, backgroundColor: 'white', color: "black", width: "90%", borderWidth: 1, borderColor: "#32d180", marginTop: 10 }}
                                    keyboardType="default"
                                    value={this.state.form.id_number}
                                    onChangeText={(value) => {
                                        this.setState({
                                            form: {
                                                ...this.state.form,
                                                id_number: value
                                            }
                                        })
                                    }}
                                />
                                <View style={{ borderBottomWidth: 2, borderColor: "#32d180", width: "90%", alignSelf: "center", marginVertical: 20 }} />
                                <Text style={[GlobalStyles.simpleText, { fontSize: 22, width: "90%" }]}>
                                    Address
                                </Text>
                                <TextInput
                                    style={{ fontSize: 22, textAlign: "center", borderRadius: 6, backgroundColor: 'white', color: "black", width: "90%", borderWidth: 1, borderColor: "#32d180", marginTop: 10 }}
                                    keyboardType="default"
                                    value={this.state.form.address}
                                    onChangeText={(value) => {
                                        this.setState({
                                            form: {
                                                ...this.state.form,
                                                address: value
                                            }
                                        })
                                    }}
                                />
                                <Text style={[GlobalStyles.simpleText, { fontSize: 22, width: "90%", marginTop: 10 }]}>
                                    City
                                </Text>
                                <TextInput
                                    style={{ fontSize: 22, textAlign: "center", borderRadius: 6, backgroundColor: 'white', color: "black", width: "90%", borderWidth: 1, borderColor: "#32d180", marginTop: 10 }}
                                    keyboardType="default"
                                    value={this.state.form.city}
                                    onChangeText={(value) => {
                                        this.setState({
                                            form: {
                                                ...this.state.form,
                                                city: value
                                            }
                                        })
                                    }}
                                />
                                <Text style={[GlobalStyles.simpleText, { fontSize: 22, width: "90%", marginTop: 10 }]}>
                                    State
                                </Text>
                                <TextInput
                                    style={{ fontSize: 22, textAlign: "center", borderRadius: 6, backgroundColor: 'white', color: "black", width: "90%", borderWidth: 1, borderColor: "#32d180", marginTop: 10 }}
                                    keyboardType="default"
                                    value={this.state.form.state}
                                    onChangeText={(value) => {
                                        this.setState({
                                            form: {
                                                ...this.state.form,
                                                state: value
                                            }
                                        })
                                    }}
                                />
                                <Text style={[GlobalStyles.simpleText, { fontSize: 22, width: "90%", marginTop: 10 }]}>
                                    Zip
                                </Text>
                                <TextInput
                                    style={{ fontSize: 22, textAlign: "center", borderRadius: 6, backgroundColor: 'white', color: "black", width: "90%", borderWidth: 1, borderColor: "#32d180", marginTop: 10 }}
                                    keyboardType="decimal-pad"
                                    value={this.state.form.zip}
                                    onChangeText={(value) => {
                                        this.setState({
                                            form: {
                                                ...this.state.form,
                                                zip: value
                                            }
                                        })
                                    }}
                                />
                                <Text style={[GlobalStyles.simpleText, { fontSize: 22, width: "90%", marginTop: 10 }]}>
                                    Country
                                </Text>
                                <View style={{ width: "90%" }}>
                                    <Picker
                                        buttonStyle={{ fontSize: 22, textAlign: "center", borderWidth: 1, borderColor: "black", borderWidth: 1, borderColor: "#32d180", borderRadius: 6, marginTop: 10 }}
                                        itemLabelStyle={[{ fontSize: 22, textAlign: "center" }]}
                                        labelStyle={[{ fontSize: 22, textAlign: "center" }]}
                                        selectedValueStyle={[{ fontSize: 22, textAlign: "center", color: "black" }]}
                                        items={code.map((item, index) => ({ label: item.name, value: item.iso_alpha2, prefix: item.phone_code }))}
                                        selectedValue={this.state.form.country}
                                        onSelection={
                                            (value) => {
                                                console.log(value)
                                                this.setState({
                                                    prefix: value.prefix,
                                                    form: {
                                                        ...this.state.form,
                                                        country: value.value,
                                                        prefix: value.prefix
                                                    }
                                                })
                                            }
                                        }
                                    />
                                </View>
                                <Text style={[GlobalStyles.simpleText, { fontSize: 22, width: "90%" }]}>
                                    Phone
                                </Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", width: "90%" }}>
                                    <Text style={[GlobalStyles.simpleText, { fontSize: 22, width: "20%", color: "white" }]}>
                                        {this.state.prefix === "" ? "" : "+" + this.state.prefix}
                                    </Text>
                                    <TextInput
                                        style={{ fontSize: 22, textAlign: "center", borderRadius: 6, backgroundColor: 'white', color: "black", width: "80%", borderWidth: 1, borderColor: "#32d180" }}
                                        keyboardType="decimal-pad"
                                        value={this.state.form.phone}
                                        onChangeText={(value) => {
                                            this.setState({
                                                form: {
                                                    ...this.state.form,
                                                    phone: value
                                                }
                                            })
                                        }}
                                    />
                                </View>
                                <View style={{ borderBottomWidth: 2, borderColor: "#32d180", width: "90%", alignSelf: "center", marginVertical: 20 }} />
                                <Text style={[GlobalStyles.simpleText, { fontSize: 22, width: "90%" }]}>
                                    Email
                                </Text>
                                <TextInput
                                    style={{ fontSize: 22, textAlign: "center", borderRadius: 6, backgroundColor: 'white', color: "black", width: "90%", borderWidth: 1, borderColor: "#32d180", marginTop: 10 }}
                                    keyboardType="default"
                                    value={this.state.form.email}
                                    onChangeText={(value) => {
                                        this.setState({
                                            form: {
                                                ...this.state.form,
                                                email: value
                                            }
                                        })
                                    }}
                                />
                                <Text style={[GlobalStyles.simpleText, { fontSize: 22, width: "90%", marginTop: 10 }]}>
                                    Password
                                </Text>
                                <TextInput
                                    style={{ fontSize: 22, textAlign: "center", borderRadius: 6, backgroundColor: 'white', color: "black", width: "90%", borderWidth: 1, borderColor: "#32d180", marginTop: 10 }}
                                    keyboardType="default"
                                    value={this.state.form.password}
                                    secureTextEntry={true}
                                    onChangeText={(value) => {
                                        this.setState({
                                            form: {
                                                ...this.state.form,
                                                password: value
                                            }
                                        })
                                    }}
                                />

                            </View>
                            <Pressable disabled={this.state.creating} style={[this.state.creating === "Creating" ? GlobalStyles.buttonDisabled : GlobalStyles.button, { width: "90%", marginTop: 30, alignSelf: "center" }]} onPress={() => {
                                this.createEwallet()
                            }}>
                                <Text style={[GlobalStyles.buttonText]}>
                                    Complete KYC
                                </Text>
                            </Pressable>
                        </ScrollView>
                    </>
                }
            </View>
        );
    }
}

export default Setup;