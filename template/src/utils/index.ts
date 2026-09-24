import {type ClassValue, clsx} from 'clsx';
import {Dimensions, Platform, useWindowDimensions} from 'react-native';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DATE_FORMAT = {
  SERVER: {
    FULL: 'YYYY-MM-DD HH:mm:ss',
    DATE: 'YYYY-MM-DD',
  },
  CLIENT: {
    FULL: 'HH:mm DD/MM/YYYY',
    DATE: 'DD/MM/YYYY',
  },
};

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Trả về số cột dựa theo `width` của app. Dùng kết hợp với Legend List.
 * `numColumns` của `FlatList` không thay đổi linh động được
 *
 * @returns {number} Số cột
 */
export const useNumColumns = () => {
  const {width} = useWindowDimensions();
  if (width >= 1536) {
    return 5;
  }
  if (width >= 1280) {
    return 4;
  }
  if (width >= 1024) {
    return 3;
  }
  if (width >= 768) {
    return 2;
  }
  return 1;
};

export const toVND = (num: number) =>
  num.toLocaleString('vi', {
    currency: 'VND',
    style: 'currency',
  });

/**
 * Safe area cho control window button trên iPadOS 26
 * @returns {object} left và top
 */
export const useControlWindowInsets = () => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
  const {width, height} = useWindowDimensions();
  const isIPad26 =
    Platform.OS === 'ios' &&
    Platform.isPad &&
    parseInt(Platform.Version.split('.')[0], 10) >= 26;
  if (isIPad26 && (width !== screenWidth || height !== screenHeight)) {
    return {left: 66, top: 56};
  }
  return {left: 0, top: 0};
};
