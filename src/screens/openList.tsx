/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */

//React Native
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Controller, useForm, useFieldArray} from 'react-hook-form';

//Yup Validator
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {Lists} from '../utils/cosntant';

import {styles} from '../css/style';

//Model types
import {RootStackParamList} from '../models/navigation';
import {ItemData, values} from '../models/itemList';

import Icon from 'react-native-vector-icons/FontAwesome';

//Redux State
import {useDispatch} from 'react-redux';
import {addList} from '../redux/ducks/homeSlice';
import AddButton from '../components/addButton';
import {TouchableOpacity} from 'react-native';
import {Snackbar} from 'react-native-paper';

export default function OpenListScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'openList'>) {
  const dispatch = useDispatch();
  let {itemId, screenTitle} = route.params;
  const clone = JSON.parse(JSON.stringify(Lists));
  const filteredItem = clone.filter((data: ItemData) => data.id === itemId);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity activeOpacity={0.8}>
            <Icon
              name="undo"
              style={{color: '#8785A2'}}
              size={25}
              onPress={undoVidhi}
            />
          </TouchableOpacity>
        );
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let vidhiObj: values = {};
  useMemo(() => {
    const array = Object.values(filteredItem[0].vidhi_things);
    array.forEach((data: any) => {
      vidhiObj[data] = '';
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [vidhiThings, setVidhiThings] = useState(vidhiObj);
  const [undoValue, setUndoValue] = useState<values>({});
  const [visible, setVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  function validationObject() {
    let validObj: {
      [key: string]: yup.StringSchema<string, yup.AnyObject, undefined, ''>;
    } = {};

    Object.keys(vidhiThings).map((i: string) => {
      validObj[i] = yup.string().required('આ ક્ષેત્ર ભરવું આવશ્યક છે.');
    });
    return validObj;
  }

  const validationSchemaList = yup.object().shape(validationObject());
  const {control, handleSubmit} = useForm<ItemData>({
    mode: 'all',
    resolver: yupResolver(validationSchemaList),
  });

  const {replace} = useFieldArray({
    control,
    name: 'test',
  });

  const handleAddPress = (data: any) => {
    let dataObj: {[key: string]: any} = {};

    for (const key in data) {
      if (data[key] !== undefined) {
        if (key !== 'test') {
          dataObj.vidhi_things = {...dataObj.vidhi_things, [key]: data[key]};
        }
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
    navigation.navigate('navigate');
  };

  const undoRef: values = useRef();
  undoRef.current = {undoValue, vidhiThings};

  const undoVidhi = () => {
    if (Object.keys(undoRef.current.undoValue).length > 0) {
      setToastMessage('Item Recover');
      setVisible(true);
      const Obj = undoRef.current.undoValue;
      const refVidhiThing = undoRef.current.vidhiThings;

      const entries = Object.entries(Obj);

      const singleItem = entries[entries.length - 1];
      delete undoRef.current.undoValue[singleItem[0]];

      setUndoValue(undoRef.current.undoValue);
      setVidhiThings({...refVidhiThing, [singleItem[0]]: singleItem[1]});
    }
  };

  const removeItem = (itemName: string, val: number) => {
    setToastMessage('Item Removed');
    setVisible(true);
    replace((control._formValues[itemName] = undefined));
    const cloneObj = {...vidhiThings};

    delete cloneObj[itemName];
    setUndoValue({...undoValue, [itemName]: val});
    setVidhiThings(cloneObj);
  };

  const onDissmissBar = () => setVisible(false);

  const onValueChange = (vidhiItem: string, val: string) => {
    // setValue(vidhiItem, val);
    setVidhiThings({...vidhiThings, [vidhiItem]: val});
  };
  return (
    <>
      <View>
        <FlatList
          data={[vidhiThings]}
          renderItem={({item, index}) => (
            <View key={index} style={styles.listContainer}>
              {Object.keys(item).map((vidhiItem, vidhiIndex) => (
                <Controller
                  key={vidhiIndex}
                  control={control}
                  name={vidhiItem}
                  render={({
                    field: {onBlur, onChange},
                    fieldState: {error},
                  }) => (
                    <>
                      <View
                        style={[
                          styles.listAlignment,
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
                            value={
                              vidhiThings[vidhiItem] === ''
                                ? null
                                : vidhiThings[vidhiItem]
                            }
                            placeholder={vidhiItem}
                            onBlur={onBlur}
                            onChangeText={data => {
                              onChange(data);
                              onValueChange(vidhiItem, data);
                            }}
                          />
                        </View>
                        <View style={{width: '10%'}}>
                          <Icon
                            name="trash"
                            style={{color: 'rgb(113, 201, 206)'}}
                            size={25}
                            onPress={() =>
                              removeItem(vidhiItem, vidhiThings[vidhiItem])
                            }
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
            Object.keys(vidhiThings).length <= 0 ? null : (
              <AddButton
                press={handleSubmit(handleAddPress)}
                btnName="યાદી ઉમેરો"
              />
            )
          }
        />
      </View>
      <Snackbar
        style={{
          width: 200,
          alignSelf: 'center',
          borderWidth: 1,
          borderRadius: 30,
          borderColor: toastMessage === 'Item Removed' ? '#ff0000' : '#00ff00',
          backgroundColor: '#ffffff',
        }}
        duration={2000}
        visible={visible}
        onDismiss={onDissmissBar}>
        <View
          style={{
            justifyContent: 'center',
            gap: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon
            size={20}
            name={toastMessage === 'Item Removed' ? 'trash' : 'undo'}
          />
          <Text style={{textAlign: 'center', color: '#000000', fontSize: 15}}>
            {toastMessage}
          </Text>
        </View>
      </Snackbar>
    </>
  );
}
