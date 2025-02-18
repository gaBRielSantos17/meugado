import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataProvider } from './src/contexts/userIdContext';
import LoginScreen from './src/screens/Authentication/LoginScreen';
import RegisterScreen from './src/screens/Authentication/RegisterScreen';
import MainDashboardScreen from './src/screens/MainDashboardScreen';
import PropertyRegistrationScreen from './src/screens/PropertyRegistrationScreen';
import AnimalRegistrationScreen from './src/screens/AnimalRegistrationScreen';
import AnimalMovementScreen from './src/screens/AnimalMovementScreen';
import HealthControlScreen from './src/screens/HealthControlScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import SRBIPAIntegrationScreen from './src/screens/ConsultaScreen';
import SupportScreen from './src/screens/SupportScreen';
import ForgotPasswordScreen from './src/screens/Authentication/ForgotPassword';
const Stack = createStackNavigator();

export default function App() {
  return (
    <DataProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Registro de Usuario" component={RegisterScreen} />
        <Stack.Screen name="Esqueci Senha" component={ForgotPasswordScreen} options={{headerShown:false}}/>       
        <Stack.Screen name="Menu Principal" component={MainDashboardScreen} />
        <Stack.Screen name="Cadastro de Propriedade" component={PropertyRegistrationScreen} />
        <Stack.Screen name="Cadastro de Animal" component={AnimalRegistrationScreen} />
        <Stack.Screen name="Movimentação de Animais" component={AnimalMovementScreen} />
        <Stack.Screen name="Controle Sanitário" component={HealthControlScreen} />
        <Stack.Screen name="Relatórios" component={ReportsScreen} />
        <Stack.Screen name="Consulta de Animais" component={SRBIPAIntegrationScreen} />
        <Stack.Screen name="Suporte e Ajuda" component={SupportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </DataProvider>
  );
}
