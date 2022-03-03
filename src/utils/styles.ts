import {Platform, StyleSheet} from 'react-native';
import {Colors} from './themes';

const AppStyles = StyleSheet.create({
  borderRadius: {
    borderRadius: 10,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  elevation: {
    elevation: 5,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  fullCenter: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  growCenter: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  itemCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  margin: {
    margin: 20,
  },
  marginHorizontal: {
    marginHorizontal: 20,
  },
  marginVertical: {
    marginVertical: 10,
  },
  padding: {
    padding: 20,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
  },
  textBlack: {
    color: Colors.black,
  },
  textCenter: {
    textAlign: 'center',
  },
  textGreen: {
    color: Colors.green400,
  },
  textInput: {
    backgroundColor: Colors.transparent,
    ...Platform.select({
      ios: {
        marginVertical: 5,
      },
    }),
  },
  textPrimary: {
    color: Colors.primary,
  },
  textRight: {
    textAlign: 'right',
  },
  textWhite: {
    color: Colors.white,
  },
});

export default AppStyles;
