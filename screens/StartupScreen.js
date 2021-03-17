// React
import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
// Redux
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
// Constants
import COLORS from "../constants/Colors";


const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth")
        return
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate < new Date() || !token || !userId) {     // if token has expired.. ie if it is less than current time
        props.navigation.navigate("Auth")
        return
      } 

      const expirationTime = expirationDate.getTime() - new Date().getTime();  // expirationTime also needs to be CALCULATED and passed to authenticate here (when user reloads app)

      props.navigation.navigate("Shop");   // forward to shop screen
      dispatch(authActions.authenticate(userId, token, expirationTime)) // sign user in
    };

    tryLogin();
  }, [dispatch])
  
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default StartupScreen;