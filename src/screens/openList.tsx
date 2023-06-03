/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Lists} from '../utils/cosntant';
import {TextInput} from 'react-native';

import {FlatList} from 'react-native';
import {styles} from '../css/style';
import {RootStackParamList} from '../models/navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {addList} from '../redux/ducks/homeSlice';

export default function OpenListScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, 'openList'>) {
  const [List, setList] = useState({});
  const dispatch = useDispatch();
  let {itemId} = route.params;
  const filteredItem = Lists.filter(list => list.id === itemId);

  const handleChange = (e: object) => {
    setList({...List, ...e});
  };

  const handleAddPress = () => {
    dispatch(addList(List));
  };

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={filteredItem}
          renderItem={({item, index}) => (
            <View key={index} style={styles.ListContainer}>
              {Object.values(item.vidhi_things).map((vidhiItem, number) => (
                <View key={number} style={[styles.ListAlignment, styles.input]}>
                  <View
                    style={{
                      width: '30%',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        paddingLeft: 10,
                        color: '#000',
                      }}>
                      {vidhiItem} :
                    </Text>
                  </View>
                  <View style={{width: '70%'}}>
                    <TextInput
                      style={{
                        fontSize: 20,
                        color: '#000',
                      }}
                      placeholderTextColor="rgba(0,0,0,0.3)"
                      placeholder="Enter a value"
                      onChangeText={value => handleChange({[vidhiItem]: value})}
                    />
                  </View>
                </View>
              ))}
            </View>
          )}
          ListFooterComponent={
            <View
              style={{
                borderRadius: 50,
                overflow: 'hidden',
                alignSelf: 'center',
              }}>
              <Pressable
                onPress={handleAddPress}
                android_ripple={{
                  color: 'rgba(0,0,0,0.2)',
                }}
                style={styles.AddListButton}>
                <Text style={styles.AddListText}>યાદી ઉમેરો</Text>
              </Pressable>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
