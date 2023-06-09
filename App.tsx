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
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import ActivityLoader from './src/components/activityLoader';
import {Platform, StatusBar} from 'react-native';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityLoader />} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            {Platform.OS === 'ios' && (
              <StatusBar animated={true} barStyle={'dark-content'} />
            )}

            <NativeNavigate />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
