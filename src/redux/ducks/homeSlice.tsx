import {createSlice} from '@reduxjs/toolkit';
import {ItemData} from '../../models/itemList';

const initialState: ItemData[] = [];

const listCreateSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addList: (state, action) => {
      console.log(action.payload, 'ACTION');
      state.push(action.payload);
    },
  },
});

const {actions, reducer} = listCreateSlice;
export const {addList} = actions;
export default reducer;
