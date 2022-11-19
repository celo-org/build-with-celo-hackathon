import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import EmptySpace from './EmptySpace'

const CardList = ({ cardListData, card, navigation }) => {
    return (
        <View>
            <EmptySpace />
            {cardListData.map((item) => (
                <View  key={item.key}>
                    <View>{card({ cardData: item, navigation: navigation })}</View>
                    <EmptySpace />
                </View>
            ))}
        </View>
    )
}

export default CardList

const styles = StyleSheet.create({})
