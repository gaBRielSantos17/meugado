import { AUTH, DB } from '../constants/firebaseConsts';
import { ref, set, push } from 'firebase/database';
import { Alert } from 'react-native';

export const registerProperty = async (nome, numero, latitude, longitude, tamanho, licenca, navigation) => {
  if (!nome || !numero || !latitude || !longitude || !tamanho) {
    Alert.alert('Atenção', 'Todos os campos obrigatórios devem ser preenchidos.');
    return;
  }

  try {
    const user = AUTH.currentUser;
    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    const propertyRef = push(ref(DB, `properties/${user.uid}`));

    await set(propertyRef, {
      id: propertyRef.key,
      nome,
      numero,
      latitude,
      longitude,
      tamanho_m2: parseFloat(tamanho) * 10000, // Convertendo hectares para metros quadrados
      licenca,
    });

    Alert.alert('Sucesso', 'Propriedade cadastrada com sucesso!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  } catch (error) {
    Alert.alert('Erro', 'Ocorreu um erro ao salvar a propriedade.');
  }
};
