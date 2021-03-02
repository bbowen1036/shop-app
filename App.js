// React
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// Redux
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import productsReducer from "./store/reducers/products";


// Initialize rootRed and Store
const rootReducer = combineReducers({
  products: productsReducer
})

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <View>..</View>
    </Provider>
  );
}
