// React
import React from "react";
// Redux
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import productsReducer from "./store/reducers/products";
// Navigation
import ShopNavigator from "./navigation/ShopNavigator";


// Initialize rootRed and Store
const rootReducer = combineReducers({
  products: productsReducer
})

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
