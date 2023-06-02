/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Lists} from '../utils/cosntant';
import {TextInput} from 'react-native';

import {FlatList} from 'react-native';
import {styles} from '../css/style';
import {RootStackParamList} from '../models/navigation';

export default function OpenListScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, 'openList'>) {
  const [List, setList] = useState({});

  let {itemId} = route.params;
  const filteredItem = Lists.filter(list => list.id === itemId);

  const handleChange = (e: object) => {
    console.log(e);
  };

  return (
    <View>
      <FlatList
        data={filteredItem}
        renderItem={({item, index}) => (
          <View key={index} style={styles.ListContainer}>
            {Object.values(item.vidhi_things).map((vidhiItem, number) => (
              <View key={number} style={[styles.ListAlignment, styles.input]}>
                <View>
                  <Text style={{fontSize: 20, paddingLeft: 10}}>
                    {vidhiItem} :
                  </Text>
                </View>
                <View>
                  <TextInput
                    verticalAlign="middle"
                    style={{fontSize: 20}}
                    placeholder="Enter a value"
                    onChangeText={value => handleChange({[vidhiItem]: value})}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}
