import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Button, Text, Icon, Spinner, Input } from '@ui-kitten/components';
import commonStyles from '../../commonStyles';
import { COLORS } from '../../colors';
import EmptySpace from '../../components/EmptySpace';

import {
  getProposerRole,
  getExecutorRole,
  getAdminRole,
  checkHasRole,
  grantTimelockRole,
} from '../../services/GovernorServices/MyGovernorService';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { formatAddress } from '../../services/FormatterService';
import TextToClipBoard from '../../components/TextToClipBoard';

export default function GovernorSettingScreen({ route, navigation }) {
  const connector = useWalletConnect();
  const [fetching, setFetching] = React.useState(false);
  const [roles, setRoles] = React.useState({
    proposer: '0x0000000000000000000000000000000000000000',
    executor: '0x0000000000000000000000000000000000000000',
    admin: '0x0000000000000000000000000000000000000000',
  });

  //   const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isWalletConnected, setIsWalletConnected] = React.useState(
    connector.connected,
  );

  const [roleAddr, setRoleAddr] = React.useState('');
  const [userAddr, setUserAddr] = React.useState('');
  const [roleResult, setRoleResult] = React.useState('---');
  const [grantResult, setGrantResult] = React.useState('---');
  //   const [treasuryBal, setTreasuryBal] = React.useState('Enter token address');

  const scrollViewRef = React.useRef();

  const governorData = route.params.data;

  React.useEffect(() => {
    setIsWalletConnected(connector.connected);
    console.log('Settings Screen:', governorData);
    getRoleAddresses();
  }, [connector.connected]);

  async function getRoleAddresses() {
    setFetching(true);
    // try {
    console.log('Hello');
    let propROLE = await getProposerRole(governorData.timelock);
    let execROLE = await getExecutorRole(governorData.timelock);
    let adminROLE = await getAdminRole(governorData.timelock);
    console.log('Timelock:');
    console.log(
      'Proposer:',
      propROLE,
      'executor:',
      execROLE,
      'admin:',
      adminROLE,
    );
    const allRoles = {
      proposer: propROLE,
      executor: execROLE,
      admin: adminROLE,
    };
    setRoles(() => allRoles);
    setFetching(false);
  }

  async function checkRole() {
    let result = await checkHasRole(governorData.timelock, roleAddr, userAddr);
    console.log('TRUE/FALSE: ', result);
    setRoleResult(() => String(result));
  }

  async function grantRole() {
    console.log("hellolollollo")
    let result = await grantTimelockRole(
      connector,
      governorData.timelock,
      roleAddr,
      userAddr,
    );
    console.log('Granting role', result);
    // setGrantResult(() => result);
  }

  return (
    <SafeAreaView style={commonStyles.pageView}>
      <ScrollView
        style={commonStyles.pageContent}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}>
        <View>
          {/* //TODO: print copyable role Addresses: admin, governor, executor
            //TODO: function to check 'hasRole'
            //TODO: function to 'grantRole'
            //TODO: function to 'renounceRole' */}
          <EmptySpace space={15} />
          <View>
            <View style={styles.infoRow}>
              <Text>PROPOSER: </Text>
              <TextToClipBoard text={roles.proposer} textFormatter={formatAddress} />
              <Button style={{ ...commonStyles.button, marginLeft: 'auto' }} size='small'
                onPress={() => getRoleAddresses(governorData)} disabled={!connector.connected} status="info">
                {fetching && <Spinner size='tiny' status='basic' />}
                {!fetching && "Refresh"}
              </Button>
            </View>
            <EmptySpace space={10} />
            <View style={styles.infoRow}>
              <Text>EXECUTOR: </Text>
              <TextToClipBoard text={roles.executor} textFormatter={formatAddress} />
            </View>
            <EmptySpace space={15} />
            <View style={styles.infoRow}>
              <Text>TIMELOCK_ADMIN: </Text>
              <TextToClipBoard text={roles.admin} textFormatter={formatAddress} />
            </View>
          </View>

          {/* {!isLoading && !roles.length && <View style={{ alignItems: 'center' }}><EmptySpace space={40} /><Text style={commonStyles.tertiaryTextGrey}>Error</Text></View>}
            {isLoading && <View style={{ alignItems: 'center' }}><EmptySpace space={50} /><Spinner status='basic' /></View>} */}
          <EmptySpace space={18} />
          <Input
            style={commonStyles.input}
            value={roleAddr}
            onChangeText={val => setRoleAddr(val)}
            placeholder="address"
            label={() => (
              <Text style={commonStyles.inputLabel}>Role Address</Text>
            )}
          />
          <Input
            style={commonStyles.input}
            value={userAddr}
            onChangeText={val => setUserAddr(val)}
            placeholder="address"
            label={() => (
              <Text style={commonStyles.inputLabel}>User or Contract</Text>
            )}
          />
          <View>
            <Text style={{ ...commonStyles.tertiaryTextGrey, marginLeft: 'auto' }}>Has Role : {roleResult}</Text>
            <EmptySpace style={{ marginLeft: 'auto' }} />
            <Button
              style={{ ...commonStyles.doubleButton, marginLeft: 'auto' }}
              onPress={checkRole} status='primary' appearance='outline'>
              Check Role
            </Button>
          </View>
          <EmptySpace space={12} />
          <View style={styles.container}>
            <Text style={styles.smallText}>Note: Grant Role only works for Admin</Text>
            <EmptySpace space={2} />
            <Button
              style={{ ...commonStyles.singleButton }}
              onPress={grantRole}
              status="primary">
              Grant Role
            </Button>
            <EmptySpace space={15} />
            <Text style={styles.mediumText}>Grant Role : {grantResult}</Text>
          </View>
          <EmptySpace space={18} />
        </View>
      </ScrollView>

      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.goBack()}
          status="warning">
          Back
        </Button>
        {/* <Button
          style={commonStyles.singleButton}
          onPress={() => {
            navigation.navigate('CreateProposalScreen', {
              data: route.params.data,
            });
          }}>
          Create Prosposal
        </Button> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: '#404248',
  },
  inputLabel: {
    color: '#000',
    fontWeight: 'bold',
  },
  infoButton: {
    width: '30%',
    marginLeft: '70%',
  },
  smallText: {
    fontSize: 10,
    color: 'grey',
  },
  mediumText: {
    fontSize: 12
  },
  smallButton: {},
  infoRow: {
    flexDirection: 'row',
  },
  container: {
    alignItems: "center",
  },
});
