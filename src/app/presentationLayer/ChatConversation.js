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
import COLORS from "../config/stylesheet/colors";
const PresentationCtrl = require("./PresentationCtrl.js");

import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

function ChatScreen({ route, navigation }) {
	let presentationCtrl = new PresentationCtrl();

	const [user] = useContext(UserContext);
	const [messages, setMessages] = useState([]);
	const [loggedUser, setLoggedUser] = useState([]);
	const [conversant, setConversantUsers] = useState([]);
	const [message, setMessage] = useState("");
	const [lastDate, setLastDate] = useState("");
	const [newChat, setNewChat] = useState(false);
	const [id, setId] = useState("");
	const [modalErrorVisible, setModalErrorVisible] = useState(false);

	useEffect(() => {
		fetchChats();
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
		}
	};

	const sendMessage = async () => {
		if (newChat) {
			let newId = await presentationCtrl.createConversation(conversant.email, message, user.email);
			if (newId != "error") {
				setNewChat(false);
				let data = await presentationCtrl.fetchConversation(newId);
				setId(newId);
				setLoggedUser(data.users.logged);
				setConversantUsers(data.users.conversant);
				setLastDate("");
				setMessages(data.messages);
			} else {
				setModalErrorVisible(true);
			}
		} else {
			let newMessage = await presentationCtrl.createMessage(id, message, user.email);
			if(newMessage != null) {
				setLastDate("");
				messages.push(newMessage);
			}
		}
		setMessage("");
		Keyboard.dismiss();
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

	function chatMessagesList () {	
		
		const renderItem = ({ item, index }) => {
			let newDate = false;
			if (item.date != lastDate) {
				setLastDate(item.date);
				newDate = true;
			}
	
			return (
				<Animatable.View animation="slideInDown" duration={500} delay={index * 10}>
					{ newDate ? 
						<View
							style = {{
								alignItems: "center",
								padding: 4,
							}}
						>
							<Text
								style = { [styles.dateText ,{
									borderRadius: 10,
									paddingLeft: 4,
									paddingRight: 4,
								}]}
							> { lastDate } </Text>
						</View>
					: <View></View> }
					<View
						style={[
							{
								backgroundColor: item.user===loggedUser.email ? COLORS.green3 : COLORS.white,
								borderRadius: 30,
								marginRight: item.user===loggedUser.email ? 20 : 50,
								marginLeft: item.user===loggedUser.email ? 50 : 20,
								marginTop: 4,
								marginBottom: 4
							},
						]}
					>
						
						<View style={{ flexDirection: "row" }}>
							{item.user===loggedUser.email ?  <View></View> :
							<View
								style={{
									paddingLeft: 10,
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								<TouchableOpacity>
									<MaterialIcons
										name="report-problem"
										color={COLORS.red1}
										size={25}
									/>
								</TouchableOpacity>
							</View>}
							<View 
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									paddingTop: 6,
									paddingRight: 7,
									paddingBottom: 8,
									paddingLeft: item.user===loggedUser.email ? 9 : 2,
								}}
							>
								<View>
									<Text style={styles.chatLastMessage}>{item.text}</Text>
								</View>
								<View
									style={{
										justifyContent:"flex-end"
									}}
								>
									<Text
										style={[
											styles.messageHour,
											{
												color: COLORS.darkGrey,
												fontSize: 12,
												textAlign: "right",
	
											},
										]}
									>
										{ item.hour }
									</Text>
								</View>
							</View>
						</View>
					</View>
				</Animatable.View>
			)		
		};
	
		return (
			
			<FlatList
				stickyHeaderHiddenOnScroll={true}
				contentContainerStyle={{ }}
				scrollEnabled={true}
				data={messages}
				extraData={messages}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
			></FlatList>
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
							borderRadius: 100
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
			<View style={[{ flex: 1, marginTop: 10 }]}>
				{chatMessagesList()}
			</View>
			<KeyboardAvoidingView
				style={styles.messageInputBox}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset='0'
			>
				<View
					style={{
						flexDirection: "row"
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
						style={{justifyContent:"center"}}
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
		position: 'absolute',
		bottom: 0,
		width: '100%',
		alignItems: 'center',
		backgroundColor: COLORS.white,
		borderTopColor: COLORS.secondary,
		padding: 0
	},
	messageInput: {
		fontSize: 15,
		margin:5,
		padding: Platform.OS === 'ios' ? 10 : 5,
		borderRadius: 20,
		backgroundColor: COLORS.lightGrey,
		width: '80%'
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
		color: COLORS.secondary,
		fontWeight: "bold"
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