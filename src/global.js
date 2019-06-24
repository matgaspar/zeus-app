import AsyncStorage from '@react-native-community/async-storage';

export const keyToken = '@zeus:token';
export const keyId = '@zeus:id';
export const keyEmpresa = '@zeus:empresa';
export const keyNome = '@zeus:nome';
export const keySobrenome = '@zeus:sobrenome';
export const keyEmail = '@zeus:email';

export default {
    getToken: async () => {
        try {
            return await AsyncStorage.getItem(keyToken);
        } catch (e) {
            console.log(e);
        }
    },
    setToken: async ({ token }) => {
        try {
            return await AsyncStorage.setItem(keyToken, token);
        } catch (e) {
            console.log(e);
        }
    },
    isLogged: async () => {
        const token = await AsyncStorage.getItem(keyToken);

        return (token !== null) ? true : false;
    },
    sair: () => {
        AsyncStorage.removeItem(keyToken);
        AsyncStorage.removeItem(keyId);
        AsyncStorage.removeItem(keyEmpresa);
        AsyncStorage.removeItem(keyNome);
        AsyncStorage.removeItem(keySobrenome);
        AsyncStorage.removeItem(keyEmail);
        console.log('Deslogado!')
        return true;
    }
};
