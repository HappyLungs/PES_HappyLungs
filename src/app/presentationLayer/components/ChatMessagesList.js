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



const ChatMessagesList = ({ loggedUser, conversant, messagesList, navigation }) => {	

	let lastDate = "";

	const printDate = (item) => {
		return (
			<text> {item.date} </text>
		);
	}

	const renderItem2 = ({ item, index }) => (
		<view><text>Hello</text></view>
	);

	const renderItem = ({ item, index }) => {
		let newDate = false;
		if (item.date != lastDate) {
			lastDate = item.date;
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
							backgroundColor: item.user===loggedUser.id ? COLORS.white : COLORS.green3,
							borderRadius: 30,
							marginRight: item.user===loggedUser.id ? 50 : 20,
							marginLeft: item.user===loggedUser.id ? 20 : 50,
							marginTop: 4,
							marginBottom: 4
						},
					]}
				>
					
					<View style={{ flexDirection: "column" }}>
						<View 
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								paddingTop: 6,
								paddingRight: 7,
								paddingBottom: 8,
								paddingLeft: 9,
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

	const ListEmptyComponent = () => {
		const anim = {
			0: { translateY: 0 },
			0.5: { translateY: 50 },
			1: { translateY: 0 },
		};
		return (
			<Animatable.View
				style={{
					height: Dimensions.get("window").height,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Animatable.Text
					animation={anim}
					easing="ease-in-out"
					duration={3000}
					style={{ fontSize: 24 }}
					iterationCount="infinite"
				>
					Empty List!
				</Animatable.Text>
			</Animatable.View>
		);
	};

	return (
		
		<FlatList
			stickyHeaderHiddenOnScroll={true}
			contentContainerStyle={{ }}
			scrollEnabled={true}
			data={messagesList}
			extraData={messagesList}
			keyExtractor={(item) => item.id}
			renderItem={renderItem}
			showsVerticalScrollIndicator={false}
			ListEmptyComponent={ListEmptyComponent}
		></FlatList>
	)

};

const styles = StyleSheet.create({
	containerTxt: {
		fontSize: 13,
		color: COLORS.white,
		marginHorizontal: 10,
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
});

export default ChatMessagesList;
