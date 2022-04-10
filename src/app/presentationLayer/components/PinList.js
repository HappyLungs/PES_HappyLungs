import React from "react";
import {
	StyleSheet,
	View,
	Text,
	Animated,
	FlatList,
	TouchableOpacity,
	Image,
	Dimensions,
} from "react-native";

import * as Animatable from "react-native-animatable";

import COLORS from "../../config/stylesheet/colors";
import { Feather, Ionicons } from "@expo/vector-icons";

const PinList = ({ pinList, navigation }) => {
	const isMyPin = [true, false, true, false, true, true];

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
								if (isMyPin[index]) {
									navigation.navigate("OwnerPin", { pin: item });
								} else {
									navigation.navigate("DefaultPin", { pin: item, saved: true });
								}
							}}
						>
							<Image
								source={{ uri: item.media[0] }}
								style={{
									width: 85,
									height: 85,
									borderTopLeftRadius: 10,
									borderBottomLeftRadius: isMyPin[index] ? 0 : 10,
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
									<Text style={styles.itemName}>{item.name}</Text>
									<View
										style={{
											backgroundColor: isMyPin[index]
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
											{isMyPin[index] ? item.status : "Saved"}
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
										{item.location.title}
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
					{isMyPin[index] && (
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
								<Text style={styles.containerTxt}>Edit</Text>
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
								onPress={() => console.log("delete")}
							>
								<Feather name="trash-2" size={15} color={COLORS.white} />
								<Text style={styles.containerTxt}>Delete</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>
		</Animatable.View>
	);

	const ListEmptyComponent = () => {
		const anim = {
			0: { translateY: 0 },
			0.5: { translateY: 50 },
			1: { translateY: 0 },
		};
		return (
			<Animatable.View
				style={{
					height: Dimensions.get("window").height,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Animatable.Text
					animation={anim}
					easing="ease-in-out"
					duration={3000}
					style={{ fontSize: 24 }}
					iterationCount="infinite"
				>
					Empty List!
				</Animatable.Text>
			</Animatable.View>
		);
	};

	return (
		<FlatList
			stickyHeaderHiddenOnScroll={true}
			contentContainerStyle={{ padding: 10 }}
			scrollEnabled={true}
			data={pinList}
			keyExtractor={(item) => `${item.name}`}
			renderItem={renderItem}
			showsVerticalScrollIndicator={false}
			ListEmptyComponent={ListEmptyComponent}
			ItemSeparatorComponent={() => {
				return (
					<View
						style={{
							width: "100%",
							height: 20,
							backgroundColor: COLORS.light,
						}}
					></View>
				);
			}}
		></FlatList>
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
		elevation: 5,
	},
});

export default PinList;
