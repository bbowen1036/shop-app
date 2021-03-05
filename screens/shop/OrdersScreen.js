// React
import React from "react";
import { FlatList, Text, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
// Redux
import { useSelector } from "react-redux";
// Components
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders); // An array
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          items={itemData.item.items}
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();   // This Toggles the sidedrawer
          }}
        />
      </HeaderButtons>
    ),

  }
}

export default OrdersScreen;
