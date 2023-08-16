import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import AlertDialog from "./AlertDialog";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { secondaryColor } from "../constants/colors";

const StepCounter = ({ onStepChange }) => {
	const [steps, setSteps] = useState(0);
	const [isAccelerometerAvailable, setIsAccelerometerAvailable] =
		useState(false);
	const [subscription, setSubscription] = useState(null);

	useEffect(() => {
		// Check if the accelerometer is available on the device
		checkSensorsAvailability();

		return () => {
			// Unsubscribe from sensors when the component is unmounted
			unsubscribeFromSensors();
		};
	}, []);

	useEffect(() => {
		// Notify the parent component of step changes
		if (onStepChange) {
			onStepChange(steps);
		}
	}, [steps]);

	const checkSensorsAvailability = async () => {
		// Check if the accelerometer is available on the device
		const accelerometerAvailable = await Accelerometer.isAvailableAsync();
		setIsAccelerometerAvailable(accelerometerAvailable);

		if (accelerometerAvailable) {
			// Subscribe to accelerometer updates
			subscribeToAccelerometer();
		} else {
			// Show an error message if accelerometer is not available
			<AlertDialog title="Error" message="Accelerometer not available" />;
		}
	};

	const subscribeToAccelerometer = () => {
		// Subscribe to accelerometer updates
		const newSubscription = Accelerometer.addListener(({ x, y, z }) => {
			// Calculate acceleration using the Euclidean norm
			const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);

			// Increment step count if acceleration is above threshold
			if (acceleration > 1.15) {
				setSteps((prevSteps) => prevSteps + 1);
			}
		});

		setSubscription(newSubscription);
	};

	const unsubscribeFromSensors = () => {
		// Unsubscribe from accelerometer updates
		if (subscription) {
			subscription.remove();
			setSubscription(null);
		}
	};

	return (
		<View
			style={styles.container}
		>
			{isAccelerometerAvailable ? (
				<View style={styles.innerContainer}>
					<Text style={styles.title}>
						Step Count:
					</Text>
					<Text style={styles.text}>
						{steps}
					</Text>
				</View>
			) : (
				<Text style={{ fontSize: 24 }}>
					Step counting not available on this device
				</Text>
			)}
		</View>
	);
};

StepCounter.propTypes = {
	onStepChange: PropTypes.func,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		fontFamily: "DragonHunter",
		color: secondaryColor,
		marginBottom: 40,
	},
	text: {
		fontSize: 64,
		fontFamily: "DragonHunter",
		textAlign: "center",
		color: secondaryColor,
	},
});


export default StepCounter;
