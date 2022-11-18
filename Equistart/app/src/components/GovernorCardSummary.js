import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { Button, Text, Layout, Card } from '@ui-kitten/components'
import commonStyles from '../commonStyles'
import { backgrounds } from '../colors'
import EmptySpace from './EmptySpace'
import { formatAddress, formatNumber } from '../services/FormatterService'
import { getTokenName } from '../services/TokenServices/ERC20TokenService'

// const color = backgrounds[(Math.floor((Math.random() * 100))) % backgrounds.length];
const GovernorCardSummary = ({ cardData, navigation }) => {

    const [tokenName, setTokenName] = React.useState('');
    const [color, setData] = React.useState(backgrounds[(Math.floor((Math.random() * 100))) % backgrounds.length]);
    React.useEffect(() => {
        fetchTokenName(cardData);
    }, []);

    async function fetchTokenName(data) {
        try {
            const result = await getTokenName(data.token);
            setTokenName(() => result);
        } catch (error) {
            console.log("ERROR while geting token Name", error);
        }

    }

    function openProject(data) {
        navigation.navigate('GovernorHomeScreen', { data: data })
    }

    return (
        <View style={{ ...commonStyles.outerCard }}>
            <View style={{ ...commonStyles.innerCard, backgroundColor: color }}>
                <ImageBackground source={require('../../assets/images/company1.png')}>
                    <View style={styles.header}>
                        <Text style={commonStyles.secondaryTextBlack}>{tokenName || '---'} Governance</Text>
                    </View>
                    <EmptySpace />
                    <Button
                        style={{ width: 72.5, ...commonStyles.button }}
                        onPress={() => openProject(cardData)}
                        size='small'
                        status='info'>
                        Details
                    </Button>
                </ImageBackground>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={commonStyles.tertiaryTextGrey}>Token Address:  {cardData.token} </Text>
                <Text style={commonStyles.tertiaryTextGrey} selectable={true}>Governor Address:  {cardData.governor}</Text>
            </View>
        </View>
    )
}

export default GovernorCardSummary;

const styles = StyleSheet.create({
    bottomContainer: {
        padding: 10
    },
    header: {
        maxWidth: '50%',
        flex: 1
    }
})
