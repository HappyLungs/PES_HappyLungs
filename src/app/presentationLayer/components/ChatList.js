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
import { EvilIcons } from '@expo/vector-icons'; 


import * as Animatable from "react-native-animatable";

import COLORS from "../../config/stylesheet/colors";


const ChatList = ({ chatsList, navigation }) => {	


	const renderItem = ({ item, index }) => (

		<Animatable.View animation="slideInDown" duration={500} delay={index * 10}>
			<View
				style={[
					{
						borderBottomColor:COLORS.light,
						borderBottomWidth:1,
						backgroundColor: COLORS.white,
					},
				]}
			>
				<View style={{ flexDirection: "column" }}>
					<View style={{ flexDirection: "row" }}>
						<View 
							style={{
								width:"85%",
								padding: 10,
							}}
						>
							<TouchableOpacity
								style={{
									flexDirection: "row",
									flex: 1,
									alignItems: "center",
								}}
								onPress={() => {
									navigation.navigate("ChatConversation");
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
										marginTop: 10,
										marginBottom:10,
										marginLeft:5,
										alignSelf: "center",
										flexDirection: "row",
										width: "auto",
									}}
								>
									<View
										style={{
										}}
									>
										<View
											style={{
												flexDirection: "row",
												justifyContent: "space-between",
												alignItems: "flex-start",
												paddingStart: 5,
											}}
										>
											<View
												style={{
													alignSelf: "flex-start",
													padding: 2,
													width:"75%"
												}}
											>
												<Text numberOfLines={1} style={[styles.chatName, {textAlign:"left"}]}>{item.name}</Text>
											</View>
											<View
												style={{
													alignSelf: "flex-end",
													padding: 2,
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
													width:"90%",
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
									
									
								</View>
							</TouchableOpacity>
						</View>
						<View
							style={{
								justifyContent:"center",
								alignItems: "center",
								borderLeftColor:COLORS.lightGrey,
								borderLeftWidth:1,
								width:"15%",
							}}
						>
							<TouchableOpacity
								onPress={() => {
									/*navigation.navigate("ChatConversation");*/
								}}
							>
								<EvilIcons
									name="trash"
									style={styles.sendIcon}
									color={COLORS.red1}
									size={35}
								/>
							</TouchableOpacity>
						</View>
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
