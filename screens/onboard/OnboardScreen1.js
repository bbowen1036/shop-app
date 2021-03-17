import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OnboardScreen1 = props => {
  return (
    <View style={styles.screen}>
      <Text>This is the Onboard screen # 1</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})

OnboardScreen1.navigationOptions = navData => {
  return {
    headerTitle: "Welcome!"
  }
}

export default OnboardScreen1