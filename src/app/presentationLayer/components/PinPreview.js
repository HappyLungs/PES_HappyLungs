import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import COLORS from "../../config/stylesheet/colors";
import * as Animatable from "react-native-animatable";
const PresentationCtrl = require("../PresentationCtrl.js");

const PinPreview = ({ item }) => {
	let presentationCtrl = new PresentationCtrl();

	const savePin = () => {
		//presentationCtrl.savePin(item);
	};

	return (
		<Animatable.View animation="pulse" duration={1000} style={styles.shadow}>
			<View
				style={{
					flexDirection: "row",
					backgroundColor: COLORS.white,
					borderTopStartRadius: 10,
					borderTopEndRadius: 10,
					padding: 15,
				}}
			>
				<View
					style={{
						marginEnd: 15,
						flexDirection: "column",
					}}
				>
					<Text style={styles.pinName}>{item.name}</Text>

					<Text style={[styles.txt, { fontStyle: "italic" }]}>{item.date}</Text>
					<Text style={styles.profile}>author</Text>
				</View>
				<View style={styles.shadow}>
					<Image
						source={{ uri: item.media[0] }}
						style={{
							width: 75,
							height: 75,
							borderRadius: 10,
						}}
					/>
				</View>
			</View>
			<View
				style={{
					height: 30,
					flexDirection: "row",
					backgroundColor: COLORS.secondary,
					borderBottomEndRadius: 10,
					borderBottomStartRadius: 10,
				}}
			>
				<TouchableOpacity
					style={{
						flex: 1,
						flexDirection: "row",
						backgroundColor: COLORS.secondary,
						justifyContent: "space-evenly",
						borderRadius: 10,
						alignItems: "center",
					}}
					onPress={() => savePin()}
				>
					<Text style={styles.containerTxt}>{1 ? "SAVE" : "REMOVE"}</Text>
				</TouchableOpacity>
			</View>
		</Animatable.View>
	);
};

const styles = StyleSheet.create({
	pinName: {
		fontSize: 15,
		fontWeight: "bold",
		color: COLORS.secondary,
	},
	txt: {
		fontSize: 12,
		color: COLORS.darkGrey,
	},
	profile: {
		color: COLORS.green1,
		fontSize: 13,
		fontWeight: "bold",
		marginTop: 10,
	},
	containerTxt: {
		fontSize: 15,
		color: COLORS.white,
		fontWeight: "bold",
	},
	shadow: {
		shadowColor: COLORS.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 10,
	},
});

export default PinPreview;
