import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainDashboardScreen from './screens/MainDashboardScreen';
import PropertyRegistrationScreen from './screens/PropertyRegistrationScreen';
import AnimalRegistrationScreen from './screens/AnimalRegistrationScreen';
import AnimalMovementScreen from './screens/AnimalMovementScreen';
import HealthControlScreen from './screens/HealthControlScreen';
import ReportsScreen from './screens/ReportsScreen';
import SRBIPAIntegrationScreen from './screens/SRBIPAIntegrationScreen';
import SettingsScreen from './screens/SettingsScreen';
import SupportScreen from './screens/SupportScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro de Usuario" component={RegisterScreen} />
        <Stack.Screen name="Menu Principal" component={MainDashboardScreen} />
        <Stack.Screen name="Cadastro de Propriedade" component={PropertyRegistrationScreen} />
        <Stack.Screen name="Cadastro de Animal" component={AnimalRegistrationScreen} />
        <Stack.Screen name="Movimentação de Animais" component={AnimalMovementScreen} />
        <Stack.Screen name="Controle Sanitário" component={HealthControlScreen} />
        <Stack.Screen name="Relatórios" component={ReportsScreen} />
        <Stack.Screen name="Integração SRBIPA" component={SRBIPAIntegrationScreen} />
        <Stack.Screen name="Configurações" component={SettingsScreen} />
        <Stack.Screen name="Suporte e Ajuda" component={SupportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
