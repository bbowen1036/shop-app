import PRODUCTS from "../../data/dummy-data";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
} from "../actions/products";

import Product from "../../models/product";

const initialState = {
  availableProducts: [], // all products that we didnt create
  userProducts: [], // products that user  creates
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts,
      }
    case CREATE_PRODUCT:
      const { title, imageUrl, description, price, id, ownerId } = action.productData;
      const newProduct = new Product(
        id,
        ownerId,
        title,
        imageUrl,
        description,
        price
      );
      return {
        ...state,
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct],
      };
    case UPDATE_PRODUCT:
      // first find idx of product
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price,
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.pid);
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id !== action.pid
        ),
      };

    default:
      return state;
  }
};
