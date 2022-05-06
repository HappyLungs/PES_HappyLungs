import React, { useState, useMemo } from "react";
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
import ChatConversation from "../ChatConversation";
import NewChatScreen from "../NewChatScreen";
import PinsScreen from "../PinsScreen";
import ProfileScreen from "../ProfileScreen";
import ProfileEditScreen from "../ProfileEditScreen";
import SettingsScreen from "../SettingsScreen";
import StatisticsScreen from "../StatisticsScreen";
import CreatePinScreen from "../CreatePinScreen";
import PinOwnerScreen from "../PinOwnerScreen";
import PinEditScreen from "../PinEditScreen";
import PinDefaultScreen from "../PinDefaultScreen";
import SignInScreen from "../SignInScreen";
import SignUpScreen from "../SignUpScreen";
import TermsAndConditionsScreen from "../TermsAndConditionsScreen";
import COLORS from "../../config/stylesheet/colors";
import i18n from "../../config/translation";
import { UserContextProvider } from "../../domainLayer/UserContext";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function RootStack() {
	return (
		<Stack.Navigator
			initialRouteName="SignInScreen"
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
				headerShown: false,
			}}
		>
			<Stack.Screen name="SignInScreen" component={SignInScreen} />
			<Stack.Screen name="SignUpScreen" component={SignUpScreen} />
			<Stack.Screen
				name="TermsAndConditionsScreen"
				component={TermsAndConditionsScreen}
			/>
			<Stack.Screen name="AppTabs" component={AppTabs} />
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
					title: i18n.t("myPins"),
					headerTitleAlign: "left",
					headerShown: true,
					headerLeft: null,
					headerTitleStyle: {
						fontSize: 20,
						fontWeight: "bold",
						color: COLORS.secondary,
					},
					headerStyle: { shadowColor: "transparent" },
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
			<Stack.Screen
				name="SettingsScreen"
				component={SettingsScreen}
				options={{
					title: "Settings",
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
					title: i18n.t("chat"),
					headerShown: true,
					headerLeft: null,
					headerTitleStyle: {
						fontSize: 20,
						fontWeight: "bold",
						color: COLORS.secondary,
					},
					headerStyle: { shadowColor: "transparent" },
				}}
			/>
			<Stack.Screen
				name="ChatConversation"
				component={ChatConversation}
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

function MapStack() {
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
				headerShown: false,
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
				component={MapStack}
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
	//const [user, setUser] = useState(null);

	//const value = useMemo(() => ({ user, setUser }), [user, setUser]);

	return (
		<NavigationContainer>
			<UserContextProvider>
				<RootStack />
			</UserContextProvider>
		</NavigationContainer>
	);
}
