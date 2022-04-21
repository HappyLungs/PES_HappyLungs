import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import COLORS from "../../config/stylesheet/colors";
import * as Animatable from "react-native-animatable";

const PinPreview = ({ item }) => {
	return (
		<Animatable.View
			style={{
				alignItems: "center",
				flexDirection: "row",
				alignItems: "flex-start",
			}}
		>
			<View
				style={{
					marginEnd: 25,
					flexDirection: "column",
				}}
			>
				<Text style={styles.pinName}>{item.name}</Text>

				<Text style={[styles.txt, { fontStyle: "italic" }]}>{item.date}</Text>
				<Text style={styles.profile}>author</Text>
			</View>
			<View style={[styles.shadow]}>
				<Image
					source={{ uri: item.media[0] }}
					style={{
						width: 65,
						height: 65,
						borderRadius: 10,
					}}
				/>
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
		fontSize: 13,
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
