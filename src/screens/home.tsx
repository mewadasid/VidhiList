/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Lists} from '../utils/cosntant';
import {styles} from '../css/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootDrawerParamList, RootStackParamList} from '../models/navigation';

export default function HomeScreen({
  navigation,
}: CompositeScreenProps<
  DrawerScreenProps<RootDrawerParamList>,
  NativeStackScreenProps<RootStackParamList>
>) {
  return (
    <View style={{marginTop: 5}}>
      <FlatList
        data={Lists}
        renderItem={listName => {
          return (
            <View>
              <View
                style={[
                  styles.backColor,
                  styles.elevations,
                  styles.ListBootom,
                  styles.ListStyle,
                ]}>
                <Text style={[styles.ListDisplay]}>{listName.item.name}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('openList', {
                      itemId: listName.item.id,
                      screenTitle: listName.item.name,
                    })
                  }>
                  <Icon style={styles.iconButton} name="eye" size={25} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
