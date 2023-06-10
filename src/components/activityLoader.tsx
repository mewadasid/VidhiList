/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';

import {styles} from '../css/style';
import {ActivityIndicator} from 'react-native-paper';
import {Image} from 'react-native';

export default function ActivityLoader() {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Image
        style={styles.imageStyle}
        source={require('../assets/vidhiListLogo.png')}
      />
      <ActivityIndicator size={40} color="#71C9CE" />
    </View>
  );
}
