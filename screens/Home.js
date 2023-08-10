import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Button,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
} from "react-native";
import StepCounter from "../components/StepCounter";
import image from "../assets/background.png";
import AlertDialog from "../components/AlertDialog";
import * as SQLite from "expo-sqlite";
import formatDateToString from "../utils/formatDateToString";
import StepCountPopup from "../components/StepCountPopup";

const Home = () => {
	const [showStepCounter, setShowStepCounter] = useState(false);
	const [stepCount, setStepCount] = useState(0);
	const [showPopup, setShowPopup] = useState(false);

	const db = SQLite.openDatabase("example.db");

	const title = "Stop counting";
	const message = "Are you sure you want to stop counting?";
	const btnText = "Stop";

	useEffect(() => {
		// Check if the database has no index value
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM card_indices;",
				null,
				(txObj, resultSet) => {
					if (resultSet.rows.length === 0) {
						// If the database has no index value, set the index to 0
						navigator.navigate("Start");
					}
				}
			);
		});
	}, []);


	const handleStart = () => {
		setShowStepCounter(true);
		setStepCount(0);
		setShowPopup(false);
	};

	const handleStop = () => {
		setShowStepCounter(false);
		saveStepCountToDatabase(stepCount, new Date());
		setShowPopup(true);
	};

	const handlePopupClose = () => {
		// Close the popup when the user clicks the "Close" button
		setShowPopup(false);
	};

	const saveStepCountToDatabase = (steps, date) => {
		const db = SQLite.openDatabase("example.db");

		db.transaction((tx) => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS step_count (steps NUMBER, date DATETIME);"
			);
		});

		db.transaction((tx) => {
			tx.executeSql(
				"INSERT INTO step_count (steps, date) VALUES (?, ?);",
				[steps, formatDateToString(date)],
				() => {
					setStepCount(steps);
				},
				(txObj, error) => console.log(error)
			);
		});
	};

	const handleStepChange = (steps) => {
		// Update the step count in the Home component whenever it changes in the StepCounter component
		setStepCount(steps);
	};

	return (
		<SafeAreaView>
			<ImageBackground
				source={image}
				resizeMode="cover"
				style={styles.image}
			>
				<View style={styles.container}>
					{!showStepCounter ? (
						<>
							<Button title="Start" onPress={handleStart} />
							<StepCountPopup
								visible={showPopup}
								steps={stepCount}
								onClose={handlePopupClose}
							/>
						</>
					) : (
						<>
							<StepCounter onStepChange={handleStepChange} />
							<AlertDialog
								title={title}
								message={message}
								btnText={btnText}
								onOKPress={handleStop}
							/>
						</>
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
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
	},
	image: {
		height: "100%",
	},
});

export default Home;
