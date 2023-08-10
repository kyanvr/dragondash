import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import AlertDialog from "./AlertDialog";

const StepCounter = ({ onStepChange }) => {
	const [steps, setSteps] = useState(0);
	const [isAccelerometerAvailable, setIsAccelerometerAvailable] =
		useState(false);
	const [subscription, setSubscription] = useState(null);

	useEffect(() => {
		checkSensorsAvailability();

		return () => {
			unsubscribeFromSensors();
		};
	}, []);

	useEffect(() => {
		if (onStepChange) {
			onStepChange(steps);
		}
	}, [steps]);

	const checkSensorsAvailability = async () => {
		// Check if the accelerometer is available on the device
		const accelerometerAvailable = await Accelerometer.isAvailableAsync();
		setIsAccelerometerAvailable(accelerometerAvailable);

		if (accelerometerAvailable) {
			// Subscribe to updates
			subscribeToAccelerometer();
		} else {
			<AlertDialog title="Error" message="Accelerometer not available" />;
		}
	};

	const subscribeToAccelerometer = () => {
		const newSubscription = Accelerometer.addListener(({ x, y, z }) => {
			// 1.15 is a threshold value for acceleration
			// If the acceleration is greater than 1.15, we consider it a step
			// This value may vary depending on the device and the way the user walks
			const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
			if (acceleration > 1.15) {
				setSteps((prevSteps) => prevSteps + 1);
			}
		});

		setSubscription(newSubscription);
	};

	const unsubscribeFromSensors = () => {
		if (subscription) {
			subscription.remove();
			setSubscription(null);
		}
	};

	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			{isAccelerometerAvailable ? (
				<>
					<Text style={{ fontSize: 24 }}>
						Step Count (Accelerometer):
					</Text>
					<Text style={{ fontSize: 64, fontWeight: "bold" }}>
						{steps}
					</Text>
				</>
			) : (
				<Text style={{ fontSize: 24 }}>
					Step counting not available on this device
				</Text>
			)}
		</View>
	);
};

export default StepCounter;
