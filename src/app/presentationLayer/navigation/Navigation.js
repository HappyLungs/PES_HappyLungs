import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	createStackNavigator,
	HeaderStyleInterpolators,
	TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import "react-native-gesture-handler";

//screens
import MapScreen from "../MapScreen";
import GeneralChatScreen from "../GeneralChatScreen";
import NewChatScreen from "../NewChatScreen";
import PinsScreen from "../PinsScreen";
import ProfileScreen from "../ProfileScreen";
import ProfileEditScreen from "../ProfileEditScreen";
import StatisticsScreen from "../StatisticsScreen";
import CreatePinScreen from "../CreatePinScreen";
import PinOwnerScreen from "../PinOwnerScreen";
import PinEditScreen from "../PinEditScreen";
import PinDefaultScreen from "../PinDefaultScreen";
import COLORS from "../../config/stylesheet/colors";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function RootStack() {
	return (
		<Stack.Navigator
			initialRouteName="MapScreen"
			screenOptions={{
				tabBarActiveTintColor: COLORS.green1,
				tabBarInactiveTintColor: COLORS.secondary,
				tabBarShowLabel: false,
				headerTintColor: COLORS.secondary,
				headerTitleAlign: "center",
				headerTitleStyle: {
					fontWeight: "bold",
					fontSize: 27,
				},
				headerShown: true,
			}}
		>
			<Stack.Screen
				name="MapScreen"
				component={MapScreen}
				options={{
					title: "Happy Lungs",
					headerShown: false,
				}}
				initialParams={{ tmpLat: false, tmpLng: false }}
			/>
			<Stack.Screen name="Statistics" component={StatisticsScreen} />
			<Stack.Screen
				name="CreatePin"
				component={CreatePinScreen}
				options={{
					title: "Create pin",
					gestureEnabled: true,
					gestureDirection: "horizontal",
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name="DefaultPin"
				component={PinDefaultScreen}
				options={{
					title: "",
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name="OwnerPin"
				component={PinOwnerScreen}
				options={{
					title: "",
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name="EditPinScreen"
				component={PinEditScreen}
				options={{
					title: "Editing pin",
					headerTintColor: COLORS.white,
					headerStyle: {
						backgroundColor: COLORS.green1,
					},
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
		</Stack.Navigator>
	);
}

function PinStack() {
	return (
		<Stack.Navigator
			initialRouteName="PinsScreen"
			screenOptions={{
				tabBarActiveTintColor: COLORS.green1,
				tabBarInactiveTintColor: COLORS.secondary,
				tabBarShowLabel: false,
				headerTintColor: COLORS.secondary,
				headerTitleAlign: "center",
				headerTitleStyle: {
					fontWeight: "bold",
					fontSize: 27,
				},
				headerShown: true,
			}}
		>
			<Stack.Screen
				name="PinsScreen"
				component={PinsScreen}
				options={{
					title: "My Pins",
					headerShown: false,
				}}
			/>
			<Stack.Screen name="Statistics" component={StatisticsScreen} />
			<Stack.Screen
				name="DefaultPin"
				component={PinDefaultScreen}
				options={{
					title: "",
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name="OwnerPin"
				component={PinOwnerScreen}
				options={{
					title: "",
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name="EditPinScreen"
				component={PinEditScreen}
				options={{
					title: "Editing pin",
					headerTintColor: COLORS.white,
					headerStyle: {
						backgroundColor: COLORS.green1,
					},
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
		</Stack.Navigator>
	);
}

function ProfileStack() {
	return (
		<Stack.Navigator
			initialRouteName="ProfileScreen"
			screenOptions={{
				tabBarActiveTintColor: COLORS.green1,
				tabBarInactiveTintColor: COLORS.secondary,
				tabBarShowLabel: false,
				headerTintColor: COLORS.secondary,
				headerTitleAlign: "center",
				headerTitleStyle: {
					fontWeight: "bold",
					fontSize: 27,
				},
				headerShown: true,
			}}
		>
			<Stack.Screen
				name="ProfileScreen"
				component={ProfileScreen}
				options={{
					title: "",
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="ProfileEditScreen"
				component={ProfileEditScreen}
				options={{
					title: "Editing profile",
					headerTintColor: COLORS.white,
					headerStyle: {
						backgroundColor: COLORS.green1,
					},
					...TransitionPresets.SlideFromRightIOS,
					gestureEnabled: true,
					gestureDirection: "horizontal",
					headerShown: true,
				}}
			/>
		</Stack.Navigator>
	);
}

function ChatStack() {
	return (
		<Stack.Navigator
			initialRouteName="ChatScreen"
			screenOptions={{
				tabBarActiveTintColor: COLORS.green1,
				tabBarInactiveTintColor: COLORS.secondary,
				tabBarShowLabel: false,
				headerTintColor: COLORS.secondary,
				headerTitleAlign: "center",
				headerTitleStyle: {
					fontWeight: "bold",
					fontSize: 27,
				},
				headerShown: true,
			}}
		>
			<Stack.Screen
				name="ChatScreen"
				component={GeneralChatScreen}
				options={{
					title: "",
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="NewChat"
				component={NewChatScreen}
				options={{
					title: "New chat",
					headerTintColor: COLORS.white,
					headerStyle: {
						backgroundColor: COLORS.green1,
					},
					...TransitionPresets.SlideFromRightIOS,
					gestureEnabled: true,
					gestureDirection: "horizontal",
					headerShown: true,
				}}
			/>
		</Stack.Navigator>
	);
}

function AppTabs() {
	return (
		<Tab.Navigator
			initialRouteName="Map"
			backBehavior="initialRoute"
			screenOptions={{
				tabBarActiveTintColor: COLORS.green1,
				tabBarInactiveTintColor: COLORS.secondary,
				tabBarShowLabel: false,
				headerTintColor: COLORS.secondary,
				headerTitleAlign: "center",
				headerTitleStyle: {
					fontWeight: "bold",
					fontSize: 27,
				},
				headerShown: true,
			}}
		>
			<Tab.Screen
				name="Chat"
				component={ChatStack}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="chatbubble-outline" size={size} color={color} />
					),
					title: "General Chat",
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Pins"
				component={PinStack}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="pushpino" size={size} color={color} />
					),
					title: "My Pins",
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Map"
				component={RootStack}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Feather name="map" size={size} color={color} />
					),
					title: "Map",
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileStack}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person-outline" size={size} color={color} />
					),
					//title: "Profile",
					headerShown: false,
				}}
				//header username
			/>
		</Tab.Navigator>
	);
}

export default function Navigation() {
	return (
		<NavigationContainer>
			<AppTabs />
		</NavigationContainer>
	);
}
