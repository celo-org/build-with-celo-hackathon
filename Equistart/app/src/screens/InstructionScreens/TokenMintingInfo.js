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

export default function TokenMintingInfo({navigation}) {
  return (
    <SafeAreaView style={commonStyles.pageView}>
      <ScrollView>
        <View>
          <View style={styles.contentBox}>
            <Text style={styles.headerText}>TOKEN MINTING</Text>
            <Text style={styles.descriptionText}>
              Prerequisite: Understanding of tokenomics and why absolutely need a token on Blockchain. {'\n'}
            </Text>
          </View>

          <View style={styles.contentBox}>
            <Text style={styles.headerText}>How to mint?</Text>
            <Text style={styles.descriptionText}>
              - Under Tokens Screen Create a New Token.{'\n'}
              - Enter your Token's Name, Symbol and the amount of token you want to mint.{'\n'}
              - Currently support limited variable and once minted the coins cannot be minted more.{'\n'}
              - Find your token under the token list.{'\n'} 
              - Project Address is your Contract Address and is used in crowdsale and Governance Contract.{'\n'}
            </Text>
          </View>

          <View style={styles.contentBox}>
            <Text style={styles.headerText}>What to do?</Text>
            <Text style={styles.descriptionText}>
              The current dapp interface is limited, but will include a lot more in future{'\n'}
              {'\n'}
              - Check your Token Balance automatically. {'\n'}
              - Send/ Transfer tokens to other account or contract addresses.{'\n'}
              - Check any user/contract balance.{'\n'} 
              {'\n'}
              {'\n'}
              - The tokens have voting capabilities to be used for governance in future.{'\n'}
              - You can delegate votes to yourself or any other address.
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
