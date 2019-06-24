import React, { Component } from 'react';

import global from './global';

import Routes, { createRootNavigator, SignedOutRoutes, SignedInRoutes } from './routes';

export default class App extends Component{
    state = {
        signed: false,
        signLoaded: false,
      };
    
      componentWillMount() {
        global.isLogged()
          .then(res => this.setState({ signed: res, signLoaded: true }))
          .catch(err => alert("Erro"));
      }
    
      render() {
        const { signLoaded, signed } = this.state;
    
        if (!signLoaded) {
          return null;
        }
        console.log(signLoaded);
        console.log(signed);
    
        const Layout = createRootNavigator(signed);
        return <Routes />;
      }
}
