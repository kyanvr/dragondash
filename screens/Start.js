import React, { useRef, useEffect, useState } from "react";
import {
	ImageBackground,
	StyleSheet,
	Text,
	View,
	Animated,
	SafeAreaView,
} from "react-native";
import image from "../assets/background.png";
import CardCarousel from "../components/CardCarousel";
import { guidelineData, guidelines } from "../constants/guidelines";
import { setInitStatus } from "../utils/dataBaseUtils";
import { secondaryColor } from "../constants/colors";

function Start({ onStart }) {
	const [showCarousel, setShowCarousel] = useState(false);
	const moveAnim = useRef(new Animated.Value(0)).current;
	const fadeInAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		setTimeout(() => {
			moveUp();
		}, 1000);

	}, []);

	const moveUp = () => {
		Animated.timing(moveAnim, {
			toValue: -300,
			duration: 1000,
			useNativeDriver: true,
		}).start(() => {
			fadeInCarousel();
		});
	};

	const fadeInCarousel = () => {
		// Fading in the CardCarousel after the text animation is complete
		setShowCarousel(true);
		Animated.timing(fadeInAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};

	const handleContinue = () => {
		setInitStatus();
		onStart();
	};

	return (
		<SafeAreaView>
			<ImageBackground
				source={image}
				resizeMode="cover"
				style={styles.image}
			>
				<View style={styles.innerContainer}>
					<Animated.Text
						style={[
							styles.text,
							{ transform: [{ translateY: moveAnim }] },
						]}
					>
						Welcome
					</Animated.Text>
					{showCarousel && (
						<Animated.View
							style={[
								styles.carouselContainer,
								{
									opacity: fadeInAnim,
									transform: [
										{
											translateY: fadeInAnim.interpolate({
												inputRange: [0, 1],
												outputRange: [-20, 0],
											}),
										},
									],
								},
							]}
						>
							<CardCarousel
								data={guidelines}
								onContinue={handleContinue}
							 />
						</Animated.View>
					)}
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	image: {
		height: "100%",
	},
	innerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		height: "100%",
	},
	text: {
		color: "white",
		fontSize: 40,
		position: "absolute",
		fontFamily: "DragonHunter",
		color: secondaryColor,
	},
	carouselContainer: {
		marginTop: 50, // Adjust this value to control the position of the carousel
	},
});

export default Start;
