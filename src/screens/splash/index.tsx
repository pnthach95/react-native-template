import logo from 'assets/images/logo.png';
import Space from 'components/space';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ActivityIndicator} from 'react-native-paper';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {setRouteState} from 'store';
import AppStyles from 'utils/styles';
import {Colors} from 'utils/themes';

const styles = StyleSheet.create({
  image: {
    height: responsiveScreenWidth(30),
    width: responsiveScreenWidth(30),
  },
});

const SplashScreen = () => {
  useEffect(() => {
    setRouteState('SIGN_IN');
  }, []);

  return (
    <View style={AppStyles.fullCenter}>
      <FastImage resizeMode="contain" source={logo} style={styles.image} />
      <Space height={30} />
      <ActivityIndicator color={Colors.primary} size="large" />
    </View>
  );
};

export default SplashScreen;
