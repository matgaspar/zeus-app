import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Geolocation from 'react-native-geolocation-service';
import DeviceInfo from 'react-native-device-info';

import api from '../services/api';
import global from '../global';

import { styles } from '../components/styles/style';

export default class Main extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        style={{ marginRight: 20, flexDirection: 'row' }}
        onPress={() => {
          const out = global.sair();
          if (out) navigation.navigate('SignedOut');
        }}
      >
        <Icon name="door-open" size={20} color="#FFF" />
        <Text style={{ fontSize: 18, color: '#FFF', marginLeft: 10 }}>Sair</Text>
      </TouchableOpacity>
    ),
  });

  watchId = null;

  state = {
    loadingVisible: false,
    coords: {},
    perfil: {},
    device: {
      id: null,
      brand: '',
      model: '',
    },
  };

  componentWillMount = async () => {
    //this.setState({ loadingVisible: true });
    this.carregarPerfil();
    this.getCoords();
    this.getDevice();
  };

  componentDidMount = () => {};

  componentDidUpdate = () => {};

  hasPermission = async PERMISSAO => {
    if (Platform.OS === 'ios' || (Platform.OS === 'android' && Platform.Version < 23)) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(PERMISSAO);

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(PERMISSAO);

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show('Permission denied by user.', ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show('Permission revoked by user.', ToastAndroid.LONG);
    }

    return false;
  };

  getDevice = () => {
    let [id, brand, model] = [
      DeviceInfo.getUniqueID(),
      DeviceInfo.getBrand(),
      DeviceInfo.getModel(),
    ];
    console.log(id);
    console.log(brand);
    console.log(model);
    this.setState({ device: { id, brand, model } });
  };

  getCoords = async () => {
    try {
      const permissao = await this.hasPermission(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (permissao) {
        this.watchId = Geolocation.watchPosition(
          position => this.setState(position),
          error => console.log(error.code, error.message),
          {
            enableHighAccuracy: true,
            distanceFilter: 0,
            interval: 5000,
            fastestInterval: 2000,
          },
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  carregarPerfil = async () => {
    const response = await api.get('/v2/perfil');
    if (response.data) {
      this.setState({
        //loadingVisible: false,
        perfil: response.data.pessoa.data,
      });
    }
  };

  sair = async () => {
    await global.sair();
    this.props.navigation.navigate('SignedOut');
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {
          // MENU ACTIONS
        }
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionPessoas, styles.action]}
            onPress={() => this.props.navigation.navigate('Pessoas')}
          >
            <Icon name="users" size={50} color="#FFF" />
            <Text style={styles.actionText}>Pessoas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionVeiculos, styles.action]}
            onPress={() => this.props.navigation.navigate('Veiculos')}
          >
            <Icon name="shuttle-van" size={50} color="#FFF" />
            <Text style={styles.actionText}>Veículos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionRotas, styles.action]}
            onPress={() => this.props.navigation.navigate('Rotas')}
          >
            <Icon name="map-marked-alt" size={50} color="#FFF" />
            <Text style={styles.actionText}>Rotas</Text>
          </TouchableOpacity>
        </View>

        <Card
          containerStyle={styles.card}
          title={
            this.state.perfil.nome &&
            this.state.perfil.nome.toUpperCase() + ' ' + this.state.perfil.sobrenome.toUpperCase()
          }
        >
          <View style={styles.cardContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {this.state.perfil.nome && this.state.perfil.nome.charAt(0)}
                {this.state.perfil.sobrenome && this.state.perfil.sobrenome.charAt(0)}
              </Text>
            </View>

            <View style={styles.headerDados}>
              <View style={styles.headerDadosRow}>
                <Icon name="envelope" size={25} color="#000" style={styles.headerDadosIcon} />
                <Text style={styles.headerDadosTitle}>E-mail:</Text>
                {this.state.perfil.email ? (
                  <Text style={styles.headerDadosText}>{this.state.perfil.email}</Text>
                ) : (
                  <ActivityIndicator animating={true} size={25} color="#666" />
                )}
              </View>

              <View style={styles.headerDadosRow}>
                <Icon name="id-card" size={25} color="#000" style={styles.headerDadosIcon} />
                <Text style={styles.headerDadosTitle}>CPF:</Text>
                {this.state.perfil.cpf ? (
                  <Text style={styles.headerDadosText}>
                    {'###.###.###-' + this.state.perfil.cpf.substr(-2, 2)}
                  </Text>
                ) : (
                  <ActivityIndicator animating={true} size={25} color="#666" />
                )}
              </View>

              <View style={styles.headerDadosRow}>
                <Icon name="user-cog" size={25} color="#000" style={styles.headerDadosIcon} />
                <Text style={styles.headerDadosTitle}>Perfil:</Text>
                {this.state.perfil.motorista ? (
                  <Text style={styles.headerDadosText}>Motorista</Text>
                ) : (
                  <ActivityIndicator animating={true} size={25} color="#666" />
                )}
              </View>

              <View style={styles.headerDadosRow}>
                <Icon name="mobile-alt" size={25} color="#000" style={styles.headerDadosIcon} />
                {this.state.device.model ? (
                  <Text style={styles.headerDadosText}>
                    {this.state.device.model + ' (' + this.state.device.brand + ')'}
                  </Text>
                ) : (
                  <ActivityIndicator animating={true} size={25} color="#666" />
                )}
              </View>
            </View>
          </View>
        </Card>

        <Card title="COORDENADAS" containerStyle={styles.card}>
          <View style={styles.cardCoords}>
            <View style={styles.cardCoordsItem}>
              {this.state.coords ? (
                <View style={styles.headerDadosRow}>
                  <Icon name="map-pin" size={25} color="#AF1515" style={styles.headerDadosIcon} />
                  <Text style={styles.headerDadosTitle}>Latitude:</Text>
                  {this.state.coords.latitude ? (
                    <Text style={styles.headerDadosText}>{this.state.coords.latitude}</Text>
                  ) : (
                    <ActivityIndicator animating={true} size={25} color="#666" />
                  )}
                </View>
              ) : (
                <Text>GPS without permission</Text>
              )}
            </View>
            <View style={styles.cardCoordsItem}>
              {this.state.coords ? (
                <View style={styles.headerDadosRow}>
                  <Icon name="map-pin" size={25} color="#AF1515" style={styles.headerDadosIcon} />
                  <Text style={styles.headerDadosTitle}>Longitude:</Text>
                  {this.state.coords.longitude ? (
                    <Text style={styles.headerDadosText}>{this.state.coords.longitude}</Text>
                  ) : (
                    <ActivityIndicator animating={true} size={25} color="#666" />
                  )}
                </View>
              ) : (
                <Text>GPS without permission</Text>
              )}
            </View>
          </View>
        </Card>

        <Modal visible={this.state.loadingVisible} transparent={true} animationType={'fade'}>
          <View style={styles.loadingContainer}>
            <View style={styles.modalContainer}>
              <ActivityIndicator animating={true} size={50} color="#FFF" />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}
