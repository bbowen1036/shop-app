// React
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator } from "react-native";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/order";
// Styles & Components
import COLORS from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";

const CartScreen = (props) => {
  const [ isLoading, setIsLoading ] = useState(false);

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a,b) => a.productId > b.productId ? 1 : -1);
  });

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(addOrder(cartItems, cartTotalAmount));
    setIsLoading(false)
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <Button
            color={COLORS.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deleteable
            onRemove={() => {
              dispatch(removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart"
}


const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: COLORS.primary,
  },
});

export default CartScreen;
