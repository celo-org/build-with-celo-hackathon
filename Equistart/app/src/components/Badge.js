import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import commonStyles from '../commonStyles';
import Color from 'color';

const Badge = ({ text, color }) => {
    let bg = Color(color).alpha(0.1);
    return (
        <View style={{ ...styles.badge, backgroundColor: bg.string(), borderColor: color }}>
            <Text style={{ color: color }}>{text}</Text>
        </View>
    );
}

export default Badge

const styles = StyleSheet.create({
    badge: {
        borderWidth: 1,
        borderRadius: 20,
        height: 30,
        width: 90,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
