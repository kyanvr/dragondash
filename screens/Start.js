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
import * as SQLite from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";

const Start = () => {
	const [showCarousel, setShowCarousel] = useState(false);
	const moveAnim = useRef(new Animated.Value(0)).current;
	const fadeInAnim = useRef(new Animated.Value(0)).current;
	const db = SQLite.openDatabase("example.db");
	const navigation = useNavigation(); // Get the navigation object
	const level = 1;
	const xp = 0;

	const CardData = [
		{
			name: "Card 1",
			size: "Large",
			wingSpan: "10m",
			color: "Red",
			image: require("../assets/card1.png"),
		},
		{
			name: "Card 2",
			size: "Small",
			wingSpan: "5m",
			color: "Blue",
			image: require("../assets/card1.png"),
		},
		{
			name: "Card 3",
			size: "Medium",
			wingSpan: "7.5m",
			color: "Green",
			image: require("../assets/card1.png"),
		},
	];

	useEffect(() => {
		setTimeout(() => {
			moveUp();
		}, 1000);

		// Check if the database already has an index value
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM card_indices;",
				null,
				(txObj, resultSet) => {
					if (resultSet.rows.length > 0) {
						// If the index value exists, navigate to the Home screen
						navigation.navigate("Home");
					}
				}
			);
		});
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

	const handleContinue = (index) => {
		db.transaction((tx) => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS card_indices (index_value NUMBER);"
			);

			console.log("Table created successfully");
		});

		
		db.transaction((tx) => {
			tx.executeSql(
				"INSERT INTO card_indices (index_value) VALUES (?);",
				[index],
				(txObj, resultSet) => {
					console.log("Index inserted into the database:", index);
					// Add any additional logic you want to perform after insertion.
				},
				(txObj, error) => console.log(error)
				);
			});
			
			navigation.navigate("Home");
		};
		
		db.transaction((tx) => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS user_level (level NUMBER);"
			);

			console.log("Table created successfully");
		});

		db.transaction((tx) => {
			tx.executeSql(
				"INSERT INTO user_level (level) VALUES (?);",
				[level],
				(txObj, resultSet) => {
					console.log("Level inserted into the database:", level);
					// Add any additional logic you want to perform after insertion.
				},
				(txObj, error) => console.log(error)
			);
		});

		db.transaction((tx) => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS user_xp (xp NUMBER);"
			);

			console.log("Table created successfully");
		});

		db.transaction((tx) => {
			tx.executeSql(
				"INSERT INTO user_xp (xp) VALUES (?);",
				[xp],
				(txObj, resultSet) => {
					console.log("XP inserted into the database:", xp);
					// Add any additional logic you want to perform after insertion.
				},
				(txObj, error) => console.log(error)
			);
		});

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
								data={CardData}
								handleContinue={handleContinue}
							/>
						</Animated.View>
					)}
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
};

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
		fontWeight: "bold",
		position: "absolute",
	},
	carouselContainer: {
		marginTop: 300, // Adjust this value to control the position of the carousel
	},
});

export default Start;
