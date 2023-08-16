import React, { useRef, useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import CarouselItem from "./CarouselItem";
import PaginationDots from "./PaginationDots";
import PropTypes from "prop-types";
import screenWidth from "../constants/screenWidth";

const CardCarousel = ({ data, onContinue }) => {
	const carouselRef = useRef();
	const [activeIndex, setActiveIndex] = useState(0);

	const handleIndexChanged = (index) => {
		setActiveIndex(index);
	};

	return (
		<View style={styles.container}>
			<Carousel
				mode="parallax-horizontal"
				loop={false}
				snapEnabled={true}
				width={screenWidth}
				height={500}
				autoPlay={false}
				data={data}
				scrollAnimationDuration={500}
				renderItem={({ item }) => (
					<CarouselItem item={item} onContinue={onContinue} />
				)}
				onSnapToItem={handleIndexChanged}
				ref={carouselRef}
			/>
			<PaginationDots totalDots={data.length} activeIndex={activeIndex} />
		</View>
	);
};

CardCarousel.propTypes = {
	data: PropTypes.array.isRequired,
	onContinue: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
})


export default CardCarousel;
