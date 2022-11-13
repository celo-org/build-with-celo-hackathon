import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

function epsilonRound(num) {
    const zeros = 4;
    return Math.round((num + Number.EPSILON) * Math.pow(10, zeros)) / Math.pow(10, zeros)
}

class Transactions extends Component {
    render() {
        return (
            <ScrollView>
                {this.props.transactions.map((item, index) => (
                    <View key={index} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                        <Text style={{ color: "white", fontSize: 20, padding: 10, textAlign: "center" }}>
                            <Text>
                                {"Type\n"}
                            </Text>
                            <Text style={{ color: "white", fontSize: 16, padding: 10, textAlign: "center" }}>
                                {item.type}
                            </Text>
                        </Text>
                        <Text style={{ color: "white", fontSize: 20, padding: 10, textAlign: "center" }}>
                            <Text>
                                {"Status\n"}
                            </Text>
                            <Text style={{ color: "white", fontSize: 16, padding: 10, textAlign: "center" }}>
                                {item.status}
                            </Text>
                        </Text>
                        <Text style={{ color: "white", fontSize: 20, padding: 10, textAlign: "center" }}>
                            <Text>
                                {"Amount\n"}
                            </Text>
                            {
                                item.amount >= 0 ?
                                    <Text style={{ color: "green", fontSize: 16, padding: 10, textAlign: "center" }}>
                                        {item.amount}{" "}{item.currency}
                                    </Text>
                                    :
                                    <Text style={{ color: "red", fontSize: 16, padding: 10, textAlign: "center" }}>
                                        {item.amount}{" "}{item.currency}
                                    </Text>
                            }
                        </Text>
                    </View>
                ))
                }
            </ScrollView>
        );
    }
}

export default Transactions;