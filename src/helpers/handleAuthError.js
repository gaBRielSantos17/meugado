import { Alert } from "react-native";
export const handleAuthError = (err) => {
  console.log(`Erro: ${err.message} Código: ${err.code}`);
  const errorMessages = {
    'auth/invalid-email': 'E-mail inválido, verifique espaços em branco ou caracteres inválidos.',
    'auth/invalid-credential': 'Credenciais Inválidas.',
    'auth/internal-error': 'Erro interno.',
    'auth/user-not-found': 'Usuário não encontrado!',
    'auth/wrong-password': 'Senha incorreta!',
    'auth/weak-password': 'Sua senha deve ter no mínimo 6 caracteres.',
    'auth/email-already-in-use': 'E-mail já existente.'
  };
  Alert.alert("Atenção", errorMessages[err.code] || "Erro desconhecido.");
};
