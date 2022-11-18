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

export default function DAOSuiteInfo({navigation}) {
  return (
    <SafeAreaView style={commonStyles.pageView}>
      <ScrollView>
        <View>
          <View style={styles.contentBox}>
            <Text style={styles.headerText}>Aim</Text>
            <Text style={styles.descriptionText}>
              This application helps users to make their project ownable
              and managable on a public blockchain using ERC-20 token standard.
            </Text>
          </View>

          <View style={styles.contentBox}>
            <Text style={styles.headerText}>How to use?</Text>
            <Text style={styles.descriptionText}>
              - Step1: Setup Wallet using Alfajores, if the balance is reflected you got that right. {'\n'}
              - Step2: Choose a tokenomics strategy and Create your ERC20 token.{'\n'}
              - Step3: For every round you can create a crowdsale to raise funding, don't forget to transfer funds to the contract address.{'\n'}
              - Step4: Create you governor to manage the funds, you can send all your funds to TIMELOCK contract address.{'\n'}
              {'\n'}
              - Navigate to respective Instruction Screen for User Guidance.
            </Text>


            
          </View>

          <View style={styles.contentBox}>
            <Text style={styles.headerText}>Under the Hood</Text>
            <Text style={styles.descriptionText}>
              - This dapp uses Openzeppelin Standard Smart Contracts.{'\n'}
              - ERC20 contracts also has ERC20Votes and ERC20 Permit functionalities. {'\n'}
              - Crowdsale Contract is preliminary and development is in progress.{'\n'}
              - Governor Contract is to be depployed with an ERC20 token contract and uses timelock behind the interface.{'\n'}
            </Text>
            
          </View>

          <View style={styles.contentBox}>
            <Text style={styles.headerText}>Future Work</Text>
            <Text style={styles.descriptionText}>
              - Smart Contract Development for Advance Crowdsale and AMMs/LPs{'\n'}
              - Roadmap for the future of this Project.{'\n'}
             {'\n'}
              - We'll be shortly releasing on Mainnet and launch Equistart token. {'\n'}
            </Text>
            
          </View>
          

          

          <View style={styles.contentBox}>
            <Text style={styles.specialText}>If your are interested to fund/ Join the project, please contact the developers.</Text>
            <Text style={styles.specialText}>Github link is in the Drawer Naviator.</Text>
            <Text style={styles.specialText}>Thank You !</Text>
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
