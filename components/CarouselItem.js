import React from "react";
import { Text, StyleSheet, Image } from "react-native";
import CustomButton from "./ui/Button";
import { SafeAreaView } from "react-native";
import { secondaryColor } from "../constants/colors";

const CarouselItem = ({ item, onContinue }) => {

	return (
		<SafeAreaView style={styles.card}>
			<Text style={styles.title}>{item.title}</Text>
			<Text style={styles.description}>{item.description}</Text>
            {item.image && (
                <Image
                    source={item.image}
                    style={styles.image}
                />
            )}
			{item.button && (
				<CustomButton title={item.button} onPress={onContinue}>
					{item.button}
				</CustomButton>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	card: {
		padding: 20,
		margin: 10,
		elevation: 4,
        textAlign: "center",
		width: "100%",
		height: "100%",
	},
	title: {
		fontSize: 20,
		marginBottom: 10,
        color: "white",
		fontFamily: "DragonHunter",
		textAlign: "center",
		color: secondaryColor,
	},
	description: {
		fontSize: 16,
		color: "white",
	},
    image: {
        width: "100%",
        height: 200,
        resizeMode: "contain",
        marginVertical: 20,
    },
});

export default CarouselItem;
