import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image, TextInput, TouchableOpacity
} from 'react-native';

import api from '../services/api';

import send from '../assets/res/send.png';

export default class Login extends Component {  
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Image source={send} style={styles.send} />
    )
  });

  state = {
    email: '',
    senha: '',
    token: ''
  }

  handleLogin = async () => {
    const response = await api.post('/login', this.state);

    console.log(response);
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
            onChangeText={ senha => this.setState({ senha }) } 
            value={this.state.senha}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={ this.handleLogin }>
            <Text style={styles.buttonText}>Conectar</Text>
          </TouchableOpacity>
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
  send: {
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
    height: 42,
    marginTop: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});