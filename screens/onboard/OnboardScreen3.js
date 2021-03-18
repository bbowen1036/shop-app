import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Text,
} from "react-native";

const OnboardScreen3 = (props) => {
  const buttonHandler = () => {
    console.log("clsa");
    props.navigation.navigate("Auth");
  };

  const image = {
    uri:
      "https://oceanstar-seed.s3-us-west-1.amazonaws.com/onboard3.png",
  };

  return (
    <View style={styles.screen}>
      <ImageBackground source={image} style={styles.image} resizeMode="center">
        <TouchableOpacity onPress={buttonHandler} useForeground>
          <View style={styles.buttonContainer}>
            <Text>YOU!!! </Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#8bcfb1",
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
  },
});

OnboardScreen3.navigationOptions = (navData) => {
  return {
    tabBarVisible: false,
  };
};

export default OnboardScreen3;
