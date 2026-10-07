type TLanguage = 'en' | 'vi';

type StoreState = {
  appTheme: 'dark' | 'light';
  appLanguage: TLanguage;
};

type BaseAPIResponse<T = undefined> = {
  message: string;
  data: T;
  msg: string;
};

type WidthSizeClass = 'compact' | 'medium' | 'expanded';

/** Xem `useResponsiveSizeClass` */
interface ResponsiveSizeClassResult {
  windowSizeClass: WidthSizeClass;
  widthDp: number;
  isTwoPane: boolean;
}
