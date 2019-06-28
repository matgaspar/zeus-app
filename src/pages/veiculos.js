import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import api from '../services/api';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { styles } from '../components/styles/style';

export default class Veiculos extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Veículos',
    headerRight: (
      <TouchableOpacity style={{ marginRight: 20, flexDirection: 'row' }} onPress={() => {}}>
        <Icon name="sync-alt" size={20} color="#FFF" />
      </TouchableOpacity>
    ),
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>Veículos</Text>
      </View>
    );
  }
}
