/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {styles} from '../css/style';

type addButton = {
  press: () => void;
  btnName: string;
  btnLoading?: boolean | undefined;
};

export default function AddButton({press, btnName, btnLoading}: addButton) {
  return (
    <View>
      <Button
        buttonColor="#F6BA6F"
        loading={btnLoading === false ? true : false}
        contentStyle={styles.addListButton}
        style={[
          styles.addListButton,
          {
            marginBottom: 20,

            marginTop: 20,
            width: 200,
            marginLeft: 'auto',
            marginRight: 'auto',
          },
        ]}
        mode="contained"
        onPress={press}>
        <Text
          style={[styles.addListText, {lineHeight: 24, textAlign: 'center'}]}>
          {btnName}
        </Text>
      </Button>
    </View>
  );
}
