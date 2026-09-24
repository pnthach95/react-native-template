import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialIcons} from 'components/uniwind';
import {useTranslation} from 'react-i18next';
import FormScreen from 'screens/form';
import HomeScreen from 'screens/home';
import SettingsScreen from 'screens/settings';
import type {MainTabParamList, RootStackScreenProps} from 'typings/navigation';

const iconSize = 24;
const Tabs = createBottomTabNavigator<MainTabParamList>();

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
          tabBarIcon: ({color}) => (
            <MaterialIcons color={color} name="home" size={iconSize} />
          ),
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
          tabBarIcon: ({color}) => (
            <MaterialIcons color={color} name="edit-document" size={iconSize} />
          ),
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
          tabBarIcon: ({color}) => (
            <MaterialIcons color={color} name="person" size={iconSize} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default MainTab;
