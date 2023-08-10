import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import { fetchStepCountData } from "../utils/databaseUtils";

const Statistics = () => {
	const [stepCountData, setStepCountData] = useState([]);
	const navigation = useNavigation();

	useEffect(() => {
		// Fetch the step count data from the database
		fetchStepCountData((data) => {
			setStepCountData(data);
		});
	}, []);

	// Format the step count data for the line chart
	const formattedData = {
		labels: stepCountData.map((item) => item.date),
		datasets: [
			{
				data: stepCountData.map((item) => item.steps),
				color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
				strokeWidth: 2,
			},
		],
	};

	const chartConfig = {
		backgroundGradientFrom: "#ffffff",
		backgroundGradientTo: "#ffffff",
		decimalPlaces: 0,
		color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.text}>Statistics</Text>
			</View>
			{stepCountData.length > 0 ? (
				stepCountData.map((item) => (
					<Text key={item.date}>
						{item.date} - {item.steps}
					</Text>
				))
			) : (
				<Text>No data available</Text>
			)}
			
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
		width: "100%",
		paddingHorizontal: 20,
	},
	text: {
		fontSize: 32,
		fontWeight: "bold",
	},
	settingsButton: {
		backgroundColor: "transparent",
		padding: 10,
	},
	settingsButtonText: {
		fontSize: 18,
		color: "black",
	},
});

export default Statistics;
