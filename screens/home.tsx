import React from 'react';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Lists} from '../utils/cosntant';
import {styles} from '../css/style';

export default function HomeScreen({navigation}: any) {
  return (
    <View>
      <FlatList
        data={Lists}
        renderItem={listName => {
          return (
            <View
              onTouchEnd={() =>
                navigation.navigate('openList', {itemId: listName.item.id})
              }
              style={[styles.backColor, styles.elevations, styles.ListBootom]}>
              <Text style={[styles.ListDisplay]}>{listName.item.name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
