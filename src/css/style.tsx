import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  ListBootom: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 10,
    // borderBottomColor: '#8785A2',
    // borderBottomWidth: 1,
  },
  backColor: {
    backgroundColor: 'white',
  },

  elevations: {
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOpacity: 0.25,
    shadowRadius: 5.62,
    borderRadius: 10,
    elevation: 10,
  },

  ListDisplay: {
    fontSize: 20,
    color: '#000000',
    margin: 10,
    lineHeight: 35,
  },
  ListStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    borderRadius: 10,
    backgroundColor: '#F6BA6F',
    color: '#8785A2',
    padding: 20,
  },
  ListContainer: {
    maxWidth: 250,
    margin: 10,
  },
  ListAlignment: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    alignItems: 'center',
    fontSize: 20,
    height: 50,
    width: 350,
    margin: 12,
    borderWidth: 1,
    borderColor: '#8785A2',
    borderRadius: 5,
  },
});
