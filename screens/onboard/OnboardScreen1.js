import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

// Constants
import COLORS from "../../constants/Colors";

const OnboardScreen1 = (props) => {

  const buttonHandler = () => {
    props.navigation.navigate("Auth")
  }

  return (
    <View style={styles.screen}>
      <Text>This is the Onboard screen # 1</Text>
      <Button color={COLORS.primary} title="Next" onPress={buttonHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

OnboardScreen1.navigationOptions = (navData) => {
  return {
    tabBarVisible: false,      // removes bottom tab
  };
};

export default OnboardScreen1;
