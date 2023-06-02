/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';

import NativeNavigate from './src/navigations/navigate';

function App() {
  return (
    <NavigationContainer>
      <NativeNavigate />
    </NavigationContainer>
  );
}

export default App;
