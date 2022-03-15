import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TestingScreen from './app/presentationLayer/TestingScreen';
import CreatePinScreen from './app/presentationLayer/CreatePinScreen';
import StatisticsScreen from './app/presentationLayer/StatisticsScreen';


const Stack = createNativeStackNavigator();

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
            name="Map"
            component={TestingScreen}
          />
          <Stack.Screen
            name="Testing"
            component={TestingScreen}
          />
        </Stack.Navigator>
    </NavigationContainer>
    
  )

};