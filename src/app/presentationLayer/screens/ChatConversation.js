import React, { useState, useEffect, useRef, useContext } from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	Image,
	TextInput,
	Keyboard,
	KeyboardAvoidingView,
	Button,
	TouchableOpacity,
	FlatList,
	Modal
} from "react-native";

import UserContext from "../../domainLayer/UserContext";
import COLORS from "../../config/stylesheet/colors";
const PresentationCtrl = require("../PresentationCtrl");
const Socket = require("../Socket");
import * as Clipboard from 'expo-clipboard';

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable";
import { setDate } from "date-fns";
import { useIsFocused } from '@react-navigation/native';

function ChatScreen({ route, navigation }) {
	let presentationCtrl = new PresentationCtrl();

	const [user] = useContext(UserContext);
	const [messages, setMessages] = useState([]);
	const [loggedUser, setLoggedUser] = useState([]);
	const [conversant, setConversantUsers] = useState({});
	const [message, setMessage] = useState("");

	const [newChat, setNewChat] = useState(false);
	const [id, setId] = useState("");
	const [modalErrorVisible, setModalErrorVisible] = useState(false);
	const [modalOptionsVisible, setModalOptionsVisible] = useState(false);
	const [selectedMessage, setSelectedMessage] = useState({text:"", _id:""});
	
	const socketRef = useRef(null);
	const flatListRef = useRef();
	const s = new Socket(user.email);
	const socket = s.getSocket();

	useEffect( () => {
		fetchChats();
			socket.on('chat message', async (data) => {
				if(await useIsFocused()) {
					let exists = false;
					for (let ms of messages) if(ms._id === data._id) exists = true;
					if (!exists) {
						setMessages(oldArray => [...oldArray, data]);
					}
					await presentationCtrl.fetchMessage(data.conversation, user.email);
				}
			});
		return () => {};
  	}, []);


	const fetchChats = async () => {
		if (route.params.id) {
			let id = route.params.id;
			const data = await presentationCtrl.fetchConversation(id, user.email);
			setId(id);
			setLoggedUser(data.users.logged);
			setConversantUsers(data.users.conversant);
			setMessages(data.messages);
		} else { //new chat
			const data = await presentationCtrl.fetchUser(route.params.user)
			setNewChat(true);
			setConversantUsers(data);
			setLoggedUser(user);
		}
	};

	const sendMessage = async () => {
		if (message != "") {
			if (newChat) {
				let newId = await presentationCtrl.createConversation(conversant.email, message, user.email);
				if (newId != "error") {
					setNewChat(false);
					let data = await presentationCtrl.fetchConversation(newId, user.email);
					setMessages(data.messages);
					const info = {message: data.messages[0], to: data.users.conversant.email}
					socket.emit('new chat', info);
					setId(newId);
				} else {
					setModalErrorVisible(true);
				}
			} else {
				let newMessage = await presentationCtrl.createMessage(id, message, user.email);
				if(newMessage != null) {
					let exists = false;
					for (m of messages) {
						if(m._id === newMessage._id) exists = true;
					}
					if (!exists) setMessages(oldArray => [...oldArray, newMessage]);
					const info = {message: newMessage, to: conversant}
					socket.emit('chat message', info);
				}
			}
			setMessage("");
			Keyboard.dismiss();
			flatListRef.current.scrollToEnd({animating: true})
		}
	}

	const reportMessage = async () => {
		setMessages(existingItems => {
			let i = 0; 
			let index = -1;
			for (c of existingItems) {
				if (selectedMessage._id === c._id) index = i;
				i++;
			}
			let m = existingItems[index];
			m.reported = !m.reported;
			return [
				  ...existingItems.slice(0, index),
				  m,		  
				  ...existingItems.slice(index + 1),		  
			]		  
		})
		await presentationCtrl.reportMessage(selectedMessage._id);
		setModalOptionsVisible(false);
	}

	function renderErrorPopupDeclare() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalErrorVisible}
				onRequestClose={() => {
					setModalErrorVisible(false);
				}}
				onBackdropPress={() => {
					setModalErrorVisible(false);
				}}
			>
				<View style={styles.centeredView}>
					<View style={[styles.modalView, styles.shadow, {flexDirection:"column"}]}>
						<Text style={[styles.modalText, { fontWeight: "bold" }]}>
							Error!
						</Text>
						<View 
							style={{
								flexDirection:"row",
								
							}}
						>
							<View
								style={{
									flex:1,
									flexDirection:"row",
									justifyContent:"center",
									marginTop: 10									
								}}
							>
								<TouchableOpacity
									style={[styles.shadow,{
										backgroundColor:COLORS.green1,
										width: 80,
										height: 40,
										borderRadius: 10,
										justifyContent:"center",
										alignItems:"center",
										margin: 10
									}]}
									onPress={async () => {
										setModalErrorVisible(false);
									}}
								>
									<Text style={{color:COLORS.white,fontWeight:"bold"}}>Ok</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	function renderOptionsPopupDeclare() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalOptionsVisible}
				onRequestClose={() => {
					setModalOptionsVisible(false);
				}}
				onBackdropPress={() => {
					setModalOptionsVisible(false);
				}}
			>
				<View style={styles.centeredView}>
					<View 
						style={[styles.modalView, styles.shadow, {
							flexDirection:"column",
						}]}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "flex-end",
								width: "100%"								
							}}
						>
							<TouchableOpacity
								onPress={() => setModalOptionsVisible(false)}
								style = {{
									padding: 10
								}}
							>
								<AntDesign name="close" size={20} color="black" />
							</TouchableOpacity>
						</View>
						<Text
							style = {{
								marginBottom: 20,
								fontWeight: "bold"
							}}
						>
							{ selectedMessage.text }
						</Text>
						<View>
							<TouchableOpacity
								style = {{
									flexDirection: "row",
									alignItems: "flex-start",
									marginBottom: 10
								}}
								onPress={() => {
									Clipboard.setString(selectedMessage.text)
									setModalOptionsVisible(false)
								}}						>
								<MaterialIcons name="content-copy" size={24} color="black" />
								<Text
									style = {{
										marginLeft: 5
									}}
								>Copy message</Text>
							</TouchableOpacity>
							{selectedMessage.user===loggedUser.email ? <View></View> :
							<TouchableOpacity
								onPress={async () => {reportMessage()}}
								style = {{
									flexDirection: "row",
									alignItems: "flex-start"
								}}
							>
								<MaterialIcons name="report-problem" size={24} color="black" />
								<Text
									style = {{
										marginLeft: 5
									}}
								>{selectedMessage.reported ? "Unreport" : "Report"} message</Text>
							</TouchableOpacity>
							}
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	function chatMessagesList () {	
		

		const renderItem = ({ item, index }) => {

			return (
				<Animatable.View /*animation="slideInDown" duration={500} delay={index * 10}*/>
					<TouchableOpacity
						onLongPress={() => {
							setSelectedMessage(item);
							setModalOptionsVisible(true);
						}}
					>
						<View
							style = {{
								marginRight: item.user===loggedUser.email ? 20 : 50,
								marginLeft: item.user===loggedUser.email ? 50 : 20,
								marginBottom: 6
							}}
						>
							<View
								style = {{
									borderRadius: 10,
								}}
							>
								<View>
									<Text
										style = { [styles.dateText ,{
											borderRadius: 10,
											paddingLeft: 4,
											paddingRight: 4,
											textAlign: item.user===loggedUser.email ? "right" : "left"
										}]}
									> { item.date } { item.hour } {item.user===loggedUser.email ? "Me" : ""} </Text>
								</View>
							</View>
							<View>
								<View 
									style={{
										flexDirection: "row",
										justifyContent: item.user===loggedUser.email ? "flex-end": "flex-start",
									}}
								>
									<Text 
										style={[styles.chatLastMessage, {
											backgroundColor: item.user===loggedUser.email ? COLORS.green3 : (item.reported ? COLORS.softRed : COLORS.mediumGrey),
											borderRadius: 10,
											paddingTop: 6,
											paddingRight: 7,
											paddingBottom: 8,
											minWidth: 120,
											maxWidth: 300,
											paddingLeft: 7,
											textAlign: item.user===loggedUser.email ? "right" : "left"
										}]}										
									>{item.text}</Text>
								</View>
							</View>
						</View>
					</TouchableOpacity>
				</Animatable.View>
			)		
		};
	
		return (
			
			<View>
				<FlatList
				ref={flatListRef}
				stickyHeaderHiddenOnScroll={true}
				contentContainerStyle={{ }}
				scrollEnabled={true}
				data={messages}
				extraData={messages}
				keyExtractor={(item) => item._id}
				renderItem={renderItem}
				showsVerticalScrollIndicator={true}
				onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
			></FlatList>
			</View>
			
		)
	
	};

	function renderHeader() {
		return (
			<View
				style={[
					{
						flexDirection: "row",
						paddingHorizontal: 20,
						alignItems: "center",
						backgroundColor: COLORS.white,
						borderBottomLeftRadius: 20,
						borderBottomRightRadius: 20,
					},
					styles.shadow,
				]}
			>
				<View
					style={{
						marginTop: 50,
						flex: 1,
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "center",
						marginBottom: 15,
					}}
				>
					<Image
						source={{ uri: conversant.profileImage }}
						style={{
							width: 50,
							height: 50,
							borderRadius: 100,
						}}
					/>
					<Text
						style={[
							{
								marginLeft: 10,
								fontSize: 20,
								fontWeight: "bold",
								color: COLORS.secondary,
							},
						]}
					>
						{conversant.name}
					</Text>
				</View>
			</View>
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
			<View style={[{ flex: 1, marginTop: 10 , marginBottom:50}]}>
				{chatMessagesList()}
			</View>
			<KeyboardAvoidingView
				style={styles.messageInputBox}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset="0"
			>
				<View
					style={{
						flexDirection: "row",
					}}
				>
					<TextInput
						onChangeText={setMessage}
						style={styles.messageInput}
						onSubmitEditing={sendMessage}
						value={message}
					/>
					<TouchableOpacity
						onPress={sendMessage}
						style={{ justifyContent: "center" }}
					>
						<MaterialIcons
							name="send"
							style={styles.sendIcon}
							color={COLORS.secondary}
							size={35}
						/>
					</TouchableOpacity>
				</View>
  			</KeyboardAvoidingView>
			  {renderErrorPopupDeclare()}
			  {renderOptionsPopupDeclare()}
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
	messageInputBox: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		alignItems: "center",
		backgroundColor: COLORS.white,
		borderTopColor: COLORS.secondary,
		padding: 0,
	},
	messageInput: {
		fontSize: 15,
		margin: 5,
		padding: Platform.OS === "ios" ? 10 : 5,
		borderRadius: 20,
		backgroundColor: COLORS.lightGrey,
		width: "80%",
	},
	sendIcon: {
		alignSelf: "center",
		marginStart: 10,
		color: COLORS.green1
	},
	messageHour: {
        textAlign: 'center',
		fontSize: 14,
		color: COLORS.secondary,
		
	},
	chatLastMessage: {
		fontSize: 15,
		alignSelf: "flex-start",
		color: COLORS.secondary,
		marginHorizontal: 5,
	},
	dateText: {
		color: COLORS.darkGrey,
		fontSize: 12
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


export default ChatScreen;
