import React from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";

import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../config/stylesheet/colors";
import i18n from "../../config/translation";

const Leaderboard = ({ chatsList }) => {
	const gold = ["#d9bf70", "#f0e092", "#d9bf70"];
	const silver = ["#cbc5c6", "#e8e8e8", "#cbc5c6"];
	const colors = ["#cc8043", "#e3a265", "#cc8043"];
	const blank = ["#fff", "#fff", "#fff"];

	const renderItem = ({ item, index }) => (
		<Animatable.View
			animation="slideInDown"
			duration={500}
			delay={index * 10}
			style={[
				styles.shadow,
				{
					margin: 10,
					marginHorizontal: 15,
					flexDirection: "row",
					borderRadius: 7,
					alignItems: "center",
					height: 60,
					backgroundColor: COLORS.white,
				},
			]}
		>
			<LinearGradient
				start={{ x: 0.0, y: 0.25 }}
				end={{ x: 0.5, y: 1.0 }}
				locations={[0, 0.5, 1]}
				colors={
					index === 0
						? gold
						: index === 1
						? silver
						: index === 2
						? colors
						: blank
				}
				style={[
					styles.rankBox,
					{
						borderRightWidth: index <= 2 ? 3 : 0,
						borderColor: COLORS.secondary,
					},
				]}
			>
				<Text
					style={[
						styles.rank,
						{
							fontSize: 20,
							color: index <= 2 ? COLORS.white : COLORS.secondary,
						},
					]}
				>
					{index + 1}
					{index === 0 && i18n.t("first")}
					{index === 1 && i18n.t("second")}
					{index === 2 && i18n.t("third")}
				</Text>
			</LinearGradient>
			<View
				style={{
					marginStart: 10,
					width: 160,
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<Image
					source={{ uri: item.profileImage }}
					style={{
						width: 45,
						height: 45,
						borderRadius: 23,
					}}
				/>
				<Text
					numberOfLines={1}
					style={[styles.user, { textAlign: "left", flexShrink: 1 }]}
				>
					{item.name}
				</Text>
			</View>
			<View style={{ width: 110 }}>
				<Text style={styles.score}>20</Text>
			</View>
		</Animatable.View>
	);

	return (
		<FlatList
			stickyHeaderHiddenOnScroll={true}
			contentContainerStyle={{}}
			scrollEnabled={true}
			data={chatsList}
			keyExtractor={(item) => `${item.name}`}
			renderItem={renderItem}
			showsVerticalScrollIndicator={false}
			style={{ marginTop: 10 }}
		></FlatList>
	);
};

const styles = StyleSheet.create({
	user: {
		textAlign: "center",
		marginStart: 10,
		fontSize: 15,
		fontWeight: "bold",
		color: COLORS.secondary,
	},
	rank: {
		fontSize: 17,
		fontStyle: "italic",
		textAlign: "center",
		fontWeight: "bold",
	},
	rankBox: {
		height: 60,
		width: 90,
		borderTopLeftRadius: 7,
		borderBottomLeftRadius: 7,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	score: {
		fontSize: 17,
		textAlign: "center",
		fontWeight: "bold",
		color: COLORS.secondary,
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
});

export default Leaderboard;
