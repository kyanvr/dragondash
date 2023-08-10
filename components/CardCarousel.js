import * as React from "react";
import { Button, Dimensions, Image, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const CardCarousel = ({ data, handleContinue }) => {
	const width = Dimensions.get("window").width - 40;

	return (
		<View style={{ flex: 1 }}>
			<Carousel
            	mode="parallax"
				snapEnabled={true}
				width={width}
				height={width}
				autoPlay={false}
				data={data}
				scrollAnimationDuration={1000}
				renderItem={({ item, index }) => (
					<View
						style={{
							flex: 1,
							justifyContent: "center",
                            borderRadius: 10,
                            alignItems: "center",
						}}
					>
                        <Image source={item.image} style={styles.image} />
						<Text style={styles.text}>
							{index}
						</Text>
						<Button title="Continue" onPress={() => handleContinue(index)}>Continue</Button>
					</View>
				)}
			/>
		</View>
	);
}

const styles = {
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    text: {
        color: "white",
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
    },
};

export default CardCarousel;
