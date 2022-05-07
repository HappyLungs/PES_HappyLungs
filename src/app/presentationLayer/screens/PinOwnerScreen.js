import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";

import COLORS from "../../config/stylesheet/colors";
import i18n from "../../config/translation";

import ImageCarousel from "../components/ImageCarousel";
import Modal from "react-native-modal";
import { Rating } from "react-native-ratings";
import { Ionicons, Feather } from "@expo/vector-icons";

const PresentationCtrl = require("../PresentationCtrl.js");

function PinOwnerScreen({ navigation, route }) {
	let presentationCtrl = new PresentationCtrl();

	const { pin } = route.params;

	const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
		useState(false);

	const handleSeeOnMap = () => {
		navigation.navigate("MapScreen", {
			latitude: pin.location.latitude,
			longitude: pin.location.longitude,
		});
	};

	const handleEdit = () => {
		navigation.navigate("EditPinScreen", { pin: pin });
	};
	const handleDelete = () => console.log("Delete clicked");
	const handleShare = () => console.log("Share clicked");

	function renderDeleteConfirmation() {
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={deleteConfirmationVisible}
				onRequestClose={() => {
					setDeleteConfirmationVisible(false);
				}}
				onBackdropPress={() => {
					setDeleteConfirmationVisible(false);
				}}
				style={{
					marginBottom: 60,
					justifyContent: "flex-end",
				}}
			>
				<View
					style={[
						styles.modalView,
						styles.shadow,
						{ borderBottomEndRadius: 10, borderBottomStartRadius: 10 },
					]}
				>
					<Text
						style={[styles.modalText, { fontWeight: "bold", fontSize: 16 }]}
					>
						{i18n.t("confirmationTitle")}
					</Text>
					<Text style={[styles.modalText, { fontSize: 15 }]}>
						{i18n.t("confirmationText")}
					</Text>
					<View
						style={{ flexDirection: "row", justifyContent: "space-evenly" }}
					>
						<TouchableOpacity
							style={[
								styles.containerBtn,
								{ backgroundColor: COLORS.secondary },
								styles.shadow,
							]}
							onPress={() =>
								setDeleteConfirmationVisible(!deleteConfirmationVisible)
							}
						>
							<Text style={styles.textStyle}>{i18n.t("cancel")}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.containerBtn,
								{ backgroundColor: COLORS.red1, marginStart: 15 },
								styles.shadow,
							]}
							onPress={() => {
								setDeleteConfirmationVisible(!deleteConfirmationVisible);
								handleDelete();
							}}
						>
							<Text style={styles.textStyle}>{i18n.t("delete")}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				flexDirection: "column",
				backgroundColor: COLORS.white,
			}}
		>
			{renderDeleteConfirmation()}
			<View
				style={[{ height: 250, borderBottomLeftRadius: 50 }, styles.shadow]}
			>
				<ImageCarousel media={pin.media} />
			</View>
			<View
				style={{
					flex: 1,
					marginTop: 15,
					marginHorizontal: 20,
				}}
			>
				<View style={{ flexDirection: "row", height: 35, marginTop: 20 }}>
					<Text style={[styles.title, { width: "65%" }]}>{pin.title}</Text>
					<TouchableOpacity
						style={{ justifyContent: "center" }}
						onPress={() => setDeleteConfirmationVisible(true)}
					>
						<Feather name="trash-2" color={COLORS.red1} size={20} />
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							{
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								width: 90,
								marginStart: 10,
								borderRadius: 5,
								backgroundColor: COLORS.secondary,
							},
							styles.shadow,
						]}
						onPress={handleEdit}
					>
						<Feather name="edit" size={24} color={COLORS.white} />
						<Text style={[styles.textStyle, { marginStart: 5 }]}>
							{i18n.t("edit")}
						</Text>
					</TouchableOpacity>
				</View>
				<Text style={[styles.body, { marginTop: 10, alignSelf: "flex-start" }]}>
					{pin.description}
				</Text>
				<View
					style={{
						flexDirection: "row",
						padding: 10,
						marginTop: 10,
					}}
				>
					<Ionicons
						name="location-sharp"
						size={30}
						style={{ alignSelf: "center" }}
						color={COLORS.secondary}
					/>
					<Text style={[styles.body, { marginStart: 10 }]}>
						{pin.locationTitle}
					</Text>
				</View>
				<TouchableOpacity
					style={{ alignSelf: "flex-start", marginStart: 10 }}
					onPress={handleSeeOnMap}
				>
					<Text style={styles.highlight}> {i18n.t("seeOnMap")}</Text>
				</TouchableOpacity>
				<View
					style={{
						flexDirection: "row",
						padding: 10,
						marginTop: 10,
					}}
				>
					<Ionicons
						name="md-calendar"
						style={{ alignSelf: "center" }}
						color={COLORS.secondary}
						size={30}
					/>
					<Text style={[styles.body, { marginStart: 10 }]}>{pin.date}</Text>
				</View>
				<Rating
					type={"custom"}
					imageSize={20}
					fractions={0}
					startingValue={pin.rating}
					ratingBackgroundColor={COLORS.secondary}
					ratingColor={COLORS.green1}
					tintColor={COLORS.white}
					readonly={true}
					style={{
						padding: 10,
						marginTop: 10,
						alignSelf: "flex-start",
					}}
				/>
				<View
					style={{
						flexDirection: "row",
						padding: 10,
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<TouchableOpacity onPress={handleShare}>
						<Ionicons
							name="share-social-sharp"
							style={{ alignSelf: "center" }}
							color={COLORS.secondary}
							size={35}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={{ flexDirection: "column" }}
						onPress={async () => {
							let data = await presentationCtrl.getDataStatistics(
								"24hours",
								pin.location.latitude,
								pin.location.longitude
							);
							navigation.navigate("Statistics", { data: data });
						}}
					>
						<Ionicons
							name="bar-chart"
							style={{ alignSelf: "center" }}
							color={COLORS.green1}
							size={35}
						/>
						<Text style={styles.highlight}>{i18n.t("seeStatistics")}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		alignSelf: "center",
		color: COLORS.secondary,
	},
	body: {
		alignSelf: "center",
		fontSize: 15,
		color: COLORS.secondary,
	},
	highlight: {
		fontSize: 15,
		fontWeight: "bold",
		color: COLORS.green1,
	},
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
	modalView: {
		backgroundColor: COLORS.white,
		borderColor: COLORS.secondary,
		borderTopWidth: 2,
		padding: 15,
	},
	button: {
		elevation: 2,
	},
	containerBtn: {
		width: 95,
		padding: 10,
		borderRadius: 5,
	},
	textStyle: {
		color: COLORS.white,
		fontWeight: "bold",
		fontSize: 15,
		textAlign: "center",
		alignSelf: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});

export default PinOwnerScreen;
