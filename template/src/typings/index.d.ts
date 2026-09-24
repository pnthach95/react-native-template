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
