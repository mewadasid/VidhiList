/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootDrawerParamList, RootStackParamList} from '../models/navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Lists} from '../utils/cosntant';
import {View} from 'react-native';
import CustomFlatlist from '../components/flatList';

export default function HomeScreen({
  navigation,
}: CompositeScreenProps<
  DrawerScreenProps<RootDrawerParamList>,
  NativeStackScreenProps<RootStackParamList>
>) {
  return (
    <SafeAreaView>
      <View style={{marginTop: 5}}>
        <CustomFlatlist
          data={Lists}
          navigation={navigation}
          routeName="openList"
        />
      </View>
    </SafeAreaView>
  );
}
