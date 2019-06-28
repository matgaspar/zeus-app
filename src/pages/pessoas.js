import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { RecyclerListView } from 'recyclerlistview';

import api from '../services/api';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { styles } from '../components/styles/style';

export default class Pessoas extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Pessoas',
    headerRight: (
      <TouchableOpacity
        style={{ marginRight: 20, flexDirection: 'row' }}
        onPress={() => navigation.navigate('Main')}
      >
        <Icon name="sync-alt" size={20} color="#FFF" />
      </TouchableOpacity>
    ),
  });

  state = {
    loadingVisible: false,
    pagina_atual: 1,
    pagina_anterior: 0,
    pagina_proxima: 0,
    pagina_ultima: 0,
    limite: 50,
    total: 0,
    total_pagina: 20,
    total_paginas: 0,
    sucesso: false,
    data: [],
    error: null,
    filtro: null,
  };

  pessoasArray = [];

  componentDidMount = () => {
    this.listarPessoas();
  };

  componentWillUnmount = () => {
    alert('componenteWillUnmount');
  };

  listarPessoas = async (pagina = 1) => {
    this.setState({ loadingVisible: true });
    const params = {
      params: {
        pagina,
        limite: this.state.limite,
      },
    };
    await api
      .get('/v2/pessoas', params)
      .then(res => {
        if (res.data.sucesso) {
          const { data, ...pessoasInfo } = res.data;
          this.setState({
            loadingVisible: false,
            data: [...this.state.data, ...data],
            ...pessoasInfo,
          });
          console.log(pessoasInfo);
          this.pessoasArray = [...this.pessoasArray, ...data];
        } else {
          this.setState({ loadingVisible: false });
          alert(res.data.message);
        }
      })
      .catch(error => {
        this.setState({ error, loadingVisible: false });
      });
  };

  renderHeader = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#E0E7EE',
          }}
        >
          <TouchableOpacity>
            <Icon name="chevron-left" size={30} style={{ marginHorizontal: 10 }} />
          </TouchableOpacity>
          <SearchBar
            containerStyle={{ margin: 0, paddingHorizontal: 0, flex: 1, borderBottomWidth: 0 }}
            inputStyle={{ paddingVertical: 5 }}
            placeholder="Procurar..."
            lightTheme
            round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.filtro}
          />
          <TouchableOpacity>
            <Icon name="chevron-right" size={30} style={{ marginHorizontal: 10 }} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 3,
          }}
        >
          <Text>
            Exibindo {this.state.total_pagina} de {this.state.total} registros
          </Text>
          <Text>
            Página {this.state.pagina_atual} de {this.state.total_paginas}
          </Text>
        </View>
      </View>
    );
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Image
          style={styles.listItemAvatar}
          source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
        />
        <View style={styles.listItemContent}>
          <Text style={styles.listItemContentTitle}>
            {item.nome.toUpperCase()} {item.sobrenome.toUpperCase()}
          </Text>
          <View style={styles.listItemContentDescription}>
            <Text style={styles.listItemContentDescriptionItem}>
              {item.email && item.email.slice(0, 25) + '...'}
            </Text>
            <View style={styles.listItemContentDescriptionProfile}>
              {item.motorista ? (
                <Text style={styles.listItemContentDescriptionProfileMotorista}>MOTORISTA</Text>
              ) : item.inspetor ? (
                <Text style={styles.listItemContentDescriptionProfileInspetor}>INSPETOR</Text>
              ) : item.passageiro ? (
                <Text style={styles.listItemContentDescriptionProfilePassageiro}>PASSAGEIRO</Text>
              ) : (
                <Text style={styles.listItemContentDescriptionNoProfile}>NO PROFILE</Text>
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.listItemButtonIcon}>
          <Icon style={styles.listItemIcon} name="chevron-right" color="#999" size={25} />
        </TouchableOpacity>
      </View>
    );
  };

  loadMore = () => {
    const { pagina_atual, total_paginas } = this.state;

    if (pagina_atual === total_paginas) return;

    const pageNumber = pagina_atual + 1;

    this.setState({ loadingVisible: true });
    this.listarPessoas(pageNumber);
  };

  searchFilterFunction = text => {
    const newData = this.pessoasArray.filter(item => {
      const itemData = `${item.nome.toUpperCase()} ${item.sobrenome.toUpperCase()} ${item.email.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ data: newData });
  };

  render() {
    return (
      <>
        <View style={{ flex: 1 }}>
          {this.renderHeader()}
          <FlatList
            style={styles.list}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.2}
          />
        </View>

        <Modal visible={this.state.loadingVisible} transparent={true} animationType={'fade'}>
          <View style={styles.loadingContainer}>
            <View style={styles.modalContainer}>
              <ActivityIndicator animating={true} size={50} color="#FFF" />
            </View>
          </View>
        </Modal>
      </>
    );
  }
}
