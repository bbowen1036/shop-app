import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/order";
import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Check >> item exists in cart ? dont add : add
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // if this is Truthy then item is in cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + productPrice,
      };

    case REMOVE_FROM_CART: // 2 cases: item has  quantity of 1 so remove item entirely (so CartItem doesnt get rendered) || item has quantity >= 2 so we just reduce quantity by 1
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;

      if (currentQty > 1) {
        // need to reduce it not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        // need to erase it
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      const newTotal = state.totalAmount - selectedCartItem.productPrice
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: newTotal > 0 ? newTotal : 0,
      };

    case ADD_ORDER: 
      return initialState;

    default:
      return state;
  }
};
