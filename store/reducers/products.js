import PRODUCTS from "../../data/dummy-data";

const initialState = {
  availableProducts: PRODUCTS,     // all products that we didnt create
  userProducts: PRODUCTS.filter(prod => prod.ownerId === "u1" )          // products that user  creates
};

export default (state =initialState, action) => {

  return state;
}