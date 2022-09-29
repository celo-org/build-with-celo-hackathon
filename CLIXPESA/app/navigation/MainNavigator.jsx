import React from 'react'
import { Box, Text, Avatar, Pressable, HStack } from 'native-base'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Icon from 'react-native-remix-icon' //Fix/Add types

//Screens
import { HomeScreen, DummyScreen } from 'clixpesa/features/essentials'
import { AccountScreen } from 'clixpesa/features/account'
import { LoansHomeScreen } from 'clixpesa/features/microloans'
import { SpacesHomeScreen } from 'clixpesa/features/spaces'

const MainStack = createNativeStackNavigator()

export default function MainNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <MainStack.Group screenOptions={{ presentation: 'modal' }}>
        <MainStack.Screen name="Account" component={AccountScreen} />
        <MainStack.Screen name="DummyModal" component={DummyScreen} />
      </MainStack.Group>
    </MainStack.Navigator>
  )
}

//creating a bottom tabs navigator
const BottomTab = createBottomTabNavigator()

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { height: 60 },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'home-3-fill' : 'home-3-line'}
              bgc={focused ? '#99F6E4' : '#fff'}
              color="#0F766E"
            />
          ),
          tabBarLabel: () => (
            <Text _light={{ color: '#0F766E' }} fontSize="xs" mb="0.5">
              Home
            </Text>
          ),
          headerLeft: () => <AccPressable />,
          headerRight: () => <HeaderRightIcons />,
        })}
      />
      <BottomTab.Screen
        name="Spaces"
        component={SpacesHomeScreen}
        options={() => ({
          title: 'Spaces',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'wallet-3-fill' : 'wallet-3-line'}
              bgc={focused ? '#99F6E4' : '#fff'}
              color="#0F766E"
            />
          ),
          tabBarLabel: () => (
            <Text _light={{ color: '#0F766E' }} fontSize="xs" mb="0.5">
              Spaces
            </Text>
          ),
          headerLeft: () => <AccPressable />,
          headerRight: () => <HeaderRightIcons />,
        })}
      />
      <BottomTab.Screen
        name="Loans"
        component={LoansHomeScreen}
        options={() => ({
          title: 'Loans',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'bar-chart-2-fill' : 'bar-chart-2-line'}
              bgc={focused ? 'primary.200' : '#fff'}
              color="#0F766E"
            />
          ),
          tabBarLabel: () => (
            <Text _light={{ color: '#0F766E' }} fontSize="xs" mb="0.5">
              Loans
            </Text>
          ),
          headerLeft: () => <AccPressable />,
          headerRight: () => <HeaderRightIcons />,
        })}
      />
    </BottomTab.Navigator>
  )
}

function TabBarIcon(props) {
  return (
    <Box bg={props.bgc} rounded="2xl" px="5" py="1" mt="1">
      <Icon size={24} {...props} />
    </Box>
  )
}

function AccPressable() {
  const navigation = useNavigation()
  return (
    // fix avatar text color to primary.700
    <Pressable
      onPress={() => navigation.navigate('Account')}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Avatar
        bg="#0F766E"
        ml="2"
        source={{
          uri: 'https://images.unsplash.com/photo-1592598015799-35c84b09394c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        }}
        size="sm"
      >
        AK
      </Avatar>
    </Pressable>
  )
}

function HeaderRightIcons() {
  const navigation = useNavigation()
  return (
    <HStack space="5" mr="3">
      <Pressable
        onPress={() => navigation.navigate('DummyModal')}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <Icon size={24} name="donut-chart-fill" />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('DummyModal')}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <Icon size={24} name="star-fill" />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('DummyModal')}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <Icon size={24} name="notification-4-fill" />
      </Pressable>
    </HStack>
  )
}
