import type {StackScreenProps} from '@react-navigation/stack';

type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  Main: undefined;
};

type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
