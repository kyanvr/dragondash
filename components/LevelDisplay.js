import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { secondaryColor } from "../constants/colors";
import Dragon from "./Dragon";
import { Dimensions } from "react-native";
import PropTypes from "prop-types";

const LevelDisplay = ({ level, xp, xpToNextLevel, xpNeeded }) => {
	const progress = xp / (xpToNextLevel + xp);
	const screenWidth = Dimensions.get("window").width - 80;

	return (
		<View style={styles.container}>
			<Dragon userLevel={level} />
			<Text style={styles.levelText}>Level {level}</Text>
			<Progress.Bar
				progress={progress}
				width={screenWidth}
				color={secondaryColor}
			/>
			<Text style={styles.xpText}>
				{xp} XP
				<Text style={styles.xpNeeded}>
					({xpNeeded} XP untill next level)
				</Text>
			</Text>
			<Text style={styles.xpText}></Text>
		</View>
	);
};

LevelDisplay.propTypes = {
	level: PropTypes.number.isRequired,
	xp: PropTypes.number.isRequired,
	xpToNextLevel: PropTypes.number.isRequired,
	xpNeeded: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		marginTop: 20,
	},
	levelText: {
		fontSize: 20,
		fontWeight: "bold",
		color: secondaryColor,
		marginTop: 10,
		marginBottom: 10,
	},
	xpText: {
		marginTop: 10,
		fontSize: 16,
		color: "white",
		textAlign: "center",
	},
	xpNeeded: {
		fontSize: 12,
		color: "rgba(255, 255, 255, 0.5)",
	},
});

export default LevelDisplay;
