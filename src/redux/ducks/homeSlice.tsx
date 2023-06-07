import {createSlice} from '@reduxjs/toolkit';
import {ItemData} from '../../models/itemList';

const initialState: ItemData[] = [];

const listCreateSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addList: (state, action) => {
      const stateObj = Object.values(state);
      stateObj.push(action.payload);
      return stateObj;
    },
  },
});

const {actions, reducer} = listCreateSlice;
export const {addList} = actions;
export default reducer;
