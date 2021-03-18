import React from "react";
import { View, Text, StyleSheet, Button, ImageBackground,  } from "react-native";

// Constants
import COLORS from "../../constants/Colors";

const OnboardScreen1 = (props) => {
  const buttonHandler = () => {
    props.navigation.navigate("Auth");
  };

  const image = {
    uri: "https://oceanstar-seed.s3-us-west-1.amazonaws.com/Untitled+design.png",
  };

  return (
    <View style={styles.screen}>
      <ImageBackground source={image} style={styles.image} resizeMode="center">
        <View style={styles.buttonContainer}>
          <Button color={COLORS.primary} title="Next" onPress={buttonHandler} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffa5a7"
  },
  image: {
    height: "100%",
    width: "100%"
  },
});

OnboardScreen1.navigationOptions = (navData) => {
  return {
    tabBarVisible: false,
  };
};

export default OnboardScreen1;
