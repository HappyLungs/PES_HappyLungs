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
                                padding: 10
							}}
							onPress={() => {
								//navigation.navigate("OwnerPin", { pin: item });
							}}
						>
							<Image
								source={{ uri: item.profileImage }}
								style={{
									width: 70,
									height: 70,
									borderRadius: 100
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
										width: 280
									}}
								>
									<View
										style={{
											alignSelf: "flex-start",
											padding: 2,
											width:215,
										}}
									>
										<Text numberOfLines={1} style={[styles.chatName, {textAlign:"left"}]}>{item.name}</Text>
									</View>
									<View
										style={{
											alignSelf: "flex-end",
											padding: 2,
											width: 55
										}}
									>
										<Text
											style={[
												styles.chatName,
												{
													color: COLORS.darkGrey,
													fontSize: 12,
													fontWeight: "bold",
													textAlign: "right"
												},
											]}
										>
											{ item.lastMessageTime }
										</Text>
									</View>
								</View>
								<View
									style={{
										flexDirection: "row",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
									}}
								>
									
                                    <View
										style={{
											width:260,
										}}
									>
										<Text numberOfLines={2} style={styles.chatLastMessage}>{item.lastMessage}</Text>
									</View>
									 
                                    <View
										style={{
											backgroundColor: item.unreadMessages>0 ? COLORS.green1 : COLORS.white,
                                            width:20,
                                            height: 20,
                                            paddingBottom:1,
                                            justifyContent: "center",
                                            borderRadius: 100
										}}
									>
										<Text
											style={[
												styles.chatName,
												{
													color: COLORS.white,
													fontSize: 12,
													fontWeight: "bold",
												},
											]}
										>
											{ item.unreadMessages>0 ? item.unreadMessages : "" }
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
			contentContainerStyle={{ }}
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
	containerTxt: {
		fontSize: 13,
		color: COLORS.white,
		fontWeight: "bold",
		marginHorizontal: 10,
	},
	chatName: {
        textAlign: 'center',
		fontSize: 15,
		fontWeight: "bold",
		color: COLORS.secondary,
		
	},
	chatLastMessage: {
		fontSize: 13,
		alignSelf: "flex-start",
		color: COLORS.darkGrey,
		marginHorizontal: 5,
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
