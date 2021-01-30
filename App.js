import 'react-native-gesture-handler';
import React from 'react';
import './firebase.config';
import AppSecondary from './AppSecondary'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

export default function App() {
  return (
    <Provider store={configureStore}>
      <NavigationContainer>
        <AppSecondary />
      </NavigationContainer>
    </Provider>
  );
}
