import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const EmptySpace = ({space = '2%'}) => {
    return (
        <View style={{margin: space}}>
        </View>
    )
}

export default EmptySpace

const styles = StyleSheet.create({
})
