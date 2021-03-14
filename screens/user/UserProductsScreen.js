import React from "react";
import { FlatList, Platform, Button, Alert, View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../store/actions/products";
// Components
import COLORS from "../../constants/Colors";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts); // an array
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", { productId: id });     // fowards id thru as a routing parameter
  };

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      { text: "Yes", style: "destructive", onPress: () => {
        dispatch(deleteProduct(id))
      } },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={styles.emptyScreen}>
        <Text>No products found. Maybe start creating some?</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id)
          }}
        >
          <Button color={COLORS.primary} title="Edit" onPress={() => {
            editProductHandler(itemData.item.id)
          }} />
          <Button color={COLORS.primary} title="Delete" onPress={deleteHandler.bind(this, itemData.item.id)} />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer(); // This Toggles the sidedrawer
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditProduct"); // This Toggles the sidedrawer
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  emptyScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})

export default UserProductsScreen;
