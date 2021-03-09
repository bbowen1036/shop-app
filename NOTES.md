# Project init
- expo init {project name}
- git init
- npm install --save redux react-redux react-navigation react-navigation-header-buttons
- expo install react-native-gesture-handler react-native-reanimated
- npm install --save @expo/vector-icons

# File Structure
- Navigation: holds navigator files
- Screens: yes, screens are components but they will hold all sub components. Start with screens
- Components: all reusable custom components
- Constants: colors, styles

# initalize redux cycle
- reducer
- action 
- dummy data
- app js store and rootreducer instanciation 
- useSelector in components allows to tap into redux store
  - useSelector recieves the redux state where you can then tap into the slice you need at each component
   ``` const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );```

# Navigation
- npm install @react-navigation/native @react-navigation/stack
    - import { createStackNavigator } from '@react-navigation/stack';
    - first parameter is a screen object where screen identifiers are mapped to screen components
- Navigators are not exported. They are wrapped in createAppContainer


# Components
  ## images
- when working with a network image, need to set width and height because component cant see that in advance


# Cart
  In cart reducer the item key will be an object of nested CartItem Objects that are instanciated and mapped to their keys!

  ex: initialState = {
    items: {
      4: <CartItem .....>
    }
  }



# useReducer 
 to manage form state. Has nothing to do with redux
 helps with state management when we have connected or more complex state.
 it returns an array with 2 element: formState (a state snapshot), and a dispatch function