import type {NativeBottomTabScreenProps} from '@react-navigation/bottom-tabs/unstable';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  Gallery: {idx: number; images: string[]};
};

type MainTabParamList = {
  tab1: undefined;
  tab2: undefined;
  tab3: undefined;
};

type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    NativeBottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
