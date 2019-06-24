import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EEE',
      paddingHorizontal: 5,
      paddingTop: 10,
    },
    headerDadosUsuarioIcon: {
      marginRight: 5
    },
    headerDadosUsuarioTitle: {
      fontWeight: 'bold',
      color: '#000',
      fontSize: 20,
      marginRight: 5,
    },
    headerDadosUsuarioText: {
      color: '#000',
      fontSize: 20,
    },
    headerDadosUsuario: {
    },
    headerDadosUsuarioRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
    },
    action: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      width: 100,
      height: 100,
      marginHorizontal: 10,
    },
    actionText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFF'
    },
    actionPessoas: {
      backgroundColor: '#008000',
    },
    actionVeiculos: {
      backgroundColor: '#AF1515',
    },
    actionRotas: {
      backgroundColor: '#2A5EB2',
    },
    loadingContainer: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: 'rgba(42, 94, 178,0.8)',
        borderRadius: 15,
        width:100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
      backgroundColor: "#bcbec1",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      width: 70,
      height: 70,
      borderRadius: 35,
      marginHorizontal: 5,
    },
    avatarText: {
      color: "#FFF",
      fontSize: 30,
      fontWeight: 'bold',
    }
  });