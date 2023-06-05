import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  ListBootom: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 10,
  },
  backColor: {
    backgroundColor: '#fff',
  },

  elevations: {
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOpacity: 0.25,
    shadowRadius: 5.62,
    borderRadius: 5,
    elevation: 10,
  },

  ListDisplay: {
    fontSize: 20,
    color: '#000000',
    margin: 10,
    fontWeight: '800',
  },
  ListStyle: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    borderRadius: 5,
    backgroundColor: '#F6BA6F',
    color: '#8785A2',
    padding: 10,
  },
  ListContainer: {
    marginLeft: 16,
    marginRight: 16,
  },
  ListAlignment: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    alignItems: 'center',
    fontSize: 20,
    height: 65,
    borderRadius: 5,
    shadowColor: '#79b4b7',
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 15,
    borderBottomWidth: 2,
  },
  AddListButton: {
    marginTop: 15,
    marginBottom: 15,
    width: 200,
    borderRadius: 50,
    paddingVertical: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    backgroundColor: '#F6BA6F',
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  AddListText: {
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#000',
  },
});
