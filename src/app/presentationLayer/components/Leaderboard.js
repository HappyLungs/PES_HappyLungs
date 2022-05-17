import React from "react";
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Image,
	Dimensions,
} from "react-native";

import * as Animatable from "react-native-animatable";

import COLORS from "../../config/stylesheet/colors";

const Leaderboard = ({ chatsList, navigation }) => {
	const renderItem = ({ item, index }) => (
		<Animatable.View
			animation="slideInDown"
			duration={500}
			delay={index * 10}
			style={[
				styles.shadow,
				{
					backgroundColor: COLORS.red1,
					margin: 10,
					flexDirection: "row",
					marginHorizontal: 10,
					marginVertical: 5,
					padding: 10,
					borderRadius: 7,
					alignItems: "center",
					backgroundColor: COLORS.light,
				},
			]}
		>
			<View style={{ width: 90 }}>
				<Text
					style={[
						styles.rank,
						{
							fontSize:
								index === 0 ? 25 : index === 1 ? 22 : index === 2 ? 20 : 17,
						},
					]}
				>
					{index + 1}
				</Text>
			</View>
			<View
				style={{
					marginStart: 5,
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
		color: COLORS.secondary,
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
