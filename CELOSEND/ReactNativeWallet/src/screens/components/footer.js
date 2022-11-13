import React, { Component } from 'react';
import { Pressable, Text, View } from 'react-native';
import GlobalStyles from '../../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import ContextModule from '../../utils/contextModule';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    static contextType = ContextModule;

    render() {
        return (
            <View style={[GlobalStyles.footer, { flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", borderTopWidth: 2, borderColor: "#FFC000" }]}>
                <Pressable style={[this.context.value.selected === 0 ? GlobalStyles.buttonFooterSelected : GlobalStyles.buttonFooter]} onPress={() => {
                    this.context.setValue({
                        selected: 0
                    })
                    this.props.navigation.navigate('Landing')
                }}>
                    <Icon2 name="home" size={24} color="white" />
                    {
                        this.context.value.selected === 0 &&
                        <Text style={[GlobalStyles.buttonText]}>
                            {" "}Home
                        </Text>
                    }
                </Pressable>
                <Text style={[GlobalStyles.buttonText, { color: "#FFC000" }]}>
                    |
                </Text>
                <Pressable style={[this.context.value.selected === 1 ? GlobalStyles.buttonFooterSelected : GlobalStyles.buttonFooter]} onPress={() => {
                    this.context.setValue({
                        selected: 1
                    })
                    this.props.navigation.navigate('CryptoAccount')
                }}>
                    <Icon name="ethereum" size={24} color="white" />
                    {
                        this.context.value.selected === 1 &&
                        <Text style={[GlobalStyles.buttonText]}>
                            {" "}Crypto
                        </Text>
                    }
                </Pressable>
                <Text style={[GlobalStyles.buttonText, { color: "#FFC000" }]}>
                    |
                </Text>
                <Pressable style={[this.context.value.selected === 2 ? GlobalStyles.buttonFooterSelected : GlobalStyles.buttonFooter]} onPress={() => {
                    this.context.setValue({
                        selected: 2
                    })
                    this.props.navigation.navigate('FiatAccount')
                }}>
                    <Icon2 name="attach-money" size={24} color="white" />
                    {
                        this.context.value.selected === 2 &&
                        <Text style={[GlobalStyles.buttonText]}>
                            {" "}Wallet
                        </Text>
                    }
                </Pressable>
                <Text style={[GlobalStyles.buttonText, { color: "#FFC000" }]}>
                    |
                </Text>
                <Pressable style={[this.context.value.selected === 3 ? GlobalStyles.buttonFooterSelected : GlobalStyles.buttonFooter]} onPress={() => {
                    this.context.setValue({
                        selected: 3
                    })
                    this.props.navigation.navigate('Swap')
                }}>
                    <Icon2 name="swap-vert" size={24} color="white" />
                    {
                        this.context.value.selected === 3 &&
                        <Text style={[GlobalStyles.buttonText]}>
                            {" "}Swap
                        </Text>
                    }
                </Pressable>
            </View>
        );
    }
}

export default Footer;