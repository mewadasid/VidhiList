/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Alert, PermissionsAndroid, Text, View} from 'react-native';
import {RootDrawerParamList, RootStackParamList} from '../models/navigation';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {ScrollView} from 'react-native';
import {Button, DataTable} from 'react-native-paper';
import {styles} from '../css/style';
import {vidhiThingsUseAll} from '../utils/cosntant';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import ActivityLoader from '../components/activityLoader';
// Import RNFetchBlob for the file download

import RNFetchBlob from 'rn-fetch-blob';

export default function ViewScreen({
  route,
}: CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, 'view'>,
  DrawerScreenProps<RootDrawerParamList>
>) {
  const {listId, screenTitle} = route.params;

  const [pdfpath, setPDFPath] = useState('');
  const myList = useSelector((state: RootState) =>
    Object.values(state.list).find(singleList => singleList.listId === listId),
  );

  const html = `
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF VIDHILISt</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;1,800&family=Poppins&display=swap');

        * {
            margin: 0;
            box-sizing: border-box;
            font-family: 'Open Sans', sans-serif;
        }

        .table-wrapper {
          width: 1140px;
            margin: 0 auto;
        }
        
        table {
            border-collapse: collapse;
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
            margin: auto;
            width: calc(100%/2);
            
            position: relative;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            top: 20px;
        }

        .header th {
            background-color: #A6E3E9;
            line-height: 2.5;
            text-align: center;
            font-size: 28px;
        }

        .data tr {
            height: 50px;
            text-align: center;
            font-size: 28px;
            line-height: 1.2;
            /* background-color: rgba(0, 0, 0, 0.24); */
        }

        tbody tr:nth-child(even) {
            background-color: #f5f5f5;
        }

        .single-row {
            position: relative;
            top: 0;
            left: 0;
        }

        .commonTable {
            width: 30%;
            height:350px;
            position: relative;
            top: 30px;
            line-height: 2.5;
            text-align: center
        }
        .commonTable tbody tr td{
          font-size:28px;
        }
        
    </style>
</head>
<div class="container">
    <div class="table-wrapper">
        <div class="table-main">
            <table>
                <thead class="header">
                    <tr>
                        <th>વસ્તુઓ</th>
                        <th> કેટલુ</th>
                    </tr>
                </thead>
                <tbody class="data">
                ${
                  myList &&
                  Object.keys(myList.vidhi_things).map(
                    key =>
                      `<tr>
                  <td>${key}</td>
                  <td>${myList.vidhi_things[key]}</td>
                  </tr>`,
                  )
                }
                </tbody>
              <div>
                <table class="commonTable">
                    <tbody class="single-row">
                    ${Object.values(vidhiThingsUseAll).map(
                      things =>
                        `<tr>
                      <td>${things}</td>
                     
                      </tr>`,
                    )}
                    </tbody>
                </table>
              </div>
            </table>
        </div>
    </div>
</div>

</body>

</html>`;

  const GeneratePDF = async () => {
    let options = {
      html: html,
      filename: 'test',
      directory: 'Documents',
      height: 700,
      width: 600,
    };

    const file = await RNHTMLtoPDF.convert(options);

    if (!file || !file.filePath) {
      return <ActivityLoader />;
    } else {
      setPDFPath(file.filePath);
      const sp = file.filePath.split('/');
      saveFile(sp[9], file.filePath);
    }
  };

  const saveFile = async (filename: string, path: string) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message:
            'Vidhi List App needs access to your storage ' +
            'so you can store PDF.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission granted');
        let name = screenTitle.split(' ', 1);
        console.log(name);
        let str = name.join('');
        console.log(str);
        const fs = RNFetchBlob.fs;

        const dirs = RNFetchBlob.fs.dirs;
        console.log(filename);
        const date = new Date();
        const NEW_FILE_PATH =
          `${dirs.DownloadDir}/` +
          date.getDate() +
          '-' +
          date.getMonth() +
          '-' +
          date.getFullYear() +
          ' ' +
          str +
          '.pdf';
        console.log('NEW_FILE_PATH', NEW_FILE_PATH);
        const PATH_TO_ANOTHER_FILE = path;

        fs.createFile(NEW_FILE_PATH, PATH_TO_ANOTHER_FILE, 'uri');

        Alert.alert('PDF generated', 'Go to' + NEW_FILE_PATH);
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <ScrollView>
      <DataTable style={styles.DataTableWrap}>
        <DataTable.Header>
          <DataTable.Title style={{justifyContent: 'center'}}>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'rgba(0,0,0,0.8)',
                }}>
                વસ્તુઓ
              </Text>
            </View>
          </DataTable.Title>
          <DataTable.Title style={{justifyContent: 'center'}}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'rgba(0,0,0,0.8)',
                }}>
                કેટલુ
              </Text>
            </View>
          </DataTable.Title>
        </DataTable.Header>
        {myList &&
          Object.keys(myList.vidhi_things).map((item, index) => {
            return (
              <DataTable.Row key={index}>
                <DataTable.Cell style={{justifyContent: 'center', flex: 1}}>
                  <Text style={{fontSize: 17, color: '#5C5C5C'}}>{item}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{justifyContent: 'center', flex: 1}}>
                  <Text style={{fontSize: 17, color: '#5C5C5C'}}>
                    {myList.vidhi_things[item]}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}

        {Object.values(vidhiThingsUseAll).map(things => {
          return (
            <DataTable.Row>
              <DataTable.Cell style={{justifyContent: 'center', flex: 1}}>
                <Text style={{fontSize: 17, color: '#5C5C5C'}}>{things}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
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
          onPress={GeneratePDF}>
          <Text
            style={[styles.AddListText, {lineHeight: 24, textAlign: 'center'}]}>
            Generate PDF
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
}
