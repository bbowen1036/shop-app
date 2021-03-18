import React from "react";
import { View, Text, StyleSheet, Button, ImageBackground } from "react-native";

// Constants
import COLORS from "../../constants/Colors";

const OnboardScreen1 = (props) => {
  const buttonHandler = () => {
    props.navigation.navigate("Auth");
  };

  const image = {
    uri: "https://oceanstar-seed.s3-us-west-1.amazonaws.com/Onboard2.png",
  };

  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styles.buttonContainer}>
        <Button color={COLORS.primary} title="Next" onPress={buttonHandler} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {},
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

OnboardScreen1.navigationOptions = (navData) => {
  return {
    tabBarVisible: false,
  };
};

export default OnboardScreen1;
