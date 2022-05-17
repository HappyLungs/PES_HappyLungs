import React from "react";

import COLORS from "../../config/stylesheet/colors";

import { ImageSlider } from "react-native-image-slider-banner";

const ImageCarousel = ({ media }) => {
	return (
		<ImageSlider
			data={
				media.length > 1
					? [
							{
								img: media[0],
							},
							{
								img: media[1],
							},
					  ]
					: media.length > 0
					? [
							{
								img: media[0],
							},
					  ]
					: [
							{
								img: "https://retodiario.com/wp-content/uploads/2021/01/no-image.png",
							},
					  ]
			}
			backgroundColor={COLORS.green1}
			showHeader
			showIndicator
			closeIconColor={COLORS.white}
			caroselImageStyle={{
				height: 200,
			}}
			caroselImageContainerStyle={{
				borderBottomLeftRadius: 50,
				overflow: "hidden",
			}}
			inActiveIndicatorStyle={{
				width: 15,
				height: 4,
				borderRadius: 10,
				backgroundColor: COLORS.lightGrey,
			}}
			activeIndicatorStyle={{
				width: 17,
				height: 4,
				borderRadius: 10,
				backgroundColor: COLORS.secondary,
			}}
			indicatorContainerStyle={{ top: 40 }}
		/>
	);
};

export default ImageCarousel;
