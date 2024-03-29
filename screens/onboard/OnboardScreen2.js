import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Text,
} from "react-native";

const OnboardScreen2 = (props) => {
  const buttonHandler = () => {
    console.log("clsa");
    props.navigation.navigate("Screen3");
  };

  const image = {
    uri:
      "https://oceanstar-seed.s3-us-west-1.amazonaws.com/Untitled+design.png",
  };

  return (
    <View style={styles.screen}>
      <ImageBackground source={image} style={styles.image} resizeMode="center">
        <TouchableOpacity onPress={buttonHandler} useForeground>
          <View style={styles.buttonContainer}>
            <Text>Click me</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffa5a7",
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
  },
});

OnboardScreen2.navigationOptions = (navData) => {
  return {
    tabBarVisible: false,
  };
};

export default OnboardScreen2;
