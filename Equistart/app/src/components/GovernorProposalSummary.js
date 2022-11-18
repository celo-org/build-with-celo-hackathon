import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import commonStyles from '../commonStyles'
import Badge from './Badge';
import { colorPairs } from '../colors'
import TextToClipBoard from '../components/TextToClipBoard';

export const stateMap = {
    0: { name: 'Pending', color: 'darkorange' },
    1: { name: 'Active', color: 'green' },
    2: { name: 'Cancelled', color: 'red' },
    3: { name: 'Defeated', color: 'red' },
    4: { name: 'Succeded', color: 'green' },
    5: { name: 'Queued', color: 'darkorange' },
    6: { name: 'Expired', color: 'red' },
    7: { name: 'Executed', color: 'green' },
}

const GovernorProposalSummary = ({ cardData, navigation }) => {
    let num = (Math.floor((Math.random() * 100))) % colorPairs.length;
    console.log("SHOULD GET DATA:", cardData)


    return (
        <View style={commonStyles.outerCard}>
            <View style={{ ...commonStyles.innerCard, backgroundColor: colorPairs[num].background }}>
                <ImageBackground source={require('../../assets/images/proposal.png')} style={{ height: 150, justifyContent: 'space-between' }}>
                <Badge status={true} text={stateMap[cardData.proposalState].name} color={stateMap[cardData.proposalState].color} />
                </ImageBackground>
                <View>
                    <Text style={commonStyles.secondaryTextGrey}>Proposal Id </Text>
                    <TextToClipBoard text={cardData.proposalId} />
                    <View>
                        <Text style={commonStyles.primaryTextGreen}> Start Block {<Text style={{ color: colorPairs[num].text, fontWeight: 'bold' }}> {cardData.votingStartDate} </Text>} </Text>
                        <View style={{ marginLeft: '10%' }}></View>
                        <Text style={commonStyles.primaryTextRed}> End Block {<Text style={{ color: colorPairs[num].text, fontWeight: 'bold' }}> {cardData.votingEndDate} </Text>} </Text>
                    </View>
                    <View style={{ marginLeft: 'auto', marginTop: 2 }}>
                        <Button
                            style={commonStyles.button}
                            onPress={() => navigation.navigate('GovernorProposalDetails', { cardData })}
                            size='small'
                            status='info'>
                            Details
                        </Button>
                    </View>
                </View>

            </View>
        </View>
    )
}

export default GovernorProposalSummary;

const styles = StyleSheet.create({
    card: {
        margin: 4,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flexDirection: 'row'
    },
    dynamicText: {
        color: '#FFFFFF'
    }
})