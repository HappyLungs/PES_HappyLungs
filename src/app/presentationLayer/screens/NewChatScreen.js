import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, SafeAreaView, TextInput } from "react-native";

import COLORS from "../../config/stylesheet/colors";
import NewChatList from "../components/NewChatList";
import i18n from "../../config/translation";
const PresentationCtrl = require("../PresentationCtrl.js");

import { MaterialIcons } from "@expo/vector-icons";

function GeneralChatScreen({ navigation }) {
	let presentationCtrl = new PresentationCtrl();

	const [masterData, setMasterData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [auxiliarFilterData, setAuxiliarFilterData] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		fetchChats();
		return () => {};
	}, []);

	const fetchChats = async () => {
		//get chats from db
		//ought to fetch them before navigate
		const data = await presentationCtrl.fetchNewConversations();

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
						></View>
					</View>
				</View>
			</View>
		);
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: COLORS.light,
				flexDirection: "column",
			}}
		>
			{renderHeader()}
			<View style={[{ flex: 1, marginTop: 10 }]}>
				<NewChatList
					chatsList={filteredData}
					navigation={navigation}
				></NewChatList>
			</View>
		</SafeAreaView>
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
});
export default GeneralChatScreen;
