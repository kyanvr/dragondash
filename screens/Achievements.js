import React, { useEffect, useMemo, useState } from "react";
import {
	Text,
	StyleSheet,
	SafeAreaView,
	ImageBackground,
	View,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import ChallengeCard from "../components/AchievementCard";
import backgroundImage from "../assets/background.png";
import { getTotalStepsFromUser } from "../utils/databaseUtils";
import { achievements } from "../constants/achievements";
import { useIsFocused } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { secondaryColor } from "../constants/colors";

const Achievements = () => {
	const [steps, setSteps] = useState(0);
	const [completedAchievements, setCompletedAchievements] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const isFocused = useIsFocused();
	const db = SQLite.openDatabase("example.db");

	useEffect(() => {
		getTotalStepsFromUser()
			.then((result) => {
				setSteps(result);
				getCompletedAchievements();
			})
			.catch((error) => {
				console.log(error);
			});

		if (completedAchievements.length > 0) {
			achievements.forEach((achievement) => {
				completedAchievements.forEach((completedAchievement) => {
					if (achievement.id === completedAchievement.id) {
						achievement.completed = 1;
					}
				});
			});
		}

		setIsLoading(false);
	}, [isFocused, completedAchievements]);

	const getCompletedAchievements = () => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM achievement WHERE completed = 1",
				[],
				(_, { rows }) => {
					setCompletedAchievements(rows._array);
				},
				(_, error) => {
					console.log(error);
				}
			);
		});
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ImageBackground
				source={backgroundImage}
				style={styles.imageBackground}
			>
				<View style={styles.overlay}>
					<View style={styles.container}>
						<Text style={styles.text}>Achievements</Text>
					</View>
					{isLoading ? (
						<ActivityIndicator size="large" color="#fff" />
					) : (
						<ScrollView style={styles.scrollView}>
							{achievements.map((achievement) => (
								<ChallengeCard
									key={achievement.id}
									id={achievement.id}
									achievementTitle={achievement.title}
									description={achievement.description}
									imageSource={achievement.imageSource}
									totalSteps={achievement.totalSteps}
									steps={steps}
									xp={achievement.xp}
									completed={achievement.completed}
								/>
							))}
						</ScrollView>
					)}
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
		paddingHorizontal: 20,
	},
	text: {
		fontSize: 32,
		color: secondaryColor,
		fontFamily: "DragonHunter",
		textAlign: "center",
		marginTop: 80,
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	scrollView: {
		flex: 1,
		marginTop: 20,
	},
});

export default Achievements;
