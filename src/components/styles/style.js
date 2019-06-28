import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  headerDadosIcon: {
    marginRight: 5,
  },
  headerDadosTitle: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 20,
    marginRight: 5,
  },
  headerDadosText: {
    color: '#000',
    fontSize: 20,
  },
  headerDados: {},
  headerDadosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#FFF',
  },
  actionPessoas: {
    backgroundColor: '#213257',
  },
  actionVeiculos: {
    backgroundColor: '#AF1515',
  },
  actionRotas: {
    backgroundColor: '#F77C1E',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgba(33, 50, 87,0.8)',
    borderRadius: 15,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 15,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  avatar: {
    backgroundColor: '#F77C1E',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  avatarText: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginBottom: 5,
  },
  listItemAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  listItemButtonIcon: {
    paddingHorizontal: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  listItemContent: {
    flex: 1,
  },
  listItemContentTitle: {
    fontWeight: 'bold',
  },
  listItemContentDescription: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemContentDescriptionItem: {},
  listItemContentDescriptionProfile: {},
  listItemContentDescriptionNoProfile: {
    fontSize: 11,
  },
  listItemContentDescriptionProfileMotorista: {
    fontSize: 11,
    color: '#213257',
  },
  listItemContentDescriptionProfilePassageiro: {
    fontSize: 11,
    color: '#AF1515',
  },
  listItemContentDescriptionProfileInspetor: {
    fontSize: 11,
    color: '#F77C1E',
  },
});
