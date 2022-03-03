import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';

type MMKVType = {
  username: string;
  password: string;
};

const MMKV = new MMKVStorage.Loader()
  .withInstanceID('cvmH3aDd67t686Vv')
  .withEncryption()
  .initialize();

export const useStorage = <T extends keyof MMKVType>(
  key: T,
  defaultValue?: MMKVType[T],
) => {
  const s = useMMKVStorage<MMKVType[T]>(key, MMKV, defaultValue);
  return s;
};
