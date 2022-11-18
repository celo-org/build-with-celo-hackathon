// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import commonStyles from '../commonStyles';
import { COLORS } from '../colors';
import EmptySpace from './EmptySpace';
import { Button, Icon } from '@ui-kitten/components';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import { formatAddress_1 } from '../services/FormatterService';
import TextToClipBoard from '../components/TextToClipBoard';

const CustomSidebarMenu = props => {
  const connector = useWalletConnect();

  const copyToClipboard = (address) => {
    Clipboard.setString(address);
    Toast.show('Wallet address copied to clipboard!')
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.customItem}>
      <EmptySpace space={5}/>
        <Image source={require('../../assets/images/app_logo.png')} style={{height: 80, width: 80}} />
        <Text style={commonStyles.primaryTextWhite}>EQUISTART</Text>
        <Text style={commonStyles.tertiaryTextOrange}>Decenteralising Equity</Text>
        <EmptySpace />
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      {connector.connected &&
      <View style={{margin: '10%'}}>
        <Text style={commonStyles.secondaryTextOrange}>
          Wallet Address
        </Text>
        <TextToClipBoard text={connector.accounts[0]} textFormatter={formatAddress_1} />
      </View>}
      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          status="warning"
          onPress={() => Linking.openURL('https://github.com/t-phoenix/equistart')}>
          Github
          <Icon
            style={styles.icon}
            fill="#FFFFFF"
            name='external-link-outline'
          />
        </Button>
        <Button
          style={commonStyles.doubleButton}
          status="warning"
          onPress={() => Linking.openURL('https://explorer.celo.org/alfajores/')}>
          Explorer
          <Icon
            style={styles.icon}
            fill="#FFFFFF"
            name='external-link-outline'
          />
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  icon: {
    width: 12,
    height: 12,
  },
  customItem: {
    justifyContent: 'center',
    backgroundColor: '#121314',
    // borderColor: '#e4c2a6',
    borderRadius: 20,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    // borderWidth: 1,
    // borderBottomWidth: 1,
    alignItems: 'center',
    margin: 8
  },
  creatorContainer: {
    alignItems: 'center',
  },
  logoBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 32,
  },
});

export default CustomSidebarMenu;
