import React, { useState, useEffect, useRef, useContext } from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	FlatList,
	Image,
	Dimensions,
} from "react-native";

import Modal from "react-native-modal";

import UserContext from "../../domainLayer/UserContext";
import COLORS from "../../config/stylesheet/colors";
import i18n from "../../config/translation";
const PresentationCtrl = require("../PresentationCtrl.js");
const Socket = require("../Socket");

import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

function GeneralChatScreen({ navigation }) {
	let presentationCtrl = new PresentationCtrl();
	const [user] = useContext(UserContext);
	const [masterData, setMasterData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [auxiliarFilterData, setAuxiliarFilterData] = useState([]);
	const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
	const [chatDeleted, setChatDeleted] = useState({ id: "", name: "" });
	const [search, setSearch] = useState("");
	const AnimationRefFilter1 = useRef(null);
	const s = new Socket(user.email);
	const socket = s.getSocket();

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', async () => {
			fetchChats();
			socket.on('chat message', (data) => {
				fetchChats();
				/*
				setFilteredData(existingItems => {
					let i = 0;
					let index = -1;
					for (let c of existingItems) {
						if (c.id === data.conversation) index = i;
						i++;
					}
					let m = existingItems[index];
					m.lastMessage = data.text;
					m.unreadMessages += 1;
					m.lastMessageTime = data.date+" "+data.hour;
					return [
						m,
						...existingItems.slice(0, index),		  
						...existingItems.slice(index + 1),		  
					]		  
				})
				setMasterData(existingItems => {
					let i = 0;
					let index = -1;
					for (let c of existingItems) {
						if (c.id === data.conversation) index = i;
						i++;
					}
					let m = existingItems[index];
					m.lastMessage = data.text;
					m.unreadMessages += 1;
					m.lastMessageTime = data.date+" "+data.hour;
					return [
						m,
						...existingItems.slice(0, index),		  
						...existingItems.slice(index + 1),		  
					]		  
				})
				*/
			})
			socket.on('new chat', async (data) => {
				let newUser = await presentationCtrl.fetchUser(data.user);
				setFilteredData(existingItems => {
					let exists = false;
					let i = 0;
					for (let c of existingItems) {
						if (c.id === data.conversation) exists = true;
						i++;
					}
					if (exists) return [existingItems]
					else {
						let m = {
							id: data.conversation,
							name: newUser.name,
							profileImage: newUser.profileImage,
							lastMessage: data.text,
							unreadMessages: 1,
							lastMessageTime: data.date+" "+data.hour
						}
						return [
							m,
							...existingItems	  
						]
					}	  
				})
				setMasterData(existingItems => {
					let exists = false;
					let i = 0;
					for (let c of existingItems) {
						if (c.id === data.conversation) exists = true;
						i++;
					}
					if (exists) return [existingItems]
					else {
						let m = {
							id: data.conversation,
							name: newUser.name,
							profileImage: newUser.profileImage,
							lastMessage: data.text,
							unreadMessages: 1,
							lastMessageTime: data.date+" "+data.hour
						}
						return [
							m,
							...existingItems	  
						]
					}	  
				})
			})
		});
	  	return unsubscribe;
	}, []);

	const fetchChats = async () => {
		const data = await presentationCtrl.fetchConversations(user.email);
		setMasterData(data);
		setFilteredData(data);
		setAuxiliarFilterData(data);
	};

	const filterBySearch = (text) => {
		if (text) {
			setAuxiliarFilterData(filteredData);
			setFilteredData(
				masterData.filter((conver) => {
					const converData = conver.name
						? conver.name.toUpperCase()
						: "".toUpperCase();
					const textData = text.toUpperCase();
					return converData.indexOf(textData) > -1;
				})
			);
		} else {
			setFilteredData(masterData);
		}
		setSearch(text);
	};

	function renderChatList() {
		const renderItem = ({ item, index }) => (
			<Animatable.View
				animation="slideInDown"
				duration={500}
				delay={index * 10}
			>
				<View
					style={[
						{
							borderBottomColor: COLORS.light,
							borderBottomWidth: 1,
							backgroundColor: COLORS.white,
						},
					]}
				>
					<View style={{ flexDirection: "column" }}>
						<View style={{ flexDirection: "row" }}>
							<View
								style={{
									width: "85%",
									padding: 10,
								}}
							>
								<TouchableOpacity
									activeOpacity={0.8}
									style={{
										flexDirection: "row",
										flex: 1,
										alignItems: "center",
									}}
									onPress={() => {
										navigation.navigate("ChatConversation", { id: item.id });
									}}
								>
									<Image
										source={{ uri: item.profileImage }}
										style={{
											width: 70,
											height: 70,
											borderRadius: 100,
										}}
									/>
									<View
										style={{
											flex: 1,
											marginTop: 10,
											marginBottom: 10,
											marginLeft: 5,
											alignSelf: "center",
											flexDirection: "row",
											width: "auto",
										}}
									>
										<View style={{}}>
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
														width: "62%",
													}}
												>
													<Text
														numberOfLines={1}
														style={[styles.chatName, { textAlign: "left" }]}
													>
														{item.name}
													</Text>
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
																fontSize: 11,
																//fontWeight: "bold",
																textAlign: "right",
															},
														]}
													>
														{item.lastMessageTime}
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
														width: "90%",
													}}
												>
													<Text
														numberOfLines={2}
														style={styles.chatLastMessage}
													>
														{item.lastMessage}
													</Text>
												</View>

												<View
													style={{
														backgroundColor:
															item.unreadMessages > 0
																? COLORS.green1
																: COLORS.white,
														width: 20,
														height: 20,
														paddingBottom: 1,
														justifyContent: "center",
														borderRadius: 100,
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
														{item.unreadMessages > 0 ? item.unreadMessages : ""}
													</Text>
												</View>
											</View>
										</View>
									</View>
								</TouchableOpacity>
							</View>
							<View
								style={{
									justifyContent: "center",
									alignItems: "center",
									borderLeftColor: COLORS.lightGrey,
									borderLeftWidth: 1,
									width: "15%",
								}}
							>
								<TouchableOpacity
									activeOpacity={0.8}
									onPress={() => {
										setChatDeleted({ id: item.id, name: item.name });
										setModalDeleteVisible(true);
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
				contentContainerStyle={{}}
				scrollEnabled={true}
				data={filteredData}
				keyExtractor={(item) => `${item.id}`}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
			></FlatList>
		);
	}

	function renderHeader() {
		return (
			<View
				style={[
					{
						flexDirection: "row",
						paddingHorizontal: 20,
						alignItems: "center",
						paddingVertical: 15,
						backgroundColor: COLORS.white,
						borderBottomLeftRadius: 20,
						borderBottomRightRadius: 20,
					},
					styles.shadow,
				]}
			>
				<View
					style={{
						flex: 1,
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<View
							style={[
								{
									backgroundColor: COLORS.lightGrey,
									height: 40,
									borderRadius: 12,
									flexDirection: "row",
								},
								styles.shadow,
							]}
						>
							<MaterialIcons
								name="search"
								style={{ alignSelf: "center", marginStart: 10 }}
								color={COLORS.secondary}
								size={35}
							/>
							<TextInput
								multiline={false}
								maxLength={30}
								width={175}
								value={search}
								style={[styles.body, { marginStart: 10 }]}
								placeholder={i18n.t("search")}
								onChangeText={(text) => {
									filterBySearch(text);
								}}
							/>
						</View>
						<View
							style={[
								{
									height: 40,
									flexDirection: "row",
									alignItems: "center",
									alignSelf: "flex-end",
								},
							]}
						>
							<TouchableOpacity
								activeOpacity={0.8}
								style={[
									{
										marginHorizontal: 7,
									},
									styles.shadowSelected,
								]}
								onPress={() => {
									AnimationRefFilter1.current?.pulse(1000);
									navigation.navigate("NewChat");
								}}
							>
								<Animatable.View
									ref={AnimationRefFilter1}
									style={{
										backgroundColor: COLORS.green1,
										borderRadius: 12,
										height: 40,
										justifyContent: "center",
										alignItems: "center",
										paddingHorizontal: 15,
									}}
									animation="pulse"
									duration={1000}
								>
									<Text style={[styles.containerTxt, { color: COLORS.white }]}>
										{i18n.t("newChat")}
									</Text>
								</Animatable.View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		);
	}

	function renderDeletePopupDeclare() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalDeleteVisible}
				onRequestClose={() => {
					setModalDeleteVisible(false);
				}}
				onBackdropPress={() => {
					setModalDeleteVisible(false);
				}}
			>
				<View style={styles.centeredView}>
					<View
						style={[
							styles.modalView,
							styles.shadow,
							{ flexDirection: "column" },
						]}
					>
						<Text style={[styles.modalText, { fontWeight: "bold" }]}>
							Are you sure you want to delete the chat with {chatDeleted.name}?
						</Text>
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<View
								style={{
									flex: 1,
									flexDirection: "row",
									justifyContent: "center",
									marginTop: 10,
								}}
							>
								<TouchableOpacity
									activeOpacity={0.8}
									style={[
										styles.shadow,
										{
											backgroundColor: COLORS.red1,
											width: 80,
											height: 40,
											borderRadius: 10,
											justifyContent: "center",
											alignItems: "center",
											margin: 10,
										},
									]}
									onPress={() => {
										setModalDeleteVisible(false);
									}}
								>
									<Text style={{ color: COLORS.white, fontWeight: "bold" }}>
										{i18n.t("cancel")}
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									activeOpacity={0.8}
									style={[
										styles.shadow,
										{
											backgroundColor: COLORS.green1,
											width: 80,
											height: 40,
											borderRadius: 10,
											justifyContent: "center",
											alignItems: "center",
											margin: 10,
										},
									]}
									onPress={async () => {
										let ok = await presentationCtrl.deleteConversation(chatDeleted.id, user.email);
										if (ok) {
											let dataRemoved = filteredData.filter(
												(item) => item.id !== chatDeleted.id
											);
											setFilteredData(dataRemoved);
										}
										setModalDeleteVisible(false);
									}}
								>
									<Text style={{ color: COLORS.white, fontWeight: "bold" }}>
										{i18n.t("yes")}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: COLORS.light,
				flexDirection: "column",
			}}
		>
			{renderHeader()}
			<View style={[{ flex: 1, marginTop: 10 }]}>{renderChatList()}</View>
			{renderDeletePopupDeclare()}
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		fontSize: 15,
		color: COLORS.darkGrey,
	},
	containerTxt: {
		fontSize: 13,
		fontWeight: "bold",
	},
	chatName: {
		textAlign: "center",
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
		elevation: 5,
	},
	shadowSelected: {
		elevation: 10,
		shadowColor: COLORS.green1,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		width: "80%",
	},
	modalView: {
		margin: 20,
		backgroundColor: COLORS.white,
		borderRadius: 15,
		padding: 15,
		alignItems: "center",
	},
	modalText: {
		textAlign: "center",
		fontSize: 16,
	},
});
export default GeneralChatScreen;
