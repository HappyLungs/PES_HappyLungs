import * as React from 'react';
import { View, Text, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'

import CreatePinScreen from './app/presentationLayer/CreatePinScreen';
import StatisticsScreen from './app/presentationLayer/StatisticsScreen';
import PinOwnerScreen from './app/presentationLayer/PinOwnerScreen';
import PinDefaultScreen from './app/presentationLayer/PinDefaultScreen';
import GeneralChatScreen from './app/presentationLayer/GeneralChatScreen';
import MapScreen from './app/presentationLayer/MapScreen';
import PinsScreen from './app/presentationLayer/PinsScreen';
import ProfileScreen from './app/presentationLayer/ProfileScreen';

import colors from './app/config/stylesheet/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator 
    screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen options={{
        tabBarIcon: () => {
          return (
            <Icon 
              name="chatbubble-outline" 
              style={{alignSelf:'center'}} 
              color={colors.secondary} 
              size={30}
            />
          );
        },
      }} tabBarShowLabel="false" name="General Chat" component={GeneralChatScreen} />
        <Tab.Screen options={{
          tabBarIcon: () => {
            return (
              <Image
                style={{ width: 30, height: 30 }}
                source={require("./assets/pin.png")}
                resizeMode={'cover'}
              />
            );
          },
        }} name="Pins" component={PinsScreen} />
      <Tab.Screen options={{
        tabBarIcon: () => {
          return (
            <Icon 
              name="earth" 
              style={{alignSelf:'center'}} 
              color={colors.secondary} 
              size={30}
            />
          );
        },
      }} name="Map" component={MapScreen} />
      <Tab.Screen options={{
        tabBarIcon: () => {
          return (
            <Icon 
              name="person-outline" 
              style={{alignSelf:'center'}} 
              color={colors.secondary} 
              size={30}
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
            name="Pin Owner View"
            component={PinOwnerScreen}
          />
          <Stack.Screen
            name="Pin Default View"
            component={PinDefaultScreen}
          />
          <Stack.Screen
            name="Testing"
            component={Home}
          />
        </Stack.Navigator>
    </NavigationContainer>
    
  )

};