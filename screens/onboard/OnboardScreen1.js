import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

// Constants
import COLORS from "../../constants/Colors";

const OnboardScreen1 = props => {
  return (
    <View style={styles.screen}>
      <Text>This is the Onboard screen # 1</Text>
      <Button color={COLORS.primary} title="Next"  />
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
    tabBarVisible: false
  }
}

export default OnboardScreen1