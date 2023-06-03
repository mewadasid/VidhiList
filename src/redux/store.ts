import {configureStore} from '@reduxjs/toolkit';
import listCreateSlice from './ducks/homeSlice';
export const store = configureStore({
  reducer: {
    list: listCreateSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
