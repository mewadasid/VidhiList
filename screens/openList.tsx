import React from 'react';
import {Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigations/navigate';

export default function OpenListScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, 'openList'>) {
  const {itemId} = route.params;
  console.log(itemId);
  return (
    <View>
      <Text>Open List</Text>
    </View>
  );
}
