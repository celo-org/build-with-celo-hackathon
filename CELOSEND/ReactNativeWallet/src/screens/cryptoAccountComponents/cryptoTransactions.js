import React, { Component } from 'react';
import { View, Text, ScrollView, Pressable, Linking } from 'react-native';

function epsilonRound(num) {
    const zeros = 4;
    return Math.round((num + Number.EPSILON) * Math.pow(10, zeros)) / Math.pow(10, zeros)
}

class Ctransactions extends Component {
    render() {
        console.log(this.props.transactions)
        return (
            <ScrollView>
                {this.props.transactions.map((item, index) => (
                    <View key={index} style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                        marginHorizontal: 16
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}>
                            <View style={{ marginRight: 30 }}>
                                <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
                                    Date: {"\n"}
                                    {new Date(item.timeStamp * 1000).toLocaleDateString()}
                                </Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
                                    Amount: {"\n"}
                                    {
                                        item.tokenSymbol !== undefined ?
                                            <Text style={{
                                                color: item.from.toLowerCase() !== this.props.from.toLowerCase() ? '#009900' : '#990000'
                                            }}>
                                                {
                                                    epsilonRound(item.value / Math.pow(10, parseInt(item.tokenDecimal)))
                                                }
                                            </Text>
                                            :
                                            <Text style={{
                                                color: item.from.toLowerCase() === this.props.from.toLowerCase() ? '#009900' : '#990000'
                                            }}>
                                                {
                                                    epsilonRound(item.value / 1000000000000000000)
                                                }
                                            </Text>
                                    }
                                    {"  "}
                                    {
                                        item.tokenSymbol !== undefined ? item.tokenSymbol : "CELO"
                                    }
                                </Text>
                            </View>
                            <View style={{ marginLeft: 30 }}>
                                <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
                                    GasFee: {"\n"}{
                                        epsilonRound(item.gas * item.gasPrice / 1000000000000000000) > 0 ?
                                            epsilonRound(item.gas * item.gasPrice / 1000000000000000000)
                                            :
                                            ">0.001"
                                    }
                                    {"  "}
                                </Text>
                            </View>
                        </View>
                        <View style={{width:"90%", alignSelf:"center"}}>
                            <Pressable onPress={() => Linking.openURL("https://explorer.celo.org/mainnet/tx/" + item.hash)}>
                                <Text style={{ color:"#0000FFAA",textAlign: "center", fontSize: 17.7, textDecorationLine: 'underline'}}>
                                {item.hash}
                            </Text>
                            </Pressable>
                        </View>
                        <View style={{ backgroundColor: "#32d18055", height: 1, width: "90%", marginVertical: 20, alignSelf:"center" }} />
                    </View>
                ))
                }
            </ScrollView>
        );
    }
}

export default Ctransactions;