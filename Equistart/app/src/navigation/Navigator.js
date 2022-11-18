import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import commonStyles from '../commonStyles';
import { Button, Icon } from '@ui-kitten/components';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const navType = {
  STACK: 'stack',
  TAB: 'tab'
}

export default function Navigator({ screens, navigation, type = navType.STACK }) {
  const connector = useWalletConnect();
  const MenuAction = () => (
    <Button style={commonStyles.buttonGrey} accessoryLeft={<Icon name='menu-outline' />} onPress={() => navigation.openDrawer()} />
  );

  if (type === navType.STACK) {
    return (
      <Stack.Navigator>
        {screens.map(screen => (
          <Stack.Screen
            name={screen.name}
            component={screen.component}
            options={{
              headerTitle: () => (<View style={{ ...commonStyles.row, width: '100%' }}>
                <Text style={commonStyles.primaryTextOrange}>{screen.title}</Text>
                {connector.connected && <View style={styles.controlContainer}>
                  <Text style={commonStyles.tertiaryTextGreen}>Connected</Text>
                </View>}
              </View>),
              headerLeft: MenuAction,
              headerStyle: commonStyles.headerBarStyle,
            }}
            key={screen.name}
          />
        ))}
      </Stack.Navigator>
    );
  }
  else {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          swipeEnabled: true,
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: 'orange',
          tabBarLabelPosition: 'beside-icon',
          tabBarLabelStyle: {
            fontSize: 12,
            marginLeft: 0,
          },
          tabBarIconStyle: { display: "none" },
          tabBarItemStyle: styles.ItemStyle
        }}
      >
        {screens.map(screen => (
          <Tab.Screen
            name={screen.name}
            component={screen.component}
            options={{
              headerTitle: () => (<View style={{ ...commonStyles.row, width: '100%' }}>
                <Text style={commonStyles.primaryTextOrange}>{screen.title}</Text>
                {connector.connected && <View style={styles.controlContainer}>
                  <Text style={commonStyles.tertiaryTextGreen}>Connected</Text>
                </View>}
              </View>),
              headerLeft: MenuAction,
              headerStyle: commonStyles.headerBarStyle,
            }}
            key={screen.name}
          />
        ))}
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1d2023',
  },
  controlContainer: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(41,164,126,0.05)',
    borderColor: '#29A47E',
    borderWidth: 1,
    borderRadius: 20,
  },
  ItemStyle: {
    marginHorizontal: 4,
    marginVertical: 8,
    paddingHorizontal:2,
    backgroundColor: 'rgba(41,164,126,0.1)',
    borderRadius: 18
  }
});
