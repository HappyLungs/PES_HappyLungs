import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	createStackNavigator,
	HeaderStyleInterpolators,
	TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import "react-native-gesture-handler";

//screens
import MapScreen from "../MapScreen";
import GeneralChatScreen from "../GeneralChatScreen";
import PinsScreen from "../PinsScreen";
import ProfileScreen from "../ProfileScreen";
import StatisticsScreen from "../StatisticsScreen";
import CreatePinScreen from "../CreatePinScreen";
import PinOwnerScreen from "../PinOwnerScreen";
import PinEditScreen from "../PinEditScreen";
import PinDefaultScreen from "../PinDefaultScreen";
import COLORS from "../../config/stylesheet/colors";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
	const progress = Animated.add(
		current.progress.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1],
			extrapolate: "clamp",
		}),
		next
			? next.progress.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 1],
					extrapolate: "clamp",
			  })
			: 0
	);

	return {
		cardStyle: {
			transform: [
				{
					translateX: Animated.multiply(
						progress.interpolate({
							inputRange: [0, 1, 2],
							outputRange: [
								screen.width, // Focused, but offscreen in the beginning
								0, // Fully focused
								screen.width * -0.3, // Fully unfocused
							],
							extrapolate: "clamp",
						}),
						inverted
					),
				},
			],
		},
	};
};

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
					...TransitionPresets.SlideFromRightIOS,
					gestureEnabled: true,
					gestureDirection: "horizontal",
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
					gestureEnabled: true,
					gestureDirection: "horizontal",
				}}
			/>
			<Stack.Screen
				name="OwnerPin"
				component={PinOwnerScreen}
				options={{
					title: "",
					...TransitionPresets.SlideFromRightIOS,
					gestureEnabled: true,
					gestureDirection: "horizontal",
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

function AppTabs() {
	return (
		<Tab.Navigator
			initialRouteName="Map"
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
				name="GeneralChat"
				component={GeneralChatScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="chatbubble-outline" size={size} color={color} />
					),
					tabBarBadge: 2,
					title: "General Chat",
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
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person-outline" size={size} color={color} />
					),
					title: "Profile",
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
