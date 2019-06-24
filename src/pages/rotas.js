import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import api from '../services/api';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { styles } from '../components/Style';

export default class Rotas extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Rotas',
        headerRight: (
            <TouchableOpacity style={{ marginRight: 20, flexDirection: 'row', }} onPress={() => { }}>
                <Icon name='sync-alt' size={20} color='#FFF' />
            </TouchableOpacity>
        )
    });

    render() {
        return (
            <View style={styles.container}>
                <Text>Rotas</Text>
            </View>
        );
    }
}
