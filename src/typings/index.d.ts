type TRouteStates = 'SPLASH' | 'SIGN_IN' | 'MAIN';

type StoreState = {
  /** Tên route */
  routeState: TRouteStates;
};
