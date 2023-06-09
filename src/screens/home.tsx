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
        {/* <FlatList
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
                      navigation.push('openList', {
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
        /> */}
      </View>
    </SafeAreaView>
  );
}
