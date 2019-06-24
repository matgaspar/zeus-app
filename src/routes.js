import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import Login from './pages/login';
import Main from './pages/main';
import Pessoas from './pages/pessoas';
import Veiculos from './pages/veiculos';
import Rotas from './pages/rotas';

import global from './global';


export const SignedInRoutes = createStackNavigator({
    Main,
    Pessoas,
    Veiculos,
    Rotas,
}, {
        initialRouteName: 'Main',
        defaultNavigationOptions: {
            headerTitle: 'Controle de Transporte',
            headerTintColor: '#FFF',
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#2A5EB2'
            },
        },
        mode: 'modal',
    });

export const SignedOutRoutes = createStackNavigator({
    Login,
}, {
        initialRouteName: 'Login',
        defaultNavigationOptions: {
            headerTitle: 'Zeus App',
            headerTintColor: '#000',
            headerBackTitle: null,
        },
        mode: 'modal',
    });

export const createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator({
        SignedIn: { screen: SignedInRoutes },
        SignedOut: { screen: SignedOutRoutes }
    },
        {
            initialRouteName: signedIn ? "SignedIn" : "SignedOut",
            defaultNavigationOptions: {
                headerTitle: 'Zeus App',
                headerTintColor: '#000',
                headerBackTitle: null,
            },
            mode: "modal",
        });
};

export default createAppContainer(createRootNavigator());
