/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps, useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootDrawerParamList, RootStackParamList} from '../models/navigation';
import {Lists} from '../utils/cosntant';
import {Alert, BackHandler, View} from 'react-native';
import CustomFlatlist from '../components/flatList';

export default function HomeScreen({
  navigation,
}: CompositeScreenProps<
  DrawerScreenProps<RootDrawerParamList>,
  NativeStackScreenProps<RootStackParamList>
>) {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Vidhi List', 'Do You Want To Close App?', [
          {
            text: 'Yes',
            onPress: () => {
              BackHandler.exitApp;
            },
          },
          {
            text: 'No',
            onPress: () => null,
          },
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );
  return (
    <View style={{marginTop: 5}}>
      <CustomFlatlist
        data={Lists}
        navigation={navigation}
        routeName="openList"
      />
    </View>
  );
}
