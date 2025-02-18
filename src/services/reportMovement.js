import { DB, AUTH } from '../constants/firebaseConsts.js';
import { ref, get, child } from 'firebase/database';
import { Alert } from 'react-native';
import { getAnimalsId } from './getAnimalsId.js';

export const reportMovement = async (tipoMov, dataInicial, dataFinal) => {
    const movementRef = ref(DB);

    const user = AUTH.currentUser;
    if (!user) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
    }

    try {
        const snapshot = await get(child(movementRef, `movimentacoes/`));
        if (snapshot.exists()) {
            const dataInicialString = String(dataInicial);
            const dataFinalString = String(dataFinal);

            const dataInicialTimestamp = new Date(dataInicialString.split("/").reverse().join("-")).getTime();
            const dataFinalTimestamp = new Date(dataFinalString.split("/").reverse().join("-")).getTime();;

            let arrayMoviments = Object.values(snapshot.val());
            let propertyByIdUser = await getAnimalsId(user.uid)

            let datasMovimentos = arrayMoviments.filter(g => {
                const dataMovimentoTimestamp = new Date(g.dataMovimento.split("/").reverse().join("-")).getTime();
                return dataMovimentoTimestamp >= dataInicialTimestamp && dataMovimentoTimestamp <= dataFinalTimestamp && tipoMov === g.tipoEvento;
            });

            const resultado = datasMovimentos.map(mov => {
                const dados = propertyByIdUser.find(item => item.brincoRFID === mov.brincoRFID);
                return {...mov, ...dados};
              });
            
            console.log("Movimentações entre as datas:", resultado);
            return resultado ;
        } else {
            console.log("Nenhuma movimentação encontrada.");
            return [];
        }
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        Alert.alert('Erro', 'Falha ao gerar relatório.');
    }
};
