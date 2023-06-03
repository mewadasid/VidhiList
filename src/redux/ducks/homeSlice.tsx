import {createSlice} from '@reduxjs/toolkit';
import {TransactionType} from '../../models/itemList';

const initialState: TransactionType = [];

const listCreateSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addList: (state, action) => {
      state.push(action.payload);
    },
  },
});

const {actions, reducer} = listCreateSlice;
export const {addList} = actions;
export default reducer;
