import {createDrawerNavigator} from '@react-navigation/drawer';

import React from 'react';
import HomeScreen from '../screens/home';

import OpenListScreen from '../screens/openList';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
export type RootDrawerParamList = {
  Home: undefined;
};

export type RootStackParamList = {
  Navigate: undefined;
  openList: {itemId: string};
};
const Drawer = createDrawerNavigator<RootDrawerParamList>();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function NativeNavigate() {
  return (
    <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
      <Stack.Screen
        name="Navigate"
        component={Navigate}
        options={{headerShown: false}}
      />
      <Stack.Screen name="openList" component={OpenListScreen} />
    </Stack.Navigator>
  );
}

function Navigate() {
  return (
    <Drawer.Navigator
      screenOptions={{headerStyle: {backgroundColor: '#FFE2E2'}}}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
    </Drawer.Navigator>
  );
}
