import React, { Component } from 'react';
import { View, Text } from 'react-native';

let containerCount = 0;

export default class CellContainer extends Component {
  constructor(args) {
    super(args);
    this._containerId = containerCount++;
  }

  render() {
    return (
      <View {...this.props}>
        {this.props.children}
        <Text>
          Cell Id:
          {this._containerId}
        </Text>
      </View>
    );
  }
}
