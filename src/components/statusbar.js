import React from 'react';
import { View, StatusBar } from 'react-native';

import styles from './styles/statusbarStyle';

export default (statusbar = ({ backgroundColor, ...props }) => (
  // <StatusBar
  //     backgroundColor='#000'
  //     animated={true}
  //     networkActivityIndicatorVisible={true}
  //     translucent
  // />
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar
      backgroundColor={backgroundColor}
      animated
      networkActivityIndicatorVisible
      translucent
      {...props}
    />
  </View>
));
