// React
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
// Redux
import { useSelector } from "react-redux";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
    />
  );
}; 

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products"
}

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
