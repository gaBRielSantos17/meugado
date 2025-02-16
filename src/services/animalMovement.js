import { DB, AUTH } from '../constants/firebaseConsts.js';
import { ref, get, set, push, child } from 'firebase/database';
import { Alert } from 'react-native';

export const animalMovement = async (tipoEvento, brincoRFID, dataMovimento) => {
    if (!tipoEvento || !brincoRFID || !dataMovimento) {
        Alert.alert('Atenção', 'Todos os campos são obrigatórios.');
        return;
    }

    const user = AUTH.currentUser;
    if (!user) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
    }

    try {
        const animaisRef = ref(DB, `animais/${user.uid}`);
        const snapshot = await get(animaisRef);

        if (!snapshot.exists()) {
            Alert.alert('Erro', 'Nenhum animal cadastrado para este usuário.');
            return;
        }

        const animais = snapshot.val();
        const animalEncontrado = Object.values(animais).find(animal => animal.brincoRFID === brincoRFID);

        console.log("Passou 4" + JSON.stringify(animais))

        if (!animalEncontrado) {
            Alert.alert('Erro', 'Brinco não encontrado.');
            return;
        }
        const dbRef = ref(DB)
        const movementRef = push(ref(DB, `movimentacoes`));
        const movements = await get(child(dbRef, `movimentacoes/`));
        const numbersOcorruenceDeadByBrico = Object.values(movements.val()).filter(b => b.brincoRFID === brincoRFID).filter(t => t.tipoEvento === "Abate").length

        if(numbersOcorruenceDeadByBrico >= 1){
            Alert.alert("Atenção","Esse animal foi abatido")
            return
        }
        await set(movementRef, {
            id: movementRef.key,
            userId: user.uid,
            brincoRFID,
            tipoEvento,
            dataMovimento,
        });
        Alert.alert('Sucesso', 'Movimentação registrada com sucesso!');
    } catch (error) {
        Alert.alert('Erro', 'Não foi possível registrar a movimentação. Tente novamente.');
        console.error("Erro ao adicionar movimentação:", error);
    }
};
export const getBrincos = async () => {
    try {
        const user = AUTH.currentUser;
        if (!user) {
            console.error("Usuário não autenticado");
            return [];
        }

        const animaisRef = ref(DB, `animais/${user.uid}`);
        const snapshot = await get(animaisRef);

        if (!snapshot.exists()) {
            console.log("Nenhum animal encontrado.");
            return [];
        }

        const animais = snapshot.val();
        const brincosRFID = Object.values(animais).map(animal => animal.brincoRFID);

        console.log("Lista de brincos:", brincosRFID);
        return brincosRFID;
    } catch (error) {
        console.error("Erro ao buscar brincos:", error);
        return [];
    }
};