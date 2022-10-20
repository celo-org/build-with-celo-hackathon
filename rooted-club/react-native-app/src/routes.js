import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Calendar } from './pages/Calendar/index';
import { Home } from './pages/Home/index';
import { Profile } from './pages/Profile/index';

import  Icon from 'react-native-vector-icons/Feather';

const { Navigator, Screen } = createBottomTabNavigator();


export function Routes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="Calendario"
          component={ Calendar }
          options={{ tabBarIcon: () => {
              return <Icon name="calendar" size={25} color="#000" />
            }
          }}
        />
        <Screen
          name="Home"
          component={ Home }
          options={{ tabBarIcon: () => {
            return <Icon name="home" size={25} color="#000" />
          }
          }}
        />
        <Screen
          name="Perfil"
          component={ Profile }
          options={{ tabBarIcon: () => {
            return <Icon name="user" size={25} color="#000" />
          }
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}