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

export default function AlfajoresWalletInfo({navigation}) {
  return (
    <SafeAreaView style={commonStyles.pageView}>
      <ScrollView>
        <View>
          <View style={styles.contentBox}>
            <Text style={commonStyles.primaryTextWhite}>Alfajores Wallet</Text>
            <Text style={styles.descriptionText}>
              - Equistart is a pure dApp, connected only with alfajores test network{"\n"}
              - Alfajores is the testnet for celo blockchain, used in
                development and testing.{"\n"}
              - Alfajores team also maintains a cryptowallet named alfajores on
              playstore.{"\n"}
            </Text>
          </View>
          <View style={styles.buttonBox}>
            <Button
              style={commonStyles.singleButton}
              onPress={() =>
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=org.celo.mobile.alfajores',
                )
              }>
              Alfajores Playstore
            </Button>
          </View>

          <View style={styles.contentBox}>
            <Text style={styles.descriptionText}>
              {' '}
              - download this wallet, setup it, and fund it using alfajores{'\n'}
              - you just need to copy your wallet address from alfajores and paste it in the faucet to add funds.{'\n'}
            </Text>
          </View>

          <View style={styles.buttonBox}>
            <Button
              style={commonStyles.singleButton}
              onPress={() =>
                Linking.openURL('https://celo.org/developers/faucet')
              }>
              Alfajores Faucet
            </Button>
          </View>
          <View style={{height: 20}} />

          <TouchableOpacity
            style={styles.buttonBox}
            onPress={() =>
              Linking.openURL('https://www.youtube.com/watch?v=y-wXijAadiU')
            }>
            <Text style={styles.hyperlinkBtn}>
              Use this Youtube link if you need more help(works similiar to
              celo)
            </Text>
          </TouchableOpacity>
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
