import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { Button, Text, Layout, Card } from '@ui-kitten/components'
import commonStyles from '../commonStyles'
import { backgrounds } from '../colors'
import EmptySpace from './EmptySpace'
import { formatAddress, formatNumber } from '../services/FormatterService'

const TokenCardSummary = ({ cardData, navigation }) => {

    function openProject(data) {
        navigation.navigate('TokenHomeScreen', { data: data })
    }

    return (
        <View style={{ ...commonStyles.outerCard}}>
            <View style={{ ...commonStyles.innerCard, backgroundColor: backgrounds[(Math.floor((Math.random() * 100))) % backgrounds.length] }}>
                <ImageBackground source={require('../../assets/images/company.png')}>
                    <View>
                        <Text style={commonStyles.secondaryTextBlack}>{cardData.title}</Text>
                        <Text style={commonStyles.tertiaryTextGrey}>{cardData.token}</Text>
                    </View>
                    <EmptySpace />
                    <Button
                        style={{ width: '30%', ...commonStyles.button }}
                        onPress={() => openProject(cardData)}
                        size='small'
                        status='info'>
                        Details
                    </Button>
                </ImageBackground>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={commonStyles.tertiaryTextGrey}>Total Project Token:  {formatNumber(cardData.amount)} </Text>
                <Text style={commonStyles.tertiaryTextGrey} selectable={true}>Address:  {cardData.address}</Text>
            </View>
        </View>
    )
}

export default TokenCardSummary;

const styles = StyleSheet.create({
    bottomContainer: {
        padding: 10
    }
})
