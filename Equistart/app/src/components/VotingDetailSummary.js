import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {Button, Text, Layout, Card} from '@ui-kitten/components';
import commonStyles from '../commonStyles';
import {backgrounds} from '../colors';
import EmptySpace from './EmptySpace';
import {formatAddress, formatNumber, formatNumWithDecimal, voteDecision} from '../services/FormatterService';

const VotingDetailSummary = ({cardData, navigation}) => {
  function openProject(data) {
    navigation.navigate('TokenHomeScreen', {data: data});
  }

  console.log('Voting Details inside Summary:', cardData);

  return (
    <View style={{...commonStyles.outerCard}}>
      <View
        style={{
          ...styles.innerCard,
          backgroundColor:
            backgrounds[Math.floor(Math.random() * 100) % backgrounds.length],
        }}>
          <View>
            <Text style={commonStyles.secondaryTextBlack}>
              {cardData.voter}
            </Text>
          </View>
          <EmptySpace />
          
      </View>
      <View style={styles.bottomContainer}>
        <Text style={commonStyles.tertiaryTextGrey}>Weight: {formatNumWithDecimal(cardData.weight, 18)}</Text>
        <Text style={commonStyles.tertiaryTextGrey}>Decision: {cardData.decision}</Text>
      </View>
    </View>
  );
};

export default VotingDetailSummary;

const styles = StyleSheet.create({
  bottomContainer: {
    padding: 10,
  },
  innerCard: {
    borderRadius: 15,
    backgroundColor: '#1F2122',
    borderColor: '#090E13',
    borderWidth: 1,
    padding: 8
  },
});
