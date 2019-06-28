import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';

import global from '../global';

export default class AuthLoadingScreen extends React.Component {
  componentWillMount = () => {
    this._bootstrapAsync();
  };

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userLogged = await global.isLogged();

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userLogged ? 'SignedIn' : 'SignedOut');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          alignItems: 'center',
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
      >
        <ActivityIndicator animating={true} size={80} color="#235AB2" />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}
