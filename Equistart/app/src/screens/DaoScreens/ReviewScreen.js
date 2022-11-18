import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import commonStyles from '../../commonStyles';
import { Button, Text, Modal, Input, Card } from '@ui-kitten/components';
import { Dimensions } from 'react-native';
import DaoCardSummary from '../../components/DaoCardSummary';

export default function ReviewScreen({navigation}) {
  const data = [
    {key: 'phone', value: '810599599'},
    {key: 'title', value: 'Equistart'},
    {key: 'description', value: 'Equity sharing on Blockchain'},
    {key: 'symbol', value: 'EQI'},
    {key: 'token', value: '21000000'},
    {key: 'deposit', value: '2100$'},
  ];
  const teamData = [
    {
      key: '91873173782',
      address: '0x223112ken2k1nk2ns',
      token: '7000000',
      amount: '700',
    },
    {
      key: '12873819733',
      address: '0xbqiwebdu3hdu39d93',
      token: '7000000',
      amount: '700',
    },
    {
      key: '38912738127',
      address: '0xdewdbwidibedjwjis',
      token: '7000000',
      amount: '700',
    },
  ];

  const renderRow = ({item}) => {
    return (
      <View style={{fdisplay: 'flex', flexDirection: 'row', paddingTop: 8}}>
        <Text>{item.key}:</Text>
        <Text>{item.value}</Text>
      </View>
    );
  };

  const renderTeam = ({item}) => {
    return (
      <SafeAreaView
        style={{
          fdisplay: 'flex',
          flexDirection: 'row',
          paddingTop: 8,
          justifyContent: 'space-between',
        }}>
        <Text>{item.key}</Text>
        <Text>{item.address}</Text>
        <Text>{item.token}</Text>
        <Text>{item.amount}</Text>
      </SafeAreaView>
    );
  };

  function handleInstall(){
      navigation.navigate('DaoList')
  }

  return (
    <View style={commonStyles.pageView}>
      <View style={commonStyles.pageContent}>
        <Text style={commonStyles.secondaryTextGrey}>Review Your Project Details</Text>
        {/* <DaoCardSummary daoData={data} navigation={navigation} withButton={false} /> */}
        <FlatList
          style={{padding: 4, height: '30%'}}
          data={data}
          renderItem={renderRow}
          keyExtractor={item => item.key}
          scrollEnabled={false}
        />
        <Text style={commonStyles.secondaryTextGrey}>Your core Team Details</Text>
        <FlatList
          style={{padding: 4, height: '40%'}}
          data={teamData}
          renderItem={renderTeam}
          keyExtractor={item => item.key}
          scrollEnabled={false}
        />
      </View>
      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.navigate('cofounderDetails')}
          status='warning'>
          Back
        </Button>
        <Button
          style={commonStyles.doubleButton}
          onPress={()=>handleInstall()}
          >
          Install on Blockchain
        </Button>
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  buttonGroup: {
    margin: 5,
    width: windowWidth / 2.2
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
});
