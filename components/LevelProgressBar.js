import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { secondaryColor } from "../constants/colors";
import Levels from "../constants/levels";
import PropTypes from "prop-types";

const LevelProgressBar = ({ level, xp }) => {
	const currentLevelObject = Levels.find(
		(levelData) => levelData.level === level
	);

	if (!currentLevelObject) {
		return null;
	}

	const { xpToNextLevel } = currentLevelObject;
	const progress = (xp / xpToNextLevel) * 100;

	return (
		<View style={styles.container}>
			<Text style={styles.levelText}>Level: {level}</Text>
			<Progress.Bar
				progress={progress / 100}
				width={100}
				color={secondaryColor}
			/>
		</View>
	);
};

LevelProgressBar.propTypes = {
	level: PropTypes.number.isRequired,
	xp: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		marginBottom: 20,
        position: "absolute",
        top: 80,
        right: 40,
	},
	levelText: {
		fontSize: 20,
		marginBottom: 5,
        fontFamily: "DragonHunter",
        color: secondaryColor,
	},
});

export default LevelProgressBar;
