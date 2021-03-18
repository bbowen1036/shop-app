import React from "react";
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text } from "react-native";

// Constants
import COLORS from "../../constants/Colors";

const OnboardScreen1 = (props) => {
  const buttonHandler = () => {
    props.navigation.navigate("Screen2");
  };

  const image = {
    uri: "https://oceanstar-seed.s3-us-west-1.amazonaws.com/farm+to+table.png",
  };

  return (
    
    <ImageBackground source={image} style={styles.image}>
    <TouchableOpacity onPress={buttonHandler} useForeground>
      <View style={styles.screen}>
      <Text>Click me</Text>
      </View>
    </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1},
  image: {
    // flex: 1,
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
