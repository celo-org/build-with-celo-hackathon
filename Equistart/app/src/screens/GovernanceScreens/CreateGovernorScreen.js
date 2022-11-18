import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, Image} from 'react-native';
import {
  Button,
  Text,
  Layout,
  Card,
  Icon,
  Spinner,
  Input,
} from '@ui-kitten/components';
import {backgrounds, colorPairs} from '../../colors';
import EmptySpace from '../../components/EmptySpace';
import CardList from '../../components/CardList';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {
  deployTimelock,
  deployGovernor,
  updateGovernorFactory,
} from '../../services/GovernorServices/GovernorFactoryService';

import commonStyles from '../../commonStyles';
import {COLORS} from '../../colors';

const num = Math.floor(Math.random() * 100) % colorPairs.length;

export default function CreateGovernorScreen({navigation}) {
  const connector = useWalletConnect();
  const [tokenAddr, setTokenAddr] = React.useState('');
  const [delay, setDelay] = React.useState('');
  const [timelockAddr, setTimelockAddr] = React.useState('');
  const [governorAddr, setGovernorAddr] = React.useState('');
  const [buttonSwitch, setButtonSwitch] = React.useState(0);

  async function createTimelock() {
    //TODO: CREATE input for these parameters
    // const delay = 3600;
    //WARNING:

    const proposers = [];
    const executors = ['0x0000000000000000000000000000000000000000'];

    deployTimelock(connector, delay, proposers, executors)
      .then(result => {
        console.log('Deploying TIMELOCK:', result);
        setTimelockAddr(() => result);
        setButtonSwitch(() => 1);
      })
      .error(err => {
        console.error('Erroe while deploying Timelock', err);
      });
  }

  async function createGovernor() {
    deployGovernor(connector, timelockAddr, tokenAddr)
      .then(result => {
        console.log('Governor Deployed:', result);
        setGovernorAddr(() => result);
        setButtonSwitch(() => 2);
      })
      .error(err => {
        console.log('Error while deploying Governor:', err);
      });
  }

  async function updateFactory() {
    updateGovernorFactory(connector, governorAddr, timelockAddr, tokenAddr)
      .then(result => {
        console.log('Updating Factory:', result);
        setButtonSwitch(() => 3);
      })
      .error(err => {
        console.log('Error while updating Governor Factory:', err);
      });
  }

  // async function grantRoleInTimelock() {
  //   grantProposerToGovernor(connector, governorAddr, timelockAddr)
  //     .then(result => {
  //       console.log('Granting Proposer to Governor. Transaction: ', result);
  //       navigation.goBack();
  //     })
  //     .error(err => {
  //       console.log('Error while updating TImelock Settings:', err);
  //     });
  // }

  return (
    <SafeAreaView style={commonStyles.pageView}>
      {/* <Text>TokenListing Screen</Text> */}

      <ScrollView
        style={commonStyles.pageContent}
        showsVerticalScrollIndicator={false}>
        <View style={commonStyles.outerCard}>
          <View
            style={{
              ...commonStyles.innerCard,
              backgroundColor: colorPairs[num].background,
              flexDirection: 'row',
            }}>
            <View>
              <Text style={{color: colorPairs[num].text, ...styles.heading}}>
                {' '}
                Add Governor{' '}
              </Text>
              <Text style={{color: colorPairs[num].text, ...styles.heading}}>
                {' '}
                Details
              </Text>
            </View>
            <View>
              <Image
                style={{
                  width: 140,
                  height: 100,
                  resizeMode: 'contain',
                }}
                source={require('../../../assets/images/project_details.png')}
              />
            </View>
          </View>
          <View style={{margin: 8}}>
            <Text>Enter Token Address</Text>
            <Text>1st Deploy Timelock</Text>
            <Text>Timelock: {timelockAddr}</Text>
            <Text>2nd Deploy Governor</Text>
            <Text>Governor: {governorAddr}</Text>
            <Text>3rd Add To The App Governor List</Text>
            <Text>4th Grant Proposer Role to Governor</Text>
            <Text>Governor is Proposer</Text>
          </View>
        </View>
        {/* Add List Code Here */}
        <EmptySpace />

        {/* CREATE 3 MORE FIELDS
        TO REPLACE THE HARDCODED DATA in createGovernor */}
        <EmptySpace />
        <Input
          style={commonStyles.input}
          onChangeText={setDelay}
          value={delay}
          label={() => (
            <Text style={commonStyles.inputLabel}>Timelock Delay</Text>
          )}
          placeholder={'(seconds) Delay b/w Queue and Execution '}
        />
        <Input
          style={commonStyles.input}
          onChangeText={setTokenAddr}
          value={tokenAddr}
          label={() => (
            <Text style={commonStyles.inputLabel}>Token Address</Text>
          )}
          placeholder={'ERC20 Token Address'}
        />
      </ScrollView>
      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.goBack()}
          status="warning">
          Back
        </Button>
        <>
          {buttonSwitch == 0 ? (
            <Button style={commonStyles.singleButton} onPress={createTimelock}>
              Create Timelock
            </Button>
          ) : (
            <></>
          )}
          {buttonSwitch == 1 ? (
            <Button style={commonStyles.singleButton} onPress={createGovernor}>
              Create Governor
            </Button>
          ) : (
            <></>
          )}
          {buttonSwitch == 2 ? (
            <Button style={commonStyles.singleButton} onPress={updateFactory}>
              Update List
            </Button>
          ) : (
            <></>
          )}
          {/* {buttonSwitch == 3 ? (
            <Button
              style={commonStyles.singleButton}
              onPress={grantRoleInTimelock}>
              Grant Timelock Role
            </Button>
          ) : (
            <></>
          )} */}
        </>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
