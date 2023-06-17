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
    delelteList: (state, action) => {
      const {id} = action.payload;
      const stateObj = [...Object.values(state)];
      const removedData = stateObj.filter(list => list.listId !== id);
      return removedData;
    },
  },
});

const {actions, reducer} = listCreateSlice;
export const {addList, delelteList} = actions;
export default reducer;
