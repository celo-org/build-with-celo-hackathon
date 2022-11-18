import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, Layout, Card } from '@ui-kitten/components'
import commonStyles from '../commonStyles'
import Badge from './Badge'
import EmptySpace from './EmptySpace'
import { formatAddressLong, formatDate } from '../services/FormatterService'
import { castVote } from '../services/ProjectServices'
import { useWalletConnect } from '@walletconnect/react-native-dapp';

const ProposalCardDetail = ({ cardData }) => {
    const [yesCount, setYesCount] = React.useState(Number(cardData.yesCount));
    const [noCount, setNoCount] = React.useState(Number(cardData.noCount));
    const [votingStatus, setVotingStatus] = React.useState(!cardData.isActive);
    const connector = useWalletConnect();
    console.log(cardData.isActive);
    const handleVote = async (vote) => {
        castVote(cardData.projectData.address, connector, cardData.key, vote).then(success => {
            if (success) {
                if (vote) {
                    setYesCount(yesCount + 1);
                }
                else {
                    setNoCount(noCount + 1);
                }
            }
            else {
                console.log('error');
            }
        })
    };

    return (
        <View>
            <View style={{ ...commonStyles.innerCard, backgroundColor: '#F8F8F8' }} >
                <View style={styles.nameContainer}>
                    <Text category='h3' style={styles.header}>{cardData.header}</Text>
                    <Badge status={cardData.isActive} />
                </View>
                <EmptySpace />
                <Text style={commonStyles.primaryTextOrange}>Description</Text>
                <Text style={styles.text}>
                    {cardData.description}
                </Text>
                <EmptySpace />
                <Text style={commonStyles.primaryTextOrange}>About</Text>
                <View>
                    <Text style={commonStyles.secondaryTextGrey}>Creator: </Text>
                    {<Text style={styles.text}>     {formatAddressLong(cardData.address)} </Text>} 
                    <Text style={commonStyles.secondaryTextGrey}>Voting Ends At: </Text>
                    {<Text style={styles.text}>     {formatDate(cardData.votingEndDate)} </Text>} 
                </View>
                <EmptySpace />
                <Text style={commonStyles.primaryTextOrange}>Results</Text>
                <View style={styles.bottomSection}>
                    <View style={{ marginLeft: '10%' }}></View>
                    <Text style={commonStyles.secondaryTextGrey}>Yes {<Text style={styles.text}> {yesCount} </Text>} </Text>
                    <View style={{ marginLeft: '10%' }}></View>
                    <Text style={commonStyles.secondaryTextGrey}>No {<Text style={styles.text}> {noCount} </Text>} </Text>
                </View>
                <EmptySpace />
                <View style={styles.voteMessage}>
                    <Text style={commonStyles.primaryTextOrange}>Vote</Text>
                    {votingStatus && <View style={{ marginTop: 13, marginLeft: 3 }}><Text style={commonStyles.smallTextRed}>(Voting period is over for this proposal)</Text></View>}
                </View>

                <View style={styles.bottomSection}>
                    <Button
                        style={commonStyles.doubleButton}
                        onPress={() => { handleVote(true) }}
                        status='success'
                        disabled={votingStatus}>
                        YES
                    </Button>
                    <Button
                        style={commonStyles.doubleButton}
                        onPress={() => { handleVote(false) }}
                        status='danger'
                        disabled={votingStatus}>
                        NO
                    </Button>
                </View>
            </View>
        </View>
    )
}

export default ProposalCardDetail

const styles = StyleSheet.create({
    card: {
        // flex: 1,
        margin: 4,
    },
    header: {
        maxWidth: '80%',
        color: '#404248'
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: '10%'
    },
    voteMessage: {
        flexDirection: 'row'
    },
    text: {
        color: '#9C9DA0',
        paddingLeft: 6
    },
})
