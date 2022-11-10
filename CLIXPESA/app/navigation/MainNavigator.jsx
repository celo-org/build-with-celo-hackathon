import React from 'react'
import { Box, Text, Avatar, Pressable, HStack } from 'native-base'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Icon from 'react-native-remix-icon' //Fix/Add types

//Screens
import { HomeScreen, DummyScreen } from 'clixpesa/features/essentials'
import { AllTokensScreen } from 'clixpesa/features/wallet'
import { AccountScreen } from 'clixpesa/features/account'
import {
  LoansTabNavigator,
  AllLoansScreen,
  LoanInfoScreen,
  LoanDetailsScreen,
  ApplyLoanScreen,
  CreateOfferScreen,
  FilterByAmountScreen,
  FundLoanScreen,
} from 'clixpesa/features/microloans'
import {
  SpacesHomeScreen,
  RoscaHomeScreen,
  SelectContactsScreen,
  CustomizeGroupScreen,
  CustomizePersonalScreen,
  SetPersonalGoalScreen,
  PersonalHomeScreen,
  AddPersonalFundScreen,
  WithdrawFundScreen,
  SetRoscaGoalScreen,
  FundRoundScreen,
  CreateSpaceScreen,
} from 'clixpesa/features/spaces'
import { useSelector } from 'react-redux'

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
        <MainStack.Screen
          name="RoscaHome"
          component={RoscaHomeScreen}
          options={({ route }) => ({
            unmountOnBlur: true,
            roscaAddress: route.params.roscaAddress,
          })}
        />
        <MainStack.Screen name="selectContacts" component={SelectContactsScreen} />
        <MainStack.Screen name="customizeGroup" component={CustomizeGroupScreen} />
        <MainStack.Screen name="setRoscaGoal" component={SetRoscaGoalScreen} />
        <MainStack.Screen name="fundRound" component={FundRoundScreen} />
        <MainStack.Screen name="DummyModal" component={DummyScreen} />
        <MainStack.Screen name="PersonalHome" component={PersonalHomeScreen} />
        <MainStack.Screen name="setPersonalGoal" component={SetPersonalGoalScreen} />
        <MainStack.Screen name="CustomizePersonal" component={CustomizePersonalScreen} />
        <MainStack.Screen name="addPersonalFund" component={AddPersonalFundScreen} />
        <MainStack.Screen name="withdrawFund" component={WithdrawFundScreen} />
        <MainStack.Screen name="createSpace" component={CreateSpaceScreen} />

        <MainStack.Screen
          name="AllTokens"
          component={AllTokensScreen}
          options={({ route }) => ({
            unmountOnBlur: true,
            tempBal: route.params.tempBal,
          })}
        />
        <MainStack.Screen name="LoanHome" component={LoanInfoScreen} />
        <MainStack.Screen name="LoanDetails" component={LoanDetailsScreen} />
        <MainStack.Screen name="AllLoans" component={AllLoansScreen} />
        <MainStack.Screen name="fromOffers" component={FilterByAmountScreen} />
        <MainStack.Screen name="applyLoan" component={ApplyLoanScreen} />
        <MainStack.Screen name="createOffer" component={CreateOfferScreen} />
        <MainStack.Screen name="fundLoan" component={FundLoanScreen} />
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
          unmountOnBlur: true,
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
              name={focused ? 'safe-2-fill' : 'safe-2-line'}
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
        component={LoansTabNavigator}
        options={() => ({
          title: 'Loans',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'hand-coin-fill' : 'hand-coin-line'}
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
      <BottomTab.Screen
        name="Account"
        component={AccountScreen}
        options={() => ({
          title: 'My Account',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'user-3-fill' : 'user-3-line'}
              bgc={focused ? 'primary.200' : '#fff'}
              color="#0F766E"
            />
          ),
          tabBarLabel: () => (
            <Text _light={{ color: '#0F766E' }} fontSize="xs" mb="0.5">
              Account
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
  const { initials } = useSelector((s) => s.essential.userDetails)
  const navigation = useNavigation()
  return (
    // fix avatar text color to primary.700
    <Pressable
      onPress={() => navigation.navigate('Account')}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Avatar bg="#0F766E" ml="2" size="sm">
        {initials}
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
