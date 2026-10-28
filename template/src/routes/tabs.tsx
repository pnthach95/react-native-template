import MaterialIcons from '@react-native-vector-icons/material-icons';
import {createNativeBottomTabNavigator} from '@react-navigation/bottom-tabs/unstable';
import {useTranslation} from 'react-i18next';
import FormScreen from 'screens/form';
import HomeScreen from 'screens/home';
import SettingsScreen from 'screens/settings';
import type {MainTabParamList, RootStackScreenProps} from 'typings/navigation';

const iconSize = 24;
const tab1Icon = MaterialIcons.getImageSourceSync('home', {size: iconSize});
const tab2Icon = MaterialIcons.getImageSourceSync('edit-document', {
  size: iconSize,
});
const tab3Icon = MaterialIcons.getImageSourceSync('person', {size: iconSize});
const Tabs = createNativeBottomTabNavigator<MainTabParamList>();

const MainTab = ({navigation}: RootStackScreenProps<'Main'>) => {
  const {t} = useTranslation();

  return (
    <Tabs.Navigator>
      <Tabs.Screen
        component={HomeScreen}
        listeners={{
          focus: () => {
            navigation.setOptions({title: t('tabs.tab1')});
          },
        }}
        name="tab1"
        options={{
          title: t('tabs.tab1'),
          tabBarIcon: {type: 'image', source: tab1Icon},
        }}
      />
      <Tabs.Screen
        component={FormScreen}
        listeners={{
          focus: () => {
            navigation.setOptions({title: t('tabs.tab2')});
          },
        }}
        name="tab2"
        options={{
          title: t('tabs.tab2'),
          tabBarIcon: {type: 'image', source: tab2Icon},
        }}
      />
      <Tabs.Screen
        component={SettingsScreen}
        listeners={{
          focus: () => {
            navigation.setOptions({title: t('tabs.tab3')});
          },
        }}
        name="tab3"
        options={{
          title: t('tabs.tab3'),
          tabBarIcon: {type: 'image', source: tab3Icon},
        }}
      />
    </Tabs.Navigator>
  );
};

export default MainTab;
