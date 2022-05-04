import React, { useState, useEffect, useRef } from "react";
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
} from "react-native";

import COLORS from "../config/stylesheet/colors";
import ChatMessagesList from "./components/ChatMessagesList";
const PresentationCtrl = require("./PresentationCtrl.js");

import { MaterialIcons } from "@expo/vector-icons";

function ChatScreen({ route, navigation }) {
	let presentationCtrl = new PresentationCtrl();

	const [messages, setMessages] = useState([]);
	const [loggedUser, setLoggedUser] = useState([]);
	const [conversant, setConversantUsers] = useState([]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		fetchChats();
		return () => {};
	}, []);

	const fetchChats = async () => {
		//get chats from db
		//ought to fetch them before navigate
		const id = route.params.id;
		const data = await presentationCtrl.fetchConversation(id);
        
		setLoggedUser(data.users.logged);
		setConversantUsers(data.users.conversant);
		setMessages(data.messages);
	};

	const sendMessage = async () => {
		await presentationCtrl.createMessage(route.params.id, message);
		setMessage('');
		Keyboard.dismiss();

	}

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
				<ChatMessagesList loggedUser={loggedUser} conversant={conversant} messagesList={messages} navigation={navigation}></ChatMessagesList>
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
});
export default ChatScreen;
