/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

type updateType = {
  id: number;
  value: string;
};
function Section({title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [text, addText] = useState('');
  const [update, setUpdate] = useState<updateType[]>([]);
  const setText = (data: string) => {
    addText(data);
  };

  const display = () => {
    setUpdate(c => [...c, {id: Math.ceil(Math.random() * 10), value: text}]);
  };

  const remove = (id: number) => {
    setUpdate(update.filter((data: any) => data.id !== id));
  };

  return (
    <View style={styles.sectionContainer}>
      <View>
        <Text>{title}</Text>
        <TextInput
          style={[styles.sectionTitle]}
          placeholder="Enter Text"
          onChangeText={setText}
        />
        <Button title="Add" onPress={display} />
      </View>
      <FlatList
        data={update}
        keyExtractor={(item: any) => item.id}
        renderItem={item => (
          <View style={styles.displayUpdate}>
            <Text onPress={() => remove(item.item.id)} style={{fontSize: 25}}>
              {item.item.value}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Section title="Enter Any Text" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  displayUpdate: {
    margin: 20,
    borderColor: '#F3BCC8',
    borderWidth: 2,
  },
});

export default App;
