import '../global.css';
import 'locales';
import {setRootViewBackgroundColor} from '@pnthach95/react-native-root-view-background';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useReactNavigationDevTools} from '@rozenite/react-navigation-plugin';
import {useThemeColor} from 'heroui-native/hooks';
import {useEffect, useRef} from 'react';
import {StatusBar} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import GalleryScreen from 'screens/gallery';
import {useAppColorScheme} from 'stores';
import MainTab from './tabs';
import type {RootStackParamList} from 'typings/navigation';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  const navigationRef = useRef(null);
  useReactNavigationDevTools({ref: navigationRef});
  const appTheme = useAppColorScheme();
  const [background, border, card, primary, text] = useThemeColor([
    'background',
    'border',
    'surface',
    'accent',
    'foreground',
  ]);
  const theme: ReactNavigation.Theme = {
    dark: appTheme === 'dark',
    fonts: appTheme === 'dark' ? DarkTheme.fonts : DefaultTheme.fonts,
    colors: {
      background,
      border,
      card,
      notification:
        appTheme === 'dark'
          ? DarkTheme.colors.notification
          : DefaultTheme.colors.notification,
      primary,
      text,
    },
  };

  useEffect(() => {
    setRootViewBackgroundColor(background);
  }, [background]);

  const onReady = () => {
    BootSplash.hide({fade: true});
  };

  return (
    <NavigationContainer ref={navigationRef} theme={theme} onReady={onReady}>
      <StatusBar
        animated
        translucent
        backgroundColor="transparent"
        barStyle={appTheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <RootStack.Navigator
        screenOptions={{headerBackButtonDisplayMode: 'minimal'}}>
        <RootStack.Screen
          component={MainTab}
          name="Main"
          options={{headerShown: false}}
        />
        <RootStack.Screen
          component={GalleryScreen}
          name="Gallery"
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
