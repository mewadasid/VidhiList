import {ItemData} from './itemList';

export type RootDrawerParamList = {
  Home: undefined;
  yourList: undefined | {itemId: string | number};
  GeneratePDF: {myList: ItemData | undefined};
};

export type RootStackParamList = {
  Navigate: undefined;
  openList: {itemId: string | number; screenTitle: string};
  view: {listId: string | number; screenTitle: string};
};
