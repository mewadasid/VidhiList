import {createSlice} from '@reduxjs/toolkit';
import {Lists} from '../../utils/cosntant';

const VidhiList = [{}];

const listCreateSlice = createSlice({
  name: 'listCreate',
  initialState: VidhiList,
  reducers: {},
});
