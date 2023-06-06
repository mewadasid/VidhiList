/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';

import NativeNavigate from './src/navigations/navigate';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <NativeNavigate />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;
