import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer, PersistConfig} from 'redux-persist';
import thunk from 'redux-thunk';
import listCreateSlice from './ducks/homeSlice';
import {ItemData} from '../models/itemList';

const persistConfig: PersistConfig<ItemData[]> = {
  key: 'vidhiList',
  storage: AsyncStorage,
};

const Reducer = persistReducer(persistConfig, listCreateSlice);
export const store = configureStore({
  reducer: {
    list: Reducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
