import 'react-native-gesture-handler';
import React from 'react';
import AppSecondary from './AppSecondary'
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <AppSecondary />
    </NavigationContainer>
  );
}
