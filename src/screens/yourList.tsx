/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomFlatlist from '../components/flatList';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {RootDrawerParamList, RootStackParamList} from '../models/navigation';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';

export default function ListShow({
  navigation,
}: CompositeScreenProps<
  DrawerScreenProps<RootDrawerParamList>,
  NativeStackScreenProps<RootStackParamList>
>) {
  const listSlice = useSelector((state: RootState) =>
    Object.values(state.list),
  );

  return (
    
      <View style={{marginTop: 5}}>
        {listSlice.length > 1 ? (
          <CustomFlatlist
            data={listSlice}
            navigation={navigation}
            routeName="view"
          />
        ) : (
          <View
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '50%',
              marginTop: '50%',
            }}>
            <Text style={{fontSize: 20, color: 'rgba(0,0,0,0.5)'}}>
              કોઈપણ સૂચિ ઉમેરવામાં આવી નથી
            </Text>
          </View>
        )}
      </View>
    
  );
}
