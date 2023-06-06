export type RootDrawerParamList = {
  Home: undefined;
  yourList: undefined | {itemId: string | number};
};

export type RootStackParamList = {
  Navigate: undefined;
  openList: {itemId: string | number; screenTitle: string};
  view: {listId: string | number; screenTitle: string};
};
