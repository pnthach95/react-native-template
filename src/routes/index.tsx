/*
 * File: index.tsx
 * Project: shopping
 * Created Date: Tuesday, 15/02/2022, 1:31:54 pm
 * Author: Pham Ngoc Thach
 * -----
 * Last Modified: Thursday, 03/03/2022, 2:59:17 pm
 * Modified By: Pham Ngoc Thach (thachpn@honeynet.vn)
 * -----
 * Copyright © 2022 HONEYNET
 * ------------------------------------
 */

import {setRootViewBackgroundColor} from '@pnthach95/react-native-root-view-background';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import dayjs from 'dayjs';
import vi from 'dayjs/locale/vi';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {Provider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DashboardScreen from 'screens/dashboard';
import SignInScreen from 'screens/signin';
import SplashScreen from 'screens/splash';
import useStore, {useHydration} from 'store';
import {Colors, light} from 'utils/themes';
import type {RootStackParamList} from 'typings/navigation';

dayjs.locale(vi);
dayjs.extend(localizedFormat);

const RootStack = createStackNavigator<RootStackParamList>();

const onReady = () => BootSplash.hide({fade: true});

const App = () => {
  const hydrated = useHydration();
  const routeState = useStore(s => s.routeState);

  useEffect(() => {
    setRootViewBackgroundColor(Colors.white);
    changeNavigationBarColor(Colors.white, true, false);
  }, []);

  return (
    <SafeAreaProvider>
      <Provider theme={light}>
        <StatusBar
          translucent
          backgroundColor={Colors.transparent}
          barStyle="dark-content"
        />
        <NavigationContainer theme={light} onReady={onReady}>
          <RootStack.Navigator>
            {!hydrated || routeState === 'SPLASH' ? (
              <RootStack.Screen
                component={SplashScreen}
                name="Splash"
                options={{headerShown: false}}
              />
            ) : routeState === 'SIGN_IN' ? (
              <RootStack.Group>
                <RootStack.Screen
                  component={SignInScreen}
                  name="SignIn"
                  options={{headerShown: false}}
                />
              </RootStack.Group>
            ) : (
              <RootStack.Group>
                <RootStack.Screen component={DashboardScreen} name="Main" />
              </RootStack.Group>
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
