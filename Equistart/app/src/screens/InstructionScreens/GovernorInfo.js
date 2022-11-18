import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import commonStyles from '../../commonStyles';
import {COLORS} from '../../colors';
import {Button} from '@ui-kitten/components';

const windowHeight = Dimensions.get('window').height;

export default function GovernorInfo({navigation}) {
  return (
    <SafeAreaView style={commonStyles.pageView}>
      <ScrollView>
        <View style={styles.contentBox}>
          <Text style={styles.headerText}>Governance</Text>
          <Text style={styles.descriptionText}>
            Governance Involves Governor, Timelock and many plugin smart contracts.{'\n'}
            Essential part to form a DAO is to setup an automated Govenor.
          </Text>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.headerText}>Create a Governor</Text>
          <Text style={styles.descriptionText}>
            - Use the ERC20 token Contract Address to help with voting weights.{'\n'}{'\n'}
            - Timelock delay is to be set in seconds. It only acts if proposal is passed and Queued.{'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            Governor Creation is automated in 4 signatory steps{'\n'}
            {'\n'}
                - Deploy Timelock Contract. {'\n'}{'\n'}
                - Use Timelock and ERC20 Contract addresses to deploy Governor. {'\n'}{'\n'}
                - Update the contract addresses in a factory Contract to list the project in frontend. {'\n'}{'\n'}
                - Grant Proposer Role to Governor in the timelock contract. {'\n'}{'\n'}
          </Text>
        </View> 

        {/* Proposal Life Cycle */}
        <View style={styles.contentBox}>
          <Text style={styles.headerText}>PROPOSAL LIFECYCLE</Text>
          <Text style={styles.descriptionText}>
            {'\n'}
            CREATE PROPOSAL{'\n'}
            {'\n'}
                - Address of the Token Contract which you want to spend from treasury.{'\n'}{'\n'}
                - Check the balance in treasry.{'\n'}{'\n'}
                - Enter Receivers Address, Amount, Description.{'\n'}{'\n'}
                - Proposal Threshold is set to 1 Token in ETH denomination. (1e18). {'\n'}{'\n'}
            {'\n'}
            {'\n'}
            If the transaction succeeds, new proposal should pop up under the proposal list interface. {'\n'}{'\n'}
            State 1: Active{'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            VOTING
            {'\n'}
            {'\n'}
            - Token Holders can start vote, Options: {'\n'}
            {'   '}- For {'\n'}
            {'   '}- Abstain {'\n'}
            {'\n'}
            - Don't forget to delegate votes to yourself after getting tokens, and check the Voting Power under "Tokens" Screen. {'\n'}
            {'\n'}
            - Sign with alfajores wallet to vote on your option.{'\n'}
            {'\n'}
            - Your votes should appear under Voting List for that proposal.{'\n'}
            {'\n'}
            - Quorum is 10% of the total tokens, voting period is 45818 blocks.{'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            After Voting Period, the proposal can take 3 states:{'\n'}{'\n'}
            State 2: Cancelled{'\n'}
            State 3: Defeated{'\n'}
            State 4: Succeeded{'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            TIMELOCK
            {'\n'}
            - Now if State 4: Succeded is the outcome, you will see an option to "QUEUE" the proposal on the interface.{'\n'}
            Anyone in the DAO can queue the proposal{'\n'}
            {'\n'}
            State 5: Queued.{'\n'}
            {'\n'}
            - At this stage the timelock starts and anyone not happy with the decision can leave the DAO.{'\n'}{'\n'}
            - After the set delay anyone can sign another transaction through "EXECUTE" button on the interface.{'\n'}{'\n'}
            State 7: Executed{'\n'}{'\n'}
            - And the amount would be transfered to the recipient from Governor Treasury(i.e. TImelock Contract).{'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            STATES OF PROPOSAL{'\n'}
            {'\n'}
            State 0: Pending{'\n'}
            State 1: Active{'\n'}
            State 2: Cancelled{'\n'}
            State 3: Defeated{'\n'}
            State 4: Succeded{'\n'}
            State 5: Queued{'\n'}
            State 6: Expired{'\n'}
            State 7: Executed{'\n'}
            {'\n'}
            {'\n'}
            NOTE: Admins may send tokens to the timelock address, which acts as the treasury for Governor{'\n'}

          </Text>
        </View> 

        <View style={styles.contentBox}>
          <Text style={styles.headerText}>Timelock Settings</Text>
          <Text style={styles.descriptionText}>
            - On the Governor Home screen you can navigate to Timelock Settings using ⚙️ button{'\n'}{'\n'}
            - You can check Admin, Proposer or Executor Role for the Governor.{'\n'}{'\n'}
            - Check if Governor Contract has proposer Role (done automatically while deploying Governor.{'\n'}{'\n'}
            - Everyone is granted executor Role (i.e. Address(0));{'\n'}{'\n'}
            - ADMIN can grant Role, or Renounce Roles (coming soon).{'\n'}{'\n'}
            - For the Governance to be automated, original admin should renounce his/her role from being ADMIN.{'\n'}{'\n'}
            {'\n'}
            {'\n'}
          </Text>
        </View> 




        {/* Timelock Setting  */}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentBox: {
    //backgroundColor:'#fff',
    margin: '4%',
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
    marginVertical: 8,
    fontSize: 16,
    color: COLORS.robinsEggBlue,
  },
  hyperlinkBtn: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});
