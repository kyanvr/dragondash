import * as Font from "expo-font";

export default useFonts = async () => {
   await Font.loadAsync({
        "DragonHunter": require("../assets/fonts/DragonHunter.otf"),
    });
};