export type RootDrawerParamList = {
  home: undefined;
  yourList: undefined | {itemId: string | number};
};

export type RootStackParamList = {
  navigate: undefined;
  openList: {itemId: string | number; screenTitle: string};
  view: {listId: string | number; screenTitle: string};
};
