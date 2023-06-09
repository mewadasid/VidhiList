/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, ToastAndroid, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';
import {Lists} from '../utils/cosntant';
import {TextInput} from 'react-native';

import {FlatList} from 'react-native';
import {styles} from '../css/style';
import {RootStackParamList} from '../models/navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {addList} from '../redux/ducks/homeSlice';
import {Controller, useForm} from 'react-hook-form';
import {ItemData} from '../models/itemList';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-paper';

export default function OpenListScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'openList'>) {
  const dispatch = useDispatch();
  let {itemId, screenTitle} = route.params;
  const clone = JSON.parse(JSON.stringify(Lists));

  const filteredItem = clone.filter((data: any) => data.id === itemId);
  const [list, setList] = useState<ItemData[]>(filteredItem);

  function validationObject() {
    let abc: {
      [key: string]: yup.StringSchema<string, yup.AnyObject, undefined, ''>;
    } = {};

    Object.values(list[0].vidhi_things).map((i: string) => {
      abc[i] = yup.string().required('આ ક્ષેત્ર ભરવું આવશ્યક છે.');
    });

    return abc;
  }

  const validationSchemaList = yup.object().shape(validationObject());
  const handleAddPress = (data: any) => {
    let dataObj: {[key: string]: any} = {};
    for (const key in data) {
      if (data[key] !== undefined) {
        dataObj.vidhi_things = {...dataObj.vidhi_things, [key]: data[key]};
      }
    }

    dataObj.listId = Date.now().toString();
    const date = new Date();
    dataObj.name =
      screenTitle +
      ' યાદી ' +
      date.toLocaleDateString() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes();

    dispatch(addList(dataObj));
    navigation.navigate('Navigate');
  };

  const {control, handleSubmit} = useForm<ItemData>({
    mode: 'all',
    resolver: yupResolver(validationSchemaList),
  });

  const removeItem = (itemName: string) => {
    ToastAndroid.show('Item removed', ToastAndroid.SHORT);
    const removed = Object.entries(list[0].vidhi_things).filter(
      item => !item.includes(itemName),
    );

    const removedObj = Object.fromEntries(removed);
    const wholedata = [...list];

    wholedata[0].vidhi_things = removedObj;

    setList(wholedata);
  };

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={list}
          renderItem={({item, index}) => (
            <View key={index} style={styles.ListContainer}>
              {Object.values(item.vidhi_things).map((vidhiItem, number) => (
                <Controller
                  key={number}
                  control={control}
                  name={vidhiItem}
                  render={({
                    field: {onBlur, onChange, value},
                    fieldState: {error},
                  }) => (
                    <>
                      <View
                        style={[
                          styles.ListAlignment,
                          styles.input,
                          {borderBottomColor: error ? '#ff0000' : '#8785A2'},
                        ]}>
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
                        <View style={{width: '60%'}}>
                          <TextInput
                            style={{
                              fontSize: 20,
                              color: '#000',
                            }}
                            placeholderTextColor="rgba(0,0,0,0.3)"
                            placeholder="Enter a value"
                            onBlur={onBlur}
                            value={value}
                            onChangeText={data => onChange(data)}
                          />
                        </View>
                        <View style={{width: '10%'}}>
                          <Icon
                            name="trash"
                            style={{color: 'rgb(113, 201, 206)'}}
                            size={25}
                            onPress={() => removeItem(vidhiItem)}
                          />
                        </View>
                      </View>
                      {error && (
                        <View
                          style={{
                            marginBottom: 5,
                          }}>
                          <Text style={{fontSize: 18, color: 'rgb(255,0,0)'}}>
                            {error?.message}
                          </Text>
                        </View>
                      )}
                    </>
                  )}
                />
              ))}
            </View>
          )}
          ListFooterComponent={
            <View>
              <Button
                buttonColor="#F6BA6F"
                contentStyle={styles.AddListButton}
                style={[
                  styles.AddListButton,
                  {
                    marginBottom: 20,
                    marginTop: 20,
                    width: 200,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  },
                ]}
                mode="contained"
                onPress={handleSubmit(handleAddPress)}>
                <Text
                  style={[
                    styles.AddListText,
                    {lineHeight: 24, textAlign: 'center'},
                  ]}>
                  યાદી ઉમેરો
                </Text>
              </Button>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
