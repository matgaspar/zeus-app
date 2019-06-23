import { createAppContainer, createStackNavigator } from 'react-navigation';

import Login from './pages/login';
import Main from './pages/main';

export default createAppContainer(
  createStackNavigator({
    Login,
    Main,
  }, {
    defaultNavigationOptions: {
      headerTitle: 'Zeus App',
      headerTintColor: '#000',
      headerBackTitle: null,
    },
    mode: 'modal',
  }),
);
