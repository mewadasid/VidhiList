import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {styles} from '../css/style';

export default function ActivityLoader() {
  return (
    <View style={styles.Loader}>
      <ActivityIndicator size={50} animating={true} color="#71C9CE" />
    </View>
  );
}
