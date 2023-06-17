/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../css/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CompositeNavigationProp} from '@react-navigation/native';
import {RootDrawerParamList, RootStackParamList} from '../models/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ItemData} from '../models/itemList';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useDispatch} from 'react-redux';
import {delelteList} from '../redux/ducks/homeSlice';
import {Animated, Easing} from 'react-native';

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
  const dispatch = useDispatch();

  let row: Array<any> = [];

  const removeList = (id: string) => {
    Alert.alert('Vidhi List', 'તમે યાદી કાઢી નાખવા માંગો છો', [
      {
        text: 'Yes',
        onPress: () => {
          dispatch(delelteList({id: id}));
        },
      },
      {
        text: 'No',
        onPress: () => null,
      },
    ]);
  };
  const renderRightActions = (id: string) => {
    return (
      <Animated.View
        style={[
          styles.elevations,
          styles.listBootom,
          styles.listStyle,
          {
            backgroundColor: '#ff0000',
          },
        ]}>
        <Icon
          style={{
            borderRadius: 5,

            color: '#ffffff',
            padding: 10,
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
          name="trash"
          size={25}
          onPress={() => removeList(id)}
        />
      </Animated.View>
    );
  };

  let prevRow: any;
  const closeRow = (index: number) => {
    if (prevRow && prevRow !== row[index]) {
      prevRow.close();
    }
    prevRow = row[index];
  };

  return (
    <FlatList
      data={data}
      inverted={true}
      keyExtractor={(item, index) => item.name + index}
      renderItem={listName => {
        return (
          <>
            {/* listName.item.version not becasuse by default verison object is stored so remove it */}
            {!listName.item.version && (
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
                {routeName === 'view' ? (
                  <>
                    <Swipeable
                      renderRightActions={() =>
                        renderRightActions(listName.item.listId)
                      }
                      overshootFriction={15}
                      onSwipeableOpen={() => closeRow(listName.index)}
                      ref={ref => (row[listName.index] = ref)}>
                      <View>
                        <Animated.View
                          style={[
                            styles.backColor,
                            styles.elevations,
                            styles.listBootom,
                            styles.listStyle,
                          ]}>
                          <Text style={[styles.listDisplay]}>
                            {listName.item.name}
                          </Text>

                          <Icon
                            style={styles.iconButton}
                            name="eye"
                            size={25}
                          />
                        </Animated.View>
                      </View>
                    </Swipeable>
                  </>
                ) : (
                  <View>
                    <View
                      style={[
                        styles.backColor,
                        styles.elevations,
                        styles.listBootom,
                        styles.listStyle,
                      ]}>
                      <Text style={[styles.listDisplay]}>
                        {listName.item.name}
                      </Text>

                      <Icon style={styles.iconButton} name="eye" size={25} />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            )}
          </>
        );
      }}
    />
  );
}
