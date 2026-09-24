import 'dayjs/locale/vi';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import {HeroUINativeProvider} from 'heroui-native/provider';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import ErrorBoundary from 'react-native-error-boundary';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useZustandDevTools} from 'rozenite-zustand-devtools';
import ErrorBoundaryScreen from 'screens/errorboundary';
import {
  useAppColorScheme,
  useAppLanguage,
  useHydration,
  zustandStores,
} from 'stores';
import {Uniwind} from 'uniwind';
import {useControlWindowInsets} from 'utils';
import Routes from './routes';
import type {HeroUINativeConfig} from 'heroui-native/provider';

dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(customParseFormat);

const config: HeroUINativeConfig = {
  textProps: {
    // Disable font scaling for accessibility
    allowFontScaling: false,
    // Auto-adjust font size to fit container
    adjustsFontSizeToFit: false,
    // Maximum font size multiplier when scaling
    maxFontSizeMultiplier: 1,
    // Minimum font scale (iOS only, 0.01-1.0)
    minimumFontScale: 0.5,
  },
  devInfo: {stylingPrinciples: false},
};

const App = () => {
  useZustandDevTools(zustandStores);
  const {left} = useControlWindowInsets();
  const {i18n} = useTranslation(),
    hydrated = useHydration(),
    appLanguage = useAppLanguage(),
    appTheme = useAppColorScheme();

  useEffect(() => {
    Uniwind.setTheme(appTheme);
  }, [appTheme]);

  useEffect(() => {
    if (i18n.isInitialized && hydrated) {
      i18n.changeLanguage(appLanguage);
      dayjs.locale(appLanguage);
    }
  }, [i18n.isInitialized, hydrated]);

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <KeyboardProvider>
          <HeroUINativeProvider
            config={{...config, toast: {insets: {left: left + 12}}}}>
            <ErrorBoundary FallbackComponent={ErrorBoundaryScreen}>
              <Routes />
            </ErrorBoundary>
          </HeroUINativeProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
