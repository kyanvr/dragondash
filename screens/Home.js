import React, { useEffect, useState } from "react";
import { View, ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import StepCounter from "../components/StepCounter";
import image from "../assets/background.png";
import AlertDialog from "../components/AlertDialog";
import StepCountPopup from "../components/StepCountPopup";
import CustomButton from "../components/ui/Button";
import {
	checkIfAlreadyInitialized,
	saveStepCountToDatabase,
} from "../utils/dataBaseUtils";
import Start from "./Start";
import * as SQLite from "expo-sqlite";
import LevelProgressBar from "../components/LevelProgressBar";
import { useIsFocused } from "@react-navigation/native";
import CustomTooltip from "../components/ui/Tooltip";

const Home = () => {
	const [showStepCounter, setShowStepCounter] = useState(false);
	const [stepCount, setStepCount] = useState(0);
	const [showPopup, setShowPopup] = useState(false);
	const [alreadyInit, setAlreadyInit] = useState(false);
	const [userData, setUserData] = useState({});

	const isFocused = useIsFocused();

	const db = SQLite.openDatabase("example.db");

	const title = "Stop counting";
	const message = "Are you sure you want to stop counting?";
	const btnText = "Stop counting";

	// Check if the user has already initialized the app
	useEffect(() => {
		if (isFocused) {
			checkIfAlreadyInitialized()
				.then((result) => {
					setAlreadyInit(result);
				})
				.catch((error) => {
					console.log(error);
				});

			fetchUserData();
		}
	}, [isFocused, userData]);

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

	const handleStart = () => {
		setShowStepCounter(true);
		setShowPopup(false);
	};

	const handleStop = () => {
		setShowStepCounter(false);
		saveStepCountToDatabase(stepCount, new Date());
		setShowPopup(true);
	};

	const handlePopupClose = () => {
		setShowPopup(false);
	};

	const handleStepChange = (steps) => {
		setStepCount(steps);
	};

	const handleInitialize = () => {
		setAlreadyInit(true);
	};

	if (!alreadyInit) {
		return <Start onStart={handleInitialize} />;
	}

	return (
		<SafeAreaView>
			<ImageBackground
				source={image}
				resizeMode="cover"
				style={styles.image}
			>
				<View style={styles.tooltip}>
					<CustomTooltip
						text={
							"Arteveldehogeschool, Grafische en Digitale Media"
						}
						iconName={"information-circle"}
						style={styles.tooltip}
					/>
				</View>
				<View style={styles.container}>
					{userData.length > 0 && (
						<LevelProgressBar
							level={userData[0].level}
							xp={userData[0].xp}
						/>
					)}
					{!showStepCounter ? (
						<View style={styles.stepCountStart}>
							<CustomButton
								title={"Start"}
								onPress={handleStart}
							/>
							<StepCountPopup
								visible={showPopup}
								steps={stepCount}
								onClose={handlePopupClose}
							/>
						</View>
					) : (
						<View style={styles.stepCount}>
							<StepCounter onStepChange={handleStepChange} />
							<AlertDialog
								title={title}
								message={message}
								btnText={btnText}
								onOKPress={handleStop}
							/>
						</View>
					)}
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
	},
	title: {
		fontSize: 32,
		fontFamily: "DragonHunter",
	},
	image: {
		height: "100%",
	},
	stepCountStart: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	stepCount: {
		height: 300,
	},
	tooltip: {
		position: "absolute",
		top: 80,
		left: 40
	},
});

export default Home;
