// React
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font"

// Redux
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/order";
// Navigation
import ShopNavigator from "./navigation/ShopNavigator";


// Initialize rootRed and Store
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
})

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  })
}

export default function App() {
  const [ fontLoaded, setFontLoaded ] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => {
      setFontLoaded(true)
    }} onError={() => {}} />
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
