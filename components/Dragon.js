import React from "react";
import { View, Image } from "react-native";
import PropTypes from "prop-types";

const Dragon = ({ userLevel }) => {
	// Calculate the evolution stage based on the user's level
	const evolutionStage = Math.floor((userLevel - 1) / 4) + 1;
    
	let dragonImage = null;
    switch (evolutionStage) {
		case 1:
			dragonImage = require("../assets/dragonStage1.png");
			break;
		case 2:
			dragonImage = require("../assets/dragonStage2.png");
			break;
		case 3:
			// normally there would be a image for stage 3
			// but I don't have one, so I'll use stage 2 instead
			dragonImage = require("../assets/dragonStage2.png");
			break;
		case 4:
			// normally there would be a image for stage 3
			// but I don't have one, so I'll use stage 2 instead
			dragonImage = require("../assets/dragonStage2.png");
			break;
		case 5:
			// normally there would be a image for stage 3
			// but I don't have one, so I'll use stage 2 instead
			dragonImage = require("../assets/dragonStage2.png");
			break;
		// and so on...
	}

	return (
		<View>
			<Image source={dragonImage} style={{ width: 200, height: 200 }} />
		</View>
	);
};

Dragon.propTypes = {
	userLevel: PropTypes.number.isRequired,
};

export default Dragon;
