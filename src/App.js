import * as React from 'react';
import { View, Text, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TestingScreen from './app/presentationLayer/TestingScreen';
import CreatePinScreen from './app/presentationLayer/CreatePinScreen';
import StatisticsScreen from './app/presentationLayer/StatisticsScreen';
import PinScreen from './app/presentationLayer/PinScreen';
import SearchScreen from './app/presentationLayer/SearchScreen';
import MapScreen from './app/presentationLayer/MapScreen';
import PinsScreen from './app/presentationLayer/PinsScreen';
import ProfileScreen from './app/presentationLayer/ProfileScreen';
import { getRequest, postRequest } from './requestAPI';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

async function Home() {
  return (
    <Tab.Navigator 
    screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen options={{
            tabBarIcon: ({size}) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={require("./assets/statistics.png")}
                  resizeMode={'cover'}
                />
              );
            },
          }}
          name="Statistiscs"
          component={StatisticsScreen} />
      <Tab.Screen options={{
        tabBarIcon: ({size}) => {
          return (
            <Image
              style={{ width: 20, height: size }}
              source={require("./assets/search.png")}
              resizeMode={'cover'}
            />
          );
        },
      }} tabBarShowLabel="false" name="Search" component={SearchScreen} />
      <Tab.Screen options={{
        tabBarIcon: ({size}) => {
          return (
            <Image
              style={{ width: 30, height: size }}
              source={require("./assets/map.png")}
              resizeMode={'cover'}
            />
          );
        },
      }} name="Map" component={MapScreen} />
      <Tab.Screen options={{
        tabBarIcon: ({size}) => {
          return (
            <Image
              style={{ width: 20, height: 20 }}
              source={require("./assets/ubication.png")}
              resizeMode={'cover'}
            />
          );
        },
      }} name="Pins" component={PinsScreen} />
      <Tab.Screen options={{
        tabBarIcon: ({size}) => {
          return (
            <Image
              style={{ width: 20, height: 20 }}
              source={require("./assets/profile.png")}
              resizeMode={'cover'}
            />
          );
        },
      }} name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}


export default function App() {

  

  return (
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={"Testing"}
          >
          <Stack.Screen
            name="Create Pin"
            component={CreatePinScreen}
          />
          <Stack.Screen
            name="Statistics"
            component={StatisticsScreen}
          />
          <Stack.Screen
            name="Pin"
            component={PinScreen}
          />
          <Stack.Screen
            name="Testing"
            component={Home}
          />
        </Stack.Navigator>
    </NavigationContainer>
    
  )

};