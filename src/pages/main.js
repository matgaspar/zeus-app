import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, ScrollView } from 'react-native';
import { Card, Button, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import api from '../services/api';
import global from '../global';

import { styles } from '../components/Style';

export default class Main extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity style={{ marginRight: 20, flexDirection: 'row', }} onPress={() => global.sair()}>
        <Icon name='door-open' size={20} color='#FFF' />
        <Text style={{ fontSize: 18, color: '#FFF', marginLeft: 10, }}>Sair</Text>
      </TouchableOpacity>
    )
  });

  state = {
    loadingVisible: false,
    perfil: {}
  }

  componentDidMount = () => {
    //this.setState({ loadingVisible: true });
    this.carregarPerfil();
  }

  carregarPerfil = async () => {
    const response = await api.get('/v2/perfil');
    if (response.data) {
      this.setState({
        //loadingVisible: false,
        perfil: response.data.pessoa.data
      });
    }
  }

  sair = () => {
    if(global.sair())
      this.props.navigation.navigate('Main');
  }

  render() {
    return (
      <ScrollView style={styles.container}>

        <Card
          title={this.state.perfil.nome && this.state.perfil.nome.toUpperCase() + ' ' + this.state.perfil.sobrenome.toUpperCase()}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF' }}>
            <View style={styles.avatar} >
              <Text style={styles.avatarText}>
                {this.state.perfil.nome && this.state.perfil.nome.charAt(0)}
                {this.state.perfil.sobrenome && this.state.perfil.sobrenome.charAt(0)}
              </Text>
            </View > 

            <View style={styles.headerDadosUsuario}>
              <View style={styles.headerDadosUsuarioRow}>
                <Icon name='envelope' size={25} color='#000' style={styles.headerDadosUsuarioIcon} />
                <Text style={styles.headerDadosUsuarioTitle}>E-mail: </Text>
                {this.state.perfil.email
                  ? <Text style={styles.headerDadosUsuarioText}>{this.state.perfil.email}</Text>
                  : <ActivityIndicator animating={true} size={25} color='#666' />
                }
              </View>

              <View style={styles.headerDadosUsuarioRow}>
                <Icon name='id-card' size={25} color='#000' style={styles.headerDadosUsuarioIcon} />
                <Text style={styles.headerDadosUsuarioTitle}>CPF: </Text>
                {this.state.perfil.cpf
                  ? <Text style={styles.headerDadosUsuarioText}>{this.state.perfil.cpf}</Text>
                  : <ActivityIndicator animating={true} size={25} color='#666' />
                }
              </View>

              <View style={styles.headerDadosUsuarioRow}>
                <Icon name='user-cog' size={25} color='#000' style={styles.headerDadosUsuarioIcon} />
                <Text style={styles.headerDadosUsuarioTitle}>Perfil: </Text>
                {this.state.perfil.motorista
                  ? <Text style={styles.headerDadosUsuarioText}>Motorista</Text>
                  : <ActivityIndicator animating={true} size={25} color='#666' />
                }
              </View>
            </View>
          </View>
        </Card>

        <View style={styles.actions}>
          <TouchableOpacity style={[styles.actionPessoas, styles.action]} onPress={() => this.props.navigation.navigate('Pessoas')}>
            <Icon name='users' size={50} color='#FFF' />
            <Text style={styles.actionText}>Pessoas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionVeiculos, styles.action]} onPress={() => this.props.navigation.navigate('Veiculos')}>
            <Icon name='shuttle-van' size={50} color='#FFF' />
            <Text style={styles.actionText}>Veículos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionRotas, styles.action]} onPress={() => this.props.navigation.navigate('Rotas')}>
            <Icon name='map-marked-alt' size={50} color='#FFF' />
            <Text style={styles.actionText}>Rotas</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={this.state.loadingVisible}
          transparent={true}
          animationType={'fade'}
        >
          <View style={styles.loadingContainer}>
            <View style={styles.modalContainer}>
              <ActivityIndicator animating={true} size={50} color='#FFF' />
            </View>
          </View>
        </Modal>
    </ScrollView>
    )
  }
}
