// React
import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, FlatList, Platform, Button, ActivityIndicator, View , Text} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
// Redux
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
// Components
import COLORS from "../../constants/Colors";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";

const ProductsOverviewScreen = (props) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState()
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();


  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(productActions.fetchProducts())
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false)
  }, [dispatch, setIsLoading, setError]);

  // Navigation listener
  useEffect(() => { 
    const willFocusSub = props.navigation.addListener("didFocus", loadProducts);

    return () => {
      willFocusSub.remove();
    }
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try Again" onPress={loadProducts} color={COLORS.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    // To enhance user experience by fowarding them to another screen when no products are loaded
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          title={itemData.item.title}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={COLORS.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={COLORS.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart")
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ProductsOverviewScreen;
