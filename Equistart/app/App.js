import React from 'react';
import { NavigationContainer, CommonActions, StackActions, NavigationActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Tab } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';
import { DaoScreens, WalletScreens, InstructionScreens, TokenScreens, CrowdsaleScreens, GovernanceScreens } from './src/navigation/StackConfig';
import Navigator, { navType } from './src/navigation/Navigator';
import CustomSideBarMenu from './src/components/CustomSideBarMenu';
import { withWalletConnect } from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';


LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const Drawer = createDrawerNavigator();

const App = () => {

  const DaoNavigator = ({ navigation }) => (
    <Navigator screens={DaoScreens} navigation={navigation} />
  );

  const WalletNavigator = ({ navigation }) => (
    <Navigator screens={WalletScreens} navigation={navigation} />
  );

  const InstructionNavigator = ({ navigation }) => (
    <Navigator screens={InstructionScreens} navigation={navigation} type={navType.TAB} /> 
  );

  const TokenNavigator = ({ navigation }) => (
    <Navigator screens={TokenScreens} navigation={navigation} /> 
  );

  const CrowdsaleNavigator = ({ navigation }) => (
    <Navigator screens={CrowdsaleScreens} navigation={navigation} /> 
  )

  const GovernanceNavigator =({navigation}) => (
    <Navigator screens={GovernanceScreens} navigation={navigation}/>
  )

  return (
    // <WalletConnectProvider
    //   storageOptions={{
    //     asyncStorage: AsyncStorage,
    //   }}

    //   // bridge="https://bridge.walletconnect.org"
    //   // clientMeta={{
    //   //   description: 'Connect with WalletConnect',
    //   //   url: 'https://www.google.com',
    //   //   icons: ['https://walletconnect.org/walletconnect-logo.png'],
    //   //   name: 'WalletConnect',
    //   //   apiKey: '627f76522696909ec5ed72b3abad15b9'
    //   // }}
    //   // redirectUrl={Platform.OS === 'web' ? window.location.origin : 'equistart://'}

    //   rpcUrl="https://alfajores-forno.celo-testnet.org"
    //   >
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <NavigationContainer>
          <Drawer.Navigator
            screenListeners={({navigation, route}) => ({
              drawerItemPress: () => {
                if(route.name === 'Wallet'){
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: "Wallet" }],
                    }),
                  );
                  navigation.navigate('Wallet', {screen: 'WalletHomeScreen'});
                }
              }
            })}
            screenOptions={{
              drawerStyle: {
                backgroundColor: '#1d2023',
                width: 280,
              },
              drawerActiveTintColor: '#E4C2A6',
              drawerItemStyle: {borderRadius: 30},
              drawerLabelStyle: {paddingLeft: 40},
              drawerInactiveTintColor: '#FFFFFF'
            }}
            drawerContent={props => <CustomSideBarMenu {...props} />}
          >
            <Drawer.Screen
              name="Tokens"
              component={TokenNavigator}
              options={{ headerShown: false }}
            />
            {/* <Drawer.Screen
              name="Projects"
              component={DaoNavigator}
              options={{ headerShown: false }}
            /> */}
            <Drawer.Screen
              name="Crowdsale"
              component={CrowdsaleNavigator}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="Governance"
              component={GovernanceNavigator}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="Wallet"
              component={WalletNavigator}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="Instructions"
              component={InstructionNavigator}
              options={{ headerShown: false }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

function CustomBottomSheet({
  walletServices,
  visible,
  connectToWalletService,
  uri,
}) {
  const renderContent = React.useCallback(() => {
    //   return <Text>Hello</Text>;
    // });

    return walletServices.map((walletService, i) => (
      <TouchableOpacity style={{ backgroundColor: "#fff" }} key={`i${i}`} onPress={() => connectToWalletService(walletService, uri)}>
        <Image source={{ uri: walletService.logo }} />
        <Text>{walletService.name}</Text>
      </TouchableOpacity>
    ));
  }, [walletServices, uri]);
  const sheetRef = React.useRef(null);
  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[450, 300, 0]}
      borderRadius={10}
      renderContent={renderContent}
    />
  );
}

export default withWalletConnect(App, {
  redirectUrl:
    Platform.OS === 'web' ? window.location.origin : 'app://WalletHomeScreen',
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
  rpc: {
    44787: "https://alfajores-forno.celo-testnet.org",
    // 42220: "https://forno.celo.org",
  },

  //uri:"0e46b69-d0cc-4b3e-b6a2-cee442f97188@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=627f76522696909ec5ed72b3abad15b9"
  //bridge: "https://bridge.walletconnect.org/info"
  //url: "wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=627f76522696909ec5ed72b3abad15b9",
  //apiKey: '627f76522696909ec5ed72b3abad15b9',
  //rpcUrl: 'https://alfajores-forno.celo-testnet.org',
  //renderQrcodeModal: RenderQrcodeModalProps => <CustomBottomSheet {...RenderQrcodeModalProps} />,

});