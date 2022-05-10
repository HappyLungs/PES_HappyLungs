import React, { useState, useContext } from "react";
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Image,
} from "react-native";

import * as Animatable from "react-native-animatable";
import Modal from "react-native-modal";

import { Feather, Ionicons } from "@expo/vector-icons";

import COLORS from "../../config/stylesheet/colors";
import i18n from "../../config/translation";
import UserContext from "../../domainLayer/UserContext";
const PresentationCtrl = require("../PresentationCtrl");

const PinList = ({ pinList, navigation }) => {
	let presentationCtrl = new PresentationCtrl();
	const [user, setUser] = useContext(UserContext);
	const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
		useState(false);
	const [selectedPin, setSelectedPin] = useState(null);
	const [data, setData] = useState(pinList);

	const isMyPin = (email) => {
		return user.email === email;
	};

	const handleDeleteModal = (pin) => {
		setDeleteConfirmationVisible(true);
		setSelectedPin(pin);
	};

	const handleDelete = () => {
		presentationCtrl.deletePin(selectedPin);
		console.log("before:" + data);
		setData(data.filter((item) => item._id !== selectedPin._id));
		console.log("after:" + data);
	};

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

	const renderItem = ({ item, index }) => (
		//all animations
		//https://github.com/oblador/react-native-animatable
		//pulse
		//fadeInDown/Up
		//slideInDown
		<Animatable.View animation="slideInDown" duration={500} delay={index * 10}>
			<View
				style={[
					styles.shadow,
					{
						borderRadius: 10,
						backgroundColor: COLORS.white,
						marginBottom: 10,
					},
				]}
			>
				<View style={{ flexDirection: "column" }}>
					<View style={{ flexDirection: "row" }}>
						<TouchableOpacity
							style={{
								flexDirection: "row",
								flex: 1,
								alignItems: "center",
							}}
							onPress={() => {
								if (isMyPin(item.creatorEmail)) {
									navigation.navigate("OwnerPin", { pin: item });
								} else {
									navigation.navigate("DefaultPin", { pin: item, saved: true });
								}
							}}
						>
							<Image
								source={{
									uri:
										item.media.length !== 0
											? item.media[0]
											: "https://retodiario.com/wp-content/uploads/2021/01/no-image.png",
								}}
								style={{
									width: 85,
									height: 85,
									borderTopLeftRadius: 10,
									borderBottomLeftRadius: isMyPin(item.creatorEmail) ? 0 : 10,
								}}
							/>
							<View
								style={{
									flex: 1,
									marginHorizontal: 10,
									alignSelf: "center",
								}}
							>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<Text style={styles.itemName}>{item.title}</Text>
									<View
										style={{
											backgroundColor: isMyPin(item.creatorEmail)
												? COLORS.blue2
												: COLORS.secondary,
											alignSelf: "flex-end",
											margin: 5,
											padding: 2,
											borderRadius: 5,
										}}
									>
										<Text
											style={[
												styles.itemName,
												{
													color: COLORS.white,
													fontSize: 12,
													fontWeight: "bold",
												},
											]}
										>
											{isMyPin(item.creatorEmail)
												? i18n.t("created")
												: i18n.t("saved")}
										</Text>
									</View>
								</View>
								<View style={{ flexDirection: "row", marginVertical: 2 }}>
									<Ionicons
										name="location-sharp"
										style={{ alignSelf: "center" }}
										color={COLORS.secondary}
										size={13}
									/>
									<Text
										numberOfLines={1}
										style={[styles.itemCode, { flex: 1, flexWrap: "wrap" }]}
									>
										{item.locationTitle}
									</Text>
								</View>
								<View style={{ flexDirection: "row", marginVertical: 2 }}>
									<Ionicons
										name="md-calendar"
										style={{ alignSelf: "center" }}
										color={COLORS.secondary}
										size={13}
									/>
									<Text style={styles.itemCode}>{item.date}</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					{isMyPin(item.creatorEmail) && (
						<View
							style={{
								height: 30,
								flexDirection: "row",
							}}
						>
							<TouchableOpacity
								style={{
									flex: 1.5,
									flexDirection: "row",
									backgroundColor: COLORS.secondary,
									borderBottomLeftRadius: 10,
									justifyContent: "center",
									alignItems: "center",
								}}
								onPress={() => {
									navigation.navigate("EditPinScreen", { pin: item });
								}}
							>
								<Feather name="edit" size={15} color={COLORS.white} />
								<Text style={styles.containerTxt}>{i18n.t("edit")}</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									flex: 1,
									flexDirection: "row",
									backgroundColor: COLORS.red1,
									borderBottomRightRadius: 10,
									justifyContent: "center",
									alignItems: "center",
								}}
								onPress={() => {
									handleDeleteModal(item);
								}}
							>
								<Feather name="trash-2" size={15} color={COLORS.white} />
								<Text style={styles.containerTxt}>{i18n.t("delete")}</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>
		</Animatable.View>
	);

	return (
		<View>
			<FlatList
				stickyHeaderHiddenOnScroll={true}
				contentContainerStyle={{ padding: 10 }}
				scrollEnabled={true}
				data={pinList}
				keyExtractor={(item) => `${item.title}`}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={() => {
					return (
						<View
							style={{
								width: "100%",
								marginTop: 10,
							}}
						></View>
					);
				}}
			></FlatList>
			{renderDeleteConfirmation()}
		</View>
	);
};

const styles = StyleSheet.create({
	containerTxt: {
		fontSize: 13,
		color: COLORS.white,
		fontWeight: "bold",
		marginHorizontal: 10,
	},
	itemName: {
		fontSize: 15,
		fontWeight: "bold",
		color: COLORS.secondary,
	},
	itemCode: {
		fontSize: 12,
		alignSelf: "flex-end",
		color: COLORS.darkGrey,
		marginHorizontal: 5,
	},
	status: {
		alignSelf: "center",
		fontSize: 10,
		fontWeight: "bold",
		color: COLORS.white,
	},
	shadow: {
		shadowColor: COLORS.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 8,
	},
	modalView: {
		backgroundColor: COLORS.white,
		borderColor: COLORS.secondary,
		borderTopWidth: 2,
		padding: 15,
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
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
});

export default PinList;
