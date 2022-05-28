import React, { useContext } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { Rating } from "react-native-ratings";

import COLORS from "../../config/stylesheet/colors";
import UserContext from "../../domainLayer/UserContext";

const PinPreview = ({ item }) => {
	const [user] = useContext(UserContext);

	return (
		<Animatable.View animation="pulse" duration={1000}>
			<View
				style={[
					{
						flexDirection: "row",
						backgroundColor: COLORS.white,
						borderTopStartRadius: 10,
						borderTopEndRadius: 10,
						borderBottomEndRadius: 0,
						borderBottomStartRadius: 0,
						padding: 15,
					},
					styles.shadow,
				]}
			>
				<View
					style={{
						marginEnd: 15,
						flexDirection: "column",
					}}
				>
					<Text
						numberOfLines={1}
						style={[styles.pinName, { flexWrap: "wrap" }]}
					>
						{item.title}
					</Text>

					<Rating
						type={"custom"}
						imageSize={15}
						fractions={0}
						startingValue={item.rating}
						ratingBackgroundColor={COLORS.secondary}
						ratingColor={COLORS.green1}
						tintColor={COLORS.white}
						readonly={true}
						style={{
							alignSelf: "flex-start",
							marginTop: 5,
						}}
					/>
					<Text style={styles.profile}>{item.creatorName}</Text>
				</View>
				<View style={styles.shadow}>
					<Image
						source={{
							uri:
								item.media.length !== 0
									? item.media[0]
									: "https://retodiario.com/wp-content/uploads/2021/01/no-image.png",
						}}
						style={{
							width: 75,
							height: 75,
							borderRadius: 10,
						}}
					/>
				</View>
			</View>
		</Animatable.View>
	);
};

const styles = StyleSheet.create({
	pinName: {
		fontSize: 15,
		fontWeight: "bold",
		color: COLORS.secondary,
	},
	txt: {
		fontSize: 12,
		marginTop: 5,
		color: COLORS.darkGrey,
	},
	profile: {
		color: COLORS.green1,
		fontSize: 13,
		marginTop: 10,
		fontWeight: "bold",
	},
	containerTxt: {
		fontSize: 15,
		color: COLORS.white,
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
		elevation: 10,
	},
});

export default PinPreview;
