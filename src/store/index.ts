import {useEffect, useState} from 'react';
import MMKVStorage from 'react-native-mmkv-storage';
import create from 'zustand';
import {persist} from 'zustand/middleware';
import type {SetState, GetState, Mutate, StoreApi} from 'zustand';
import type {StateStorage} from 'zustand/middleware';

const storage = new MMKVStorage.Loader()
  .withInstanceID('67t686VvcvmH3aDd')
  .withEncryption()
  .initialize();

const useStore = create(
  persist<
    StoreState,
    SetState<StoreState>,
    GetState<StoreState>,
    Mutate<StoreApi<StoreState>, [['zustand/persist', Partial<StoreState>]]>
  >(
    () => ({
      routeState: 'SPLASH',
    }),
    {
      name: 'template',
      version: 1,
      getStorage: () => storage as StateStorage,
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !['routeState'].includes(key),
          ),
        ),
    },
  ),
);

export const setRouteState = (route: TRouteStates) =>
  useStore.setState({routeState: route});

export const onSignOut = () => useStore.setState({routeState: 'SIGN_IN'});

export const useHydration = () => {
  const [hydrated, setHydrated] = useState(useStore.persist.hasHydrated);

  useEffect(() => {
    const unsubHydrate = useStore.persist.onHydrate(() => setHydrated(false));
    const unsubFinishHydration = useStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );

    setHydrated(useStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};

export default useStore;
