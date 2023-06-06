/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';
import {RootStackParamList} from '../models/navigation';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {ScrollView} from 'react-native';
import {DataTable} from 'react-native-paper';
import {styles} from '../css/style';

export default function ViewScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, 'view'>) {
  const {listId} = route.params;

  const myList = useSelector((state: RootState) =>
    state.list.find(singleList => singleList.listId === listId),
  );

  console.log('MYLIST', myList);
  return (
    <ScrollView>
      <DataTable style={styles.DataTableWrap}>
        <DataTable.Header>
          <DataTable.Title style={{justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              વસ્તુઓ
            </Text>
          </DataTable.Title>
          <DataTable.Title style={{justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              કેટલુ
            </Text>
          </DataTable.Title>
        </DataTable.Header>
        {myList &&
          Object.keys(myList.vidhi_things).map((item, index) => {
            return (
              <DataTable.Row key={index}>
                <DataTable.Cell style={{justifyContent: 'center', flex: 1}}>
                  <Text style={{fontSize: 17}}>{item}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{justifyContent: 'center', flex: 1}}>
                  <Text style={{fontSize: 17}}>
                    {myList.vidhi_things[item]}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
      </DataTable>
    </ScrollView>
  );
}
