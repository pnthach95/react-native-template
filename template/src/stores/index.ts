import dayjs from 'dayjs';
import i18n from 'locales';
import {create as produce} from 'mutative';
import {useEffect, useState} from 'react';
import {Appearance} from 'react-native';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {Uniwind} from 'uniwind';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import type {StoreEntry} from 'rozenite-zustand-devtools';
import type {StateStorage} from 'zustand/middleware';

const storage = new MMKVLoader()
  // TODO: đổi id tùy ý
  .withInstanceID('Zuuist97sbs')
  .withEncryption()
  .initialize();

const useAppStore = create<StoreState>()(
  persist(
    _ => ({
      appTheme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
      appLanguage: 'vi',
    }),
    {
      name: 'ProjectName',
      version: 1,
      storage: createJSONStorage(() => storage as unknown as StateStorage),
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => ![''].includes(key)),
        ),
    },
  ),
);

export const useAppColorScheme = () => useAppStore(s => s.appTheme);
export const useAppLanguage = () => useAppStore(s => s.appLanguage);

export const setAppLanguage = (appLanguage: TLanguage) => {
  useAppStore.setState({appLanguage});
  i18n.changeLanguage(appLanguage);
  dayjs.locale(appLanguage);
};

export const onSwitchTheme = () => {
  useAppStore.setState(
    produce<StoreState>(draft => {
      const newColor = draft.appTheme === 'dark' ? 'light' : 'dark';
      draft.appTheme = newColor;
      Uniwind.setTheme(newColor);
    }),
  );
};

export const useHydration = () => {
  const [hydrated, setHydrated] = useState(useAppStore.persist.hasHydrated);

  useEffect(() => {
    const unsubHydrate = useAppStore.persist.onHydrate(() =>
      setHydrated(false),
    );
    const unsubFinishHydration = useAppStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(useAppStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};

export const zustandStores: StoreEntry[] = [
  {name: 'myStore', store: useAppStore},
];
