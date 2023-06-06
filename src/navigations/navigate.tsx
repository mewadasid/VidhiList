import {createDrawerNavigator} from '@react-navigation/drawer';

import React from 'react';
import HomeScreen from '../screens/home';

import OpenListScreen from '../screens/openList';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootDrawerParamList, RootStackParamList} from '../models/navigation';
import {colors} from '../utils/color';
import ListShow from '../screens/yourList';
import ViewScreen from '../screens/view';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function NativeNavigate() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        headerShadowVisible: true,
        headerStyle: {backgroundColor: colors.primary},
      }}>
      <Stack.Screen
        name="Navigate"
        component={Navigate}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="openList"
        component={OpenListScreen}
        options={({route}) => ({
          title: route.params.screenTitle,
        })}
      />
      <Stack.Screen
        name="view"
        component={ViewScreen}
        options={({route}) => ({
          title: route.params.screenTitle,
        })}
      />
    </Stack.Navigator>
  );
}

function Navigate() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.primary},
        drawerLabelStyle: {fontSize: 16, margin: 10},
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Drawer.Screen
        name="yourList"
        component={ListShow}
        options={{title: 'Your List'}}
      />
    </Drawer.Navigator>
  );
}
