import {AppRegistry, LogBox} from 'react-native';
import {name as appName} from './app.json';
import App from './src/routes';

LogBox.ignoreLogs(["Seems like you're using an old API"]);

AppRegistry.registerComponent(appName, () => App);
