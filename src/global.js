import AsyncStorage from '@react-native-community/async-storage';

export const VERSION = '1.0.0';

export const KEY_TOKEN = '@zeus:token';
export const KEY_ID = '@zeus:id';
export const KEY_EMPRESA = '@zeus:empresa';
export const KEY_NOME = '@zeus:nome';
export const KEY_SOBRENOME = '@zeus:sobrenome';
export const KEY_EMAIL = '@zeus:email';

export default {
  getToken: async () => {
    try {
      return await AsyncStorage.getItem(KEY_TOKEN);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  setToken: ({ token }) => {
    try {
      AsyncStorage.setItem(KEY_TOKEN, token);
    } catch (e) {
      console.log(e);
    }
  },
  isLogged: async () => {
    const token = await AsyncStorage.getItem(KEY_TOKEN);

    return token !== null;
  },
  sair: async () => {
    await AsyncStorage.clear();
    return true;
  },
};
