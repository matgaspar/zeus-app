import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

import api from '../services/api';
import global, { VERSION } from '../global';
import logo from '../assets/icon/logo_mon.png';

export default class Login extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity style={styles.buttonHelp} onPress={() => {}}>
        <Icon name="question-circle" size={30} color="#FFF" />
      </TouchableOpacity>
    ),
  });

  state = {
    loadingVisible: false,
    id: '',
    empresa: '',
    nome: '',
    sobrenome: '',
    email: 'matheus@w7.co',
    password: 'senha123',
    token: '',
  };

  handleLogin = async () => {
    this.setState({ loadingVisible: true });
    try {
      const { email, password } = this.state;

      if (email && password) {
        const response = await api.post('/login', { email, senha: password });
        if (response.data.token) {
          const { id, empresa, nome, sobrenome, token } = response.data;

          this.setState(response.data);
          this.setState({ loadingVisible: false });

          await AsyncStorage.setItem('@zeus:token', token);
          await AsyncStorage.setItem('@zeus:id', id);
          await AsyncStorage.setItem('@zeus:empresa', empresa);
          await AsyncStorage.setItem('@zeus:nome', nome);
          await AsyncStorage.setItem('@zeus:sobrenome', sobrenome);
          await AsyncStorage.setItem('@zeus:email', email);

          this.props.navigation.navigate('SignedIn');
        } else {
          this.setState({ loadingVisible: false });
          Alert.alert('Alerta', 'Login ou senha inválidos!');
        }
      } else {
        this.setState({ loadingVisible: false });
        Alert.alert('Alerta', 'Campo E-mail ou Senha vazios!');
      }
    } catch (e) {
      this.setState({ loadingVisible: false });
      Alert.alert('Alerta', e);
      console.log(e);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TouchableOpacity style={styles.buttonHelp} onPress={() => {}}>
          <Icon name="question-circle" size={35} color="#444" />
        </TouchableOpacity>

        <Image source={logo} style={styles.logo} />

        <View style={styles.form}>
          <TextInput
            textContentType="emailAddress"
            autoCompleteType="email"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="E-mail"
            placeholderTextColor="#666666"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            style={styles.input}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Senha"
            placeholderTextColor="#666666"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            style={styles.input}
          />
          <TouchableOpacity
            disabled={this.state.loadingVisible}
            style={styles.button}
            onPress={this.handleLogin}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Text style={styles.footerVersion}>v{VERSION}</Text>
            <Text style={styles.footerCredits}>&copy; Web7 Online</Text>
          </View>
        </View>

        <Modal visible={this.state.loadingVisible} transparent={true} animationType={'fade'}>
          <View style={styles.loadingContainer}>
            <View style={styles.modalContainer}>
              <ActivityIndicator animating={true} size={50} color="#FFF" />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 5,
  },
  logo: {
    width: 300,
    height: 300,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  input: {
    borderRadius: 4,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    marginTop: 10,
    fontSize: 20,
  },
  button: {
    backgroundColor: '#235AB2',
    borderRadius: 25,
    height: 50,
    marginTop: 50,

    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFF',
  },
  buttonHelp: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingRight: 15,
    marginTop: 15,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgba(42, 94, 178,0.8)',
    borderRadius: 15,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: '#FFF',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerVersion: {},
  footerCredits: {
    fontWeight: 'bold',
    color: '#000',
  },
});
