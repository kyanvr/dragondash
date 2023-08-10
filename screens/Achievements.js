import React from "react";
import {
	Text,
	StyleSheet,
	SafeAreaView,
	ImageBackground,
	View,
} from "react-native";
import ChallengeCard from "../components/ChallengeCard";
import image from "../assets/exampleCard.png";
import backgroundImage from "../assets/background.png";

const Achievements = ({}) => {
	return (
		<SafeAreaView style={styles.safeArea}>
			<ImageBackground
				source={backgroundImage}
				style={styles.imageBackground}
			>
				<View style={styles.container}>
					<Text style={styles.text}>Achievements</Text>
				</View>
				<View style={styles.overlay}>
					<ChallengeCard
						challengeTitle={"Wandel 10km"}
						description={"Wandel 10km"}
						imageSource={image}
						totalSteps={10000}
						completedSteps={5000}
					/>
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	imageBackground: {
		width: "100%",
		height: "100%",
	},
	container: {
		padding: 20,
	},
	text: {
		fontSize: 32,
		fontWeight: "bold",
		color: "white",
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
	},
});

export default Achievements;
