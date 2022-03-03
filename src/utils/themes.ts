import {DefaultTheme} from '@react-navigation/native';
import {
  DefaultTheme as PaperDefaultTheme,
  Colors as PaperColors,
} from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      card: string;
      border: string;
    }
  }
}

export const Colors = {
  ...PaperColors,
  primary: '#FF746B',
};

/**
 * Light theme
 */
export const light: ReactNativePaper.Theme = {
  ...DefaultTheme,
  ...PaperDefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: Colors.primary,
  },
};
