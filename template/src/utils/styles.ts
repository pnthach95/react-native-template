import {StyleSheet} from 'react-native';

const AppStyles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex1: {flex: 1},
  flex2: {flex: 2},
  flex3: {flex: 3},
  fullCenter: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  grow: {flexGrow: 1},
  growCenter: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  hideOverflow: {overflow: 'hidden'},
  itemCenter: {alignItems: 'center'},
  justifyCenter: {justifyContent: 'center'},
  justifyEnd: {justifyContent: 'flex-end'},
  noGrow: {flexGrow: 0},
  padding: {padding: 12},
  paddingHorizontal: {paddingHorizontal: 12},
  selfCenter: {alignSelf: 'center'},
});

export default AppStyles;
