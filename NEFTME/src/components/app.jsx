import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store';
import Splash from './splash';
import Start from './start';
import Home from './home';
import CreatorProfile from './profile/creator_profile';
import EditProfile from './profile/edit_profile';
import MyProfile from './profile/my_profile';
import NFTDetail from './nft_detail';
import CreateNFT from './create_nft';
import Search from './search';

const Stack = createNativeStackNavigator();

export default () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreatorProfile" component={CreatorProfile} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="NFTDetail" component={NFTDetail} />
        <Stack.Screen name="CreateNFT" component={CreateNFT} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);
