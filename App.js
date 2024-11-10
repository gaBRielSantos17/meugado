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
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainDashboard" component={MainDashboardScreen} />
        <Stack.Screen name="PropertyRegistration" component={PropertyRegistrationScreen} />
        <Stack.Screen name="AnimalRegistration" component={AnimalRegistrationScreen} />
        <Stack.Screen name="AnimalMovement" component={AnimalMovementScreen} />
        <Stack.Screen name="HealthControl" component={HealthControlScreen} />
        <Stack.Screen name="Reports" component={ReportsScreen} />
        <Stack.Screen name="SRBIPAIntegration" component={SRBIPAIntegrationScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
