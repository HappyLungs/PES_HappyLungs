import React, { useState } from "react";

import { Text, StyleSheet, View } from "react-native";

import COLORS from "../config/stylesheet/colors";

function GeneralChatScreen(props) {
	return (
		<View style={styles.background}>
			<Text style={{ marginTop: 300 }}> General Chat Screen</Text>
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

export default GeneralChatScreen;
