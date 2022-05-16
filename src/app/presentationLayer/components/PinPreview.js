import React, { useContext } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

import COLORS from "../../config/stylesheet/colors";
const PresentationCtrl = require("../PresentationCtrl.js");
import i18n from "../../config/translation";
import UserContext from "../../domainLayer/UserContext";

const PinPreview = ({ item, saved, mine }) => {
	let presentationCtrl = new PresentationCtrl();
	const [user] = useContext(UserContext);

	const savePin = () => {
		presentationCtrl.savePin(item._id, user.email);
	};

	return (
		<Animatable.View animation="pulse" duration={1000}>
			<View
				style={[
					{
						flexDirection: "row",
						backgroundColor: COLORS.white,
						borderTopStartRadius: 10,
						borderTopEndRadius: 10,
						borderBottomEndRadius: mine ? 10 : 0,
						borderBottomStartRadius: mine ? 10 : 0,
						padding: 15,
					},
					styles.shadow,
				]}
			>
				<View
					style={{
						marginEnd: 15,
						flexDirection: "column",
					}}
				>
					<Text style={styles.pinName}>{item.title}</Text>

					<Text style={[styles.txt, { fontStyle: "italic" }]}>{item.date}</Text>
					<Text style={styles.profile}>{item.creatorName}</Text>
				</View>
				<View style={styles.shadow}>
					<Image
						source={{
							uri:
								item.media.length !== 0
									? item.media[0]
									: "https://retodiario.com/wp-content/uploads/2021/01/no-image.png",
						}}
						style={{
							width: 75,
							height: 75,
							borderRadius: 10,
						}}
					/>
				</View>
			</View>
			{!mine && (
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
						onPress={savePin}
					>
						<Text style={styles.containerTxt}>
							{saved ? i18n.t("remove") : i18n.t("save")}
						</Text>
					</TouchableOpacity>
				</View>
			)}
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
		marginTop: 5,
		color: COLORS.darkGrey,
	},
	profile: {
		color: COLORS.green1,
		fontSize: 13,
		marginTop: 10,
		fontWeight: "bold",
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
