import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import commonStyles from '../../commonStyles';
import {COLORS} from '../../colors';
import {Button} from '@ui-kitten/components';

const windowHeight = Dimensions.get('window').height;

export default function CrowdsaleInfo({navigation}) {
  return (
    <SafeAreaView style={commonStyles.pageView}>
      <ScrollView>
        <View>
          <View style={styles.contentBox}>
            <Text style={styles.headerText}>Crowdsale</Text>
            <Text style={styles.descriptionText}>
              Token Sale is a very complex mechanism and need to consider many variables.{'\n'}
              But to simulate we bought up a very primitive crowdsale mechanism
            </Text>
          </View>

          <View style={styles.contentBox}>
            <Text style={styles.headerText}>Host a Sale</Text>
            <Text style={styles.descriptionText}>
              - Create New Token Sale{'\n'}
              - Use previously created Token Contract Address. {'\n'}
              - Mention Beneficiary address to collect the raised funds.{'\n'}
              - Set the rate at which you want to sale the tokens.{'\n'}
              - Rate is set in wei: i.e if rate == 2, then 1 wei will get you 2 tokens.{'\n'}
              - 1ETH == 10**18 wei.{'\n'}
            </Text>
          </View>

          <View style={styles.contentBox}>
            <Text style={styles.headerText}>Sale Scren</Text>
            <Text style={styles.descriptionText}>
              - Interested investors can buy tokens from this sale.{'\n'}
              - Contract Information and Balances are displayed automatically. {'\n'} 
              - Transfer these funds to the DAO treasury, i.e. timelock Contract.{'\n'}
              - Use the Governor to govern the use of these funds. {'\n'}
              - NOTE: Your project token can also be kept in treasury.{'\n'}
              {'\n'}
              {'\n'}
              NOTE: Admins may send tokens to the timelock address, which acts as the treasury for Governor{'\n'}
            </Text>
          </View>

        

         
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentBox: {
    //backgroundColor:'#fff',
    margin: '5%',
    padding: '5%',
  },
  buttonBox: {alignItems: 'center', paddingHorizontal: 8},
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'white',
  },
  specialText: {
      marginVertical:8,
      fontSize: 16,
      color: COLORS.robinsEggBlue,

  },
  hyperlinkBtn: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});
