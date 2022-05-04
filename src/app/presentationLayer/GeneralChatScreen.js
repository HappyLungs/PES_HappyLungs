import React, { useState, useEffect, useRef } from "react";
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
	Dimensions
} from "react-native";

import COLORS from "../config/stylesheet/colors";
import ChatList from "./components/ChatList";
import i18n from "../config/translation";
const PresentationCtrl = require("./PresentationCtrl.js");

import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";






function GeneralChatScreen({ navigation }) {
	let presentationCtrl = new PresentationCtrl();

	const [masterData, setMasterData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [auxiliarFilterData, setAuxiliarFilterData] = useState([]);
	const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
	const [search, setSearch] = useState("");
	const AnimationRefFilter1 = useRef(null);

	useEffect(() => {
		fetchChats();
		return () => {};
	}, []);

	const fetchChats = async () => {
		//get chats from db
		//ought to fetch them before navigate
		const data = await presentationCtrl.fetchConversations();

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
						flex: 1,
						flexDirection: "column",
						alignItems: "center",
						marginBottom: 15,
					}}
				>
					<Text
						style={[
							{
								fontSize: 20,
								fontWeight: "bold",
								color: COLORS.secondary,
								marginTop: 50,
								marginBottom: 10,
							},
						]}
					>
						Chats
					</Text>
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
				{renderChatList(filteredData)}
			</View>
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
});
export default GeneralChatScreen;
