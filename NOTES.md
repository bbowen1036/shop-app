# Project init
- expo init {project name}
- git init
- npm install --save redux react-redux react-navigation react-navigation-header-buttons
- expo install react-native-gesture-handler react-native-reanimated

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

# Navigation
- npm install @react-navigation/native @react-navigation/stack
    - import { createStackNavigator } from '@react-navigation/stack';
    - first parameter is a screen object where screen identifiers are mapped to screen components
- Navigators are not exported. They are wrapped in createAppContainer


# Components
  ## images
- when working with a network image, need to set width and height because component cant see that in advance