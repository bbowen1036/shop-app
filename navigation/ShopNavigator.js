// React
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";
// Screens
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductsDetailScreen";
// STYLES
import COLORS from "../constants/Colors";

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ?  COLORS.primary : "",
      },
      headerTintColor: Platform.OS === "android" ?  "white" : COLORS.primary,
    },
  }
);

export default createAppContainer(ProductsNavigator)