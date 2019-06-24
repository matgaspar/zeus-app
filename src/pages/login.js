import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image, TextInput, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

import api from '../services/api';

import global from '../global';

export default class Login extends Component {  
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Icon name='question-circle' size={30} style={styles.icon} />
    )
  });

  state = {
    id: '',
    empresa: '',
    nome: '',
    sobrenome: '',
    email: '',
    password: '',
    token: ''
  }

  handleLogin = async () => {
    try{
      const { email, password } = this.state;

      const response = await api.post('/login', { email, senha: password });
      if(response.data.token){

        const { id, empresa, nome, sobrenome, token } = response.data;

        this.setState(response.data);

        await AsyncStorage.setItem('@zeus:token', token);
        await AsyncStorage.setItem('@zeus:id', id);
        await AsyncStorage.setItem('@zeus:empresa', empresa);
        await AsyncStorage.setItem('@zeus:nome', nome);
        await AsyncStorage.setItem('@zeus:sobrenome', sobrenome);
        await AsyncStorage.setItem('@zeus:email', email);

        this.props.navigation.navigate('SignedIn');
      }
    }catch(e){
      console.log("ERROR!")
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <TextInput 
            textContentType='emailAddress'
            autoCompleteType='email'
            placeholder="E-mail"
            placeholderTextColor='#666666'
            onChangeText={ email => this.setState({ email }) } 
            value={this.state.email}
            style={styles.input}
          />
          <TextInput 
            secureTextEntry={true}
            placeholder="Senha"
            placeholderTextColor='#666666'
            onChangeText={ password => this.setState({ password }) } 
            value={this.state.password}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={ this.handleLogin }>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          { this.state.token !== '' && <Text>{this.state.token}</Text> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  icon: {
      marginRight: 10,
      marginTop: 10,
  },
  input: {    
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#235ab2',
    borderRadius: 4,
    height: 50,
    marginTop: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFF',
  },
});