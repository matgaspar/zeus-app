import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from './pages/authLoadingScreen';
import Login from './pages/login';
import Main from './pages/main';
import Pessoas from './pages/pessoas';
import PessoasTest from './pages/pessoasTest';
import Pessoa from './pages/pessoa';
import Veiculos from './pages/veiculos';
import Rotas from './pages/rotas';

const SignedInScreens = createStackNavigator(
  {
    Main,
    Pessoas,
    PessoasTest,
    Pessoa,
    Veiculos,
    Rotas,
  },
  {
    initialRouteName: 'Pessoas',
    defaultNavigationOptions: {
      headerTitle: 'ZEUS',
      headerTintColor: '#FFF',
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: '#213257',
      },
    },
    mode: 'modal',
  },
);

const SignedOutScreens = createSwitchNavigator({ Login }, { mode: 'modal' });

export default createAppContainer(
  createSwitchNavigator(
    { AuthLoading: AuthLoadingScreen, SignedIn: SignedInScreens, SignedOut: SignedOutScreens },
    { initialRouteName: 'AuthLoading' },
  ),
);
