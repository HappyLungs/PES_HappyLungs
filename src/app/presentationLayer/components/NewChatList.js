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

const ChatList = ({ chatsList, navigation }) => {
	const renderItem = ({ item, index }) => (
		<Animatable.View animation="slideInDown" duration={500} delay={index * 10}>
			<View
				style={[
					styles.shadow,
					{
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
								padding: 10,
							}}
							onPress={() => {
								//navigation.navigate("ChatScreen");
							}}
						>
							<Image
								source={{ uri: item.profileImage }}
								style={{
									width: 50,
									height: 50,
									borderRadius: 100,
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
										alignItems: "flex-start",
										paddingStart: 5,
										width: 280,
									}}
								>
									<View
										style={{
											alignSelf: "flex-start",
											padding: 2,
											width: 215,
										}}
									>
										<Text
											numberOfLines={1}
											style={[styles.chatName, { textAlign: "left" }]}
										>
											{item.name}
										</Text>
									</View>
								</View>
							</View>
						</TouchableOpacity>
					</View>
				</View>
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
			ItemSeparatorComponent={() => {
				return (
					<View
						style={{
							width: "100%",
							marginTop: 0,
						}}
					></View>
				);
			}}
		></FlatList>
	);
};

const styles = StyleSheet.create({
	chatName: {
		textAlign: "center",
		fontSize: 15,
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

export default ChatList;
