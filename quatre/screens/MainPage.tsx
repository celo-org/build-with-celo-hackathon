import { StyleSheet, Text, View, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useColorScheme from '../hooks/useColorScheme';
import { useNavigation } from "@react-navigation/native";
import Colors from '../constants/Colors';
import React from 'react'
import HomeScreen from "./HomeScreen";
import FinanceScreen from "./FinanceScreen";
import InvestScreen from "./InvestScreen";
import DigDaoScreen from "./DigDaoScreen";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const BottomTab = createBottomTabNavigator<RootTabParamList>();
const MainPage = () => {
  const colorScheme = useColorScheme();

  // const navigation = useNavigation();

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, []);
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="view-dashboard" size={30}  color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Finance"
        component={FinanceScreen}
        options={{
           title: 'Finance',
           headerShown: false,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chart-areaspline" size={30} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Invest"
        component={InvestScreen}
        options={{
          title: 'Invest',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="finance" size={30} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="DigDao"
        component={DigDaoScreen}
        options={{
          title: 'DigDao',
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="idcard" size={30} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default MainPage

const styles = StyleSheet.create({})