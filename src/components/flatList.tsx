import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../css/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CompositeNavigationProp} from '@react-navigation/native';
import {RootDrawerParamList, RootStackParamList} from '../models/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ItemData} from '../models/itemList';

type DataTypeProp = {
  data: ItemData[];
  navigation: CompositeNavigationProp<
    DrawerNavigationProp<
      RootDrawerParamList,
      keyof RootDrawerParamList,
      undefined
    >,
    NativeStackNavigationProp<
      RootStackParamList,
      keyof RootStackParamList,
      undefined
    >
  >;

  routeName: keyof RootStackParamList;
};

export default function CustomFlatlist({
  data,
  navigation,
  routeName,
}: DataTypeProp) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => item.name + index}
      renderItem={listName => {
        return (
          <>
            {!listName.item.version && (
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
                    onPress={() => {
                      if (routeName === 'openList') {
                        navigation.push(routeName, {
                          itemId: listName.item.id,
                          screenTitle: listName.item.name,
                        });
                      }
                      if (routeName === 'view') {
                        navigation.push(routeName, {
                          listId: listName.item.listId,
                          screenTitle: listName.item.name,
                        });
                      }
                    }}>
                    <Icon style={styles.iconButton} name="eye" size={25} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        );
      }}
    />
  );
}
