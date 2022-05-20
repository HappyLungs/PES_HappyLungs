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
			latitude: pin.latitude,
			longitude: pin.longitude,
		});
	};

	const handleDelete = () => {
		presentationCtrl.deletePin(pin);
		navigation.popToTop();
	};

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
							activeOpacity={0.8}
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
							activeOpacity={0.8}
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
				style={[
					{ height: 200, borderBottomLeftRadius: 50 },
					styles.shadowImage,
				]}
			>
				<ImageCarousel media={pin.media} />
			</View>
			<View
				style={{
					flex: 1,
					marginTop: 25,
					marginHorizontal: 20,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						marginTop: 10,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Text style={[styles.title, { flex: 1 }]}>{pin.title}</Text>
					<TouchableOpacity
						activeOpacity={0.8}
						style={[
							{
								flexDirection: "row",
								backgroundColor: COLORS.green1,
								height: 45,
								alignItems: "center",
								borderRadius: 7,
								padding: 5,
							},
							styles.shadow,
						]}
						onPress={async () => {
							let data = await presentationCtrl.getDataStatistics(
								"24hours",
								pin.location.latitude,
								pin.location.longitude
							);
							navigation.navigate("Statistics", { data: data });
						}}
					>
						<Text
							style={{
								paddingHorizontal: 5,
								fontWeight: "bold",
								fontSize: 15,
								color: COLORS.white,
							}}
						>
							{i18n.t("seeStatistics")}
						</Text>
						<Ionicons
							name="bar-chart"
							style={{ alignSelf: "center" }}
							color={COLORS.white}
							size={25}
						/>
					</TouchableOpacity>
				</View>
				<Text
					style={[
						styles.body,
						{ marginTop: 10, alignSelf: "flex-start", flexShrink: 1 },
					]}
				>
					{pin.description}
				</Text>
				<View
					style={{
						flexDirection: "row",
						paddingVertical: 10,
						marginTop: 10,
					}}
				>
					<Ionicons
						name="location-sharp"
						size={30}
						style={{ alignSelf: "center" }}
						color={COLORS.secondary}
					/>
					<Text style={[styles.body, { marginStart: 10, flexShrink: 1 }]}>
						{pin.locationTitle}
					</Text>
				</View>
				<TouchableOpacity
					activeOpacity={0.8}
					style={{
						alignSelf: "flex-start",
						paddingVertical: 10,
					}}
					onPress={handleSeeOnMap}
				>
					<Text style={styles.highlight}> {i18n.t("seeOnMap")}</Text>
				</TouchableOpacity>

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
						paddingVertical: 10,
						marginTop: 10,
						alignSelf: "flex-start",
					}}
				/>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginTop: 10,
					}}
				>
					<View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
						<TouchableOpacity
							activeOpacity={0.8}
							style={{ flexDirection: "row" }}
							onPress={handleShare}
						>
							<Ionicons
								name="share-social-sharp"
								color={COLORS.secondary}
								size={35}
							/>
							<Text style={[styles.body, { marginStart: 10 }]}>
								{i18n.t("share")}
							</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						activeOpacity={0.8}
						style={[
							{
								flexDirection: "row",
								backgroundColor: COLORS.red1,
								height: 35,
								borderRadius: 7,
								alignItems: "center",
								padding: 5,
							},
							styles.shadow,
						]}
						onPress={() => setDeleteConfirmationVisible(true)}
					>
						<Text
							style={{
								color: COLORS.white,
								textAlign: "center",
								textAlignVertical: "center",
								fontWeight: "bold",
								fontSize: 15,
								paddingHorizontal: 5,
							}}
						>
							{i18n.t("delete")}
						</Text>
						<Feather
							name="trash-2"
							style={{ alignSelf: "center" }}
							color={COLORS.white}
							size={25}
						/>
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
	shadowImage: {
		shadowColor: COLORS.green1,
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
