import React from "react";

import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	ImageBackground,
	Share,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import COLORS from "../config/stylesheet/colors";
import { UrlTile } from "react-native-maps";

function ProfileScreen({ navigation, route }) {
	//should know userId, and then retrieve the user data (updated or not)

	//const { user } = route.params;

	const user = {
		username: "Username",
		email: "username@email.com",
		points: 200,
		healthState: [true, false, true],
		picture: {
			uri: "https://www.congresodelasemfyc.com/assets/imgs/default/default-logo.jpg",
		},
	};

	function settings() {
		//navigation.navigate("SettingsScreen");
		//maybe a popup
	}

	function calendar() {
		//no se que ha de fer
	}

	function rewards() {}

	async function share() {
		try {
			await Share.share({
				title: "Happy Lungs",
				message: "Breath Safely, Breath With Us",
				url: "https://happylungsproject.org/", //url és ios only
			});
		} catch (err) {
			console.log(err);
		}
		//logOut user
		//navigation.navigate("LogInScreen");
	}

	function logOut() {
		//logOut user
		//navigation.navigate("LogInScreen");
	}
	return (
		<View
			style={{
				flexDirection: "column",
				flex: 1,
				alignItems: "flex-start",
				justifyContent: "flex-start",
				backgroundColor: COLORS.white,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					paddingHorizontal: 20,
					marginTop: 50,
				}}
			>
				<View
					style={{
						flex: 2,
						alignItems: "center",
						marginTop: 10,
					}}
				>
					<ImageBackground
						source={user.picture}
						style={[
							{
								borderRadius: 20,
								width: 100,
								height: 125,
								justifyContent: "flex-end",
							},
							styles.long_shadow,
						]}
						imageStyle={{
							borderRadius: 10,
							resizeMode: "cover",
						}}
					>
						<View
							style={[
								{
									backgroundColor: COLORS.light,
									alignSelf: "center",
									borderRadius: 5,
									top: 20,
									padding: 5,
									paddingHorizontal: 10,
								},
								styles.shadow,
							]}
						>
							<Text style={{ color: COLORS.secondary, fontWeight: "bold" }}>
								{user.username}
							</Text>
						</View>
					</ImageBackground>
				</View>
				<View
					style={{
						flex: 2,
						justifyContent: "flex-start",
					}}
				>
					<TouchableOpacity
						style={{ alignItems: "flex-end" }}
						onPress={() => {
							navigation.navigate("ProfileEditScreen");
						}}
					>
						<Feather name="edit-3" size={30} color={COLORS.secondary} />
					</TouchableOpacity>
					<View
						style={{
							marginTop: 10,
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<View
							style={{
								alignItems: "center",
							}}
						>
							<Text
								style={{
									fontWeight: "bold",
									fontSize: 23,
									color: COLORS.secondary,
								}}
							>
								12
							</Text>
							<Text style={{ color: COLORS.darkGrey }}>Pins Created</Text>
						</View>
						<View
							style={{
								alignSelf: "center",
								backgroundColor: COLORS.lightGrey,
								height: "80%",
								width: 2,
							}}
						></View>
						<View
							style={{
								alignItems: "center",
							}}
						>
							<Text
								style={{
									fontWeight: "bold",
									fontSize: 23,
									color: COLORS.secondary,
								}}
							>
								7
							</Text>
							<Text style={{ color: COLORS.darkGrey }}>Pins Shared</Text>
						</View>
					</View>
					<TouchableOpacity
						style={[
							{
								backgroundColor: COLORS.green1,
								height: 40,
								width: 125,
								borderRadius: 12,
								marginTop: 20,
								alignSelf: "center",
							},
							styles.shadow,
						]}
					>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<View
								style={{
									width: 25,
									height: 25,
									alignItems: "center",
									justifyContent: "center",
									borderRadius: 20,
									backgroundColor: COLORS.green2,
								}}
							>
								<AntDesign name="Trophy" size={18} color={COLORS.white} />
							</View>
							<Text
								style={[
									{ fontWeight: "bold", marginLeft: 10, color: COLORS.white },
								]}
							>
								{user.points}
							</Text>
							<Text style={[{ marginLeft: 3, color: COLORS.white }]}>
								points
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<View
				style={{
					alignSelf: "center",
					backgroundColor: COLORS.lightGrey,
					height: 6,
					marginTop: 35,
					marginBottom: 15,
					width: "100%",
				}}
			/>
			<View
				style={{
					alignSelf: "center",
					marginHorizontal: 30,
					alignItems: "flex-start",
					flexDirection: "column",
				}}
			>
				<Text style={[styles.textOption, { fontSize: 17 }]}>Health State</Text>
				<View
					style={{
						flexDirection: "row",
						marginVertical: 15,
					}}
				>
					<View style={{ alignItems: "center", width: 115 }}>
						<View
							style={[
								styles.containerState,
								styles.shadow,
								{
									backgroundColor: user.healthState[0]
										? COLORS.green1
										: COLORS.secondary,
								},
							]}
						>
							<FontAwesome5 name="lungs" size={35} color={COLORS.white} />
						</View>
						<Text style={styles.textState}>Cardiorespiratory problems</Text>
					</View>
					<View style={{ alignItems: "center", width: 115 }}>
						<View
							style={[
								styles.containerState,
								styles.shadow,
								{
									backgroundColor: user.healthState[1]
										? COLORS.green1
										: COLORS.secondary,
								},
							]}
						>
							<MaterialIcons
								name="pregnant-woman"
								size={35}
								color={COLORS.white}
							/>
						</View>
						<Text style={styles.textState}>Pregnant</Text>
					</View>
					<View style={{ alignItems: "center", width: 115 }}>
						<View
							style={[
								styles.containerState,
								styles.shadow,
								{
									backgroundColor: user.healthState[2]
										? COLORS.green1
										: COLORS.secondary,
								},
							]}
						>
							<MaterialIcons name="elderly" size={35} color={COLORS.white} />
						</View>
						<Text style={styles.textState}>Elderly</Text>
					</View>
				</View>
			</View>
			<View
				style={{
					alignSelf: "center",
					backgroundColor: COLORS.lightGrey,
					height: 6,
					marginBottom: 15,
					width: "100%",
				}}
			/>
			<View
				style={{
					flex: 1,
					marginHorizontal: 30,
					alignItems: "flex-start",
					flexDirection: "column",
				}}
			>
				<TouchableOpacity
					onPress={() => settings()}
					style={styles.containerOption}
				>
					<Ionicons name="settings-outline" size={27} color={COLORS.green1} />
					<Text style={styles.textOption}>Settings</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => calendar()}
					style={styles.containerOption}
				>
					<Ionicons name="md-calendar" size={27} color={COLORS.green1} />
					<Text style={styles.textOption}>Calendar</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => rewards()}
					style={styles.containerOption}
				>
					<AntDesign name="Trophy" size={27} color={COLORS.green1} />
					<Text style={styles.textOption}>Rewards</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => share()}
					style={styles.containerOption}
				>
					<Feather name="users" size={27} color={COLORS.green1} />
					<Text style={styles.textOption}>Tell Your Friend</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				onPress={() => logOut()}
				style={[
					styles.containerOption,
					{ marginHorizontal: 30, marginBottom: 20 },
				]}
			>
				<Feather name="power" size={27} color={COLORS.red1} />
				<Text style={styles.textOption}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	shadow: {
		shadowColor: COLORS.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	long_shadow: {
		shadowColor: COLORS.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 25,
	},
	containerOption: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 15,
	},
	textOption: {
		color: COLORS.secondary,
		fontWeight: "bold",
		fontSize: 15,
		marginHorizontal: 10,
	},
	containerState: {
		flexDirection: "column",
		width: 60,
		height: 60,
		marginHorizontal: 10,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
	},
	textState: {
		color: COLORS.secondary,
		fontWeight: "bold",
		fontSize: 14,
		textAlign: "center",
		marginTop: 5,
	},
});

export default ProfileScreen;
