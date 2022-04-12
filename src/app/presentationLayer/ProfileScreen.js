import React, { useState } from "react";

import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import COLORS from "../config/stylesheet/colors";

function ProfileScreen({ navigation }) {
	const fakeProfileData = {
		username: "Ricard Guixaró",
		points: 200,
	};
	const [profile, setProfile] = useState(fakeProfileData);

	return (
		<View style={styles.background}>
			<Text style={{ marginTop: 300 }}> Profile Screen</Text>
			<TouchableOpacity
				style={[
					{
						backgroundColor: COLORS.green1,
						height: 40,
						paddingRight: 10,
						paddingLeft: 5,
						borderRadius: 12,
						marginTop: 30,
					},
					styles.shadow,
				]}
				onPress={() => {
					console.log("pressed points");
				}}
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
						{profile.points}
					</Text>
					<Text style={[{ marginLeft: 3, color: COLORS.white }]}>points</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: COLORS.white,
		justifyContent: "flex-start",
		paddingTop: Platform.OS === "android" ? 30 : 0,
		alignItems: "center",
	},
});

export default ProfileScreen;
