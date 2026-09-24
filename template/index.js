/**
 * - https://github.com/facebook/hermes/issues/1462
 * - https://www.i18next.com/how-to/faq#why-are-my-plural-keys-not-working
 * Lý do cần `intl-pluralrules`
 * 🡫
 */
import 'intl-pluralrules';
import {AppRegistry, LogBox} from 'react-native';
import App from 'routes';
import {name as appName} from './app.json';

LogBox.ignoreLogs([
  'InteractionManager has been deprecated',
  'SafeAreaView has been deprecated',
]);

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('./ReactotronConfig');
}

AppRegistry.registerComponent(appName, () => App);
