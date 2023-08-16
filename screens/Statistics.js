import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	SafeAreaView,
	ImageBackground,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useIsFocused } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import LevelDisplay from "../components/LevelDisplay";
import backgroundImage from "../assets/background.png";
import { Dimensions } from "react-native";
import { primaryColor, secondaryColor } from "../constants/colors";
import Levels from "../constants/levels";
import screenWidth from "../constants/screenWidth";

const Statistics = () => {
	const [userData, setUserData] = useState([]);
	const [stepCountData, setStepCountData] = useState([]);
	const db = SQLite.openDatabase("example.db");
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			fetchUserData();
			fetchStepCountData();
		}
	}, [isFocused]);

	// Update the user's level and xp based on the step count data
	useEffect(() => {
		// update user level when xp changes
			if (userData.length > 0) {
				const newLevel = updateLevel(
					userData[0].level,
					userData[0].xp,
					Levels
				);
				if (newLevel !== userData[0].level) {
					db.transaction((tx) => {
						tx.executeSql(
							"UPDATE user SET level = ? WHERE id = 1;",
							[newLevel],
							(_, resultSet) => {
								setUserData(resultSet.rows._array);
							},
							(_, error) => {
								console.error("Database error:", error); // Log the error
							}
						);
					});
				}
			}
	}, [userData]);

	const updateLevel = (currentLevel, currentXP, levels) => {
		const nextLevel = levels.find((level) => level.xpToNextLevel > currentXP);

		if (nextLevel) {
			return nextLevel.level;
		}

		return currentLevel;
	};
	
	const fetchUserData = () => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM user;",
				null,
				(_, resultSet) => {
					setUserData(resultSet.rows._array);
				},
				(_, error) => {
					console.error("Database error:", error); // Log the error
				}
			);
		});
	};

	// Fetch the step count data from the database
	const fetchStepCountData = () => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM step_count;",
				null,
				(_, resultSet) => {
					setStepCountData(resultSet.rows._array);
				},
				(_, error) => {
					console.error("Database error:", error); // Log the error
				}
			);
		});
	};

	// calculate how much xp is needed for the next level based on the level object
	const calculateXpToNextLevel = (currentLevel) => {
		if (currentLevel >= 1 && currentLevel <= Levels.length) {
			const currentLevelObject = Levels[currentLevel - 1];
			const nextLevelObject = Levels[currentLevel];

			if (currentLevelObject && nextLevelObject) {
				return nextLevelObject.xp - currentLevelObject.xp;
			}
		}

		return 0; // Default to 0 if invalid input
	};

	// Transform the stepCountData to aggregate steps for the same day
	const aggregatedData = stepCountData.reduce((result, data) => {
		const date = data.date.split("T")[0]; // Extract the date part
		if (!result[date]) {
			result[date] = 0;
		}
		result[date] += data.steps;
		return result;
	}, {});

	// Get the last 5 days' worth of aggregated data
	const lastFiveDays = Object.keys(aggregatedData).sort().slice(-5);

	// Format the aggregatedData for the Line Chart
	const formattedData = {
		labels: lastFiveDays,
		datasets: [
			{
				data: lastFiveDays.map((day) => aggregatedData[day]),
			},
		],
	};

	const chartConfig = {
		backgroundColor: primaryColor,
		backgroundGradientFrom: primaryColor,
		backgroundGradientTo: primaryColor,
		decimalPlaces: 0,
		color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		propsForDots: {
			r: "4",
			strokeWidth: "2",
			stroke: secondaryColor,
		},
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ImageBackground
				source={backgroundImage}
				style={styles.imageBackground}
			>
				<View style={styles.overlay}>
					<View style={styles.container}>
						<View style={styles.header}>
							<Text style={styles.text}>Statistics</Text>
						</View>
						<View style={styles.levelDisplay}>
							{userData.length > 0 && (
								<LevelDisplay
									level={userData[0].level}
									xp={userData[0].xp}
									xpToNextLevel={calculateXpToNextLevel(
										(userData[0].level + 1)
									)}
									xpNeeded={calculateXpToNextLevel(
										userData[0].level
									)}
								/>
							)}
						</View>

						{
							// Only show the chart if there is data else show a message
							stepCountData.length > 0 ? (
								<LineChart
									data={formattedData}
									width={screenWidth}
									height={220}
									chartConfig={chartConfig}
									bezier
									style={{
										marginVertical: 8,
										borderRadius: 16,
									}}
								/>
							) : (
								<Text style={styles.chartTitle}>
									No data to display
								</Text>
							)
							
						}
					</View>
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	imageBackground: {
		width: "100%",
		height: "100%",
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	header: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
		width: "100%",
		paddingHorizontal: 20,
		marginTop: 80,
	},
	text: {
		fontSize: 32,
		fontFamily: "DragonHunter",
		color: secondaryColor,
		textAlign: "center",
	},
	levelDisplay: {
		marginBottom: 40,
	},
	chartTitle: {
		fontSize: 24,
		fontFamily: "DragonHunter",
		color: secondaryColor,
		textAlign: "center",
		marginBottom: 10,
	},
});

export default Statistics;
