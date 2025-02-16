import {set,ref,onValue,get,child} from 'firebase/database'
import { DB } from '../constants/firebaseConsts';
import { Alert } from "react-native";
import { getPropertyUser } from './getPropertyUser';
import { getAnimalsId } from './getAnimalsId';

export const getMovimentAnimalsId = async (brinco) => {
  const dbRef = ref(DB);
  if(!brinco){
    Alert.alert("Atenção","Informe os dados corretamente")
    return;
  }
  try {
      const snapshot = await get(child(dbRef, `movimentacoes/`));
      if (snapshot.exists()) {
         console.log('-----------------------------------------')
          console.log("movimentações", Object.values(snapshot.val())[0].id);
          let arrayMoviments =  Object.values(snapshot.val())
          let animalsMovimentById = arrayMoviments.filter(g => g.brincoRFID === brinco)
          let idUserByMovimentAnimal = animalsMovimentById.map(u => {return u.userId})[0]
          let propertyByIdUser = await getAnimalsId(idUserByMovimentAnimal)
          let animalTarget = Object.values(propertyByIdUser).filter(a => a.brincoRFID === brinco)
          let healthAnimalsById = ""
          console.log(animalsMovimentById)
          if(animalsMovimentById.length > 0){
              const getControlHealthByBrinco =  await get(child(dbRef, `controlHealth/`));
              if(getControlHealthByBrinco.exists()){
                  let arrayHealth = Object.values(getControlHealthByBrinco.val())
                  console.log('-------------------')
                  arrayHealth.forEach(v => {  
                     healthAnimalsById = Object.values(v).filter(b => b.brincoRFID === brinco)
                  })                
              }

          }
          else {
            Alert.alert("Atenção","Esse brinco não esta cadastrado")
          }
          console.log("id user ",idUserByMovimentAnimal)
          console.log('-------------------')
          console.log("movimentação animais por id",animalsMovimentById)
          console.log('-------------------')
          console.log("animais vacinação por brinco : ",healthAnimalsById)
          console.log('-------------------')
          console.log("propriedades usuario :" , propertyByIdUser)
          console.log('-------------------')
          console.log("animal usuario",animalTarget)

          let struct_values = {
             idUser : idUserByMovimentAnimal,
             movimentAnimalById : animalsMovimentById,
             animalsNeedleByBrinco : healthAnimalsById,
             propertyByIdUser,
             animalTarget
          }
          console.log("------ struct values------------")
          console.log(struct_values)
          return struct_values
      } else {
        Alert.alert("Atenção","Essa base de dados não existe")
          return [];
      }
  } catch (error) {
      console.error(error);
      return [];
  }
};

