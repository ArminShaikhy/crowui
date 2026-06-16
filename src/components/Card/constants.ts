import type { CardColor, CardShadow, CardSize } from './types';

export const cardBodyColorClassnameMap: Record<CardColor, string> = {
  error: 'crow:bg-error-50 crow:border-error-200 crow:border crow:border-solid',
  gray: 'crow:bg-gray-50 crow:border-gray-200 crow:border crow:border-solid',
  primary: 'crow:bg-primary-50 crow:border-primary-200 crow:border crow:border-solid',
  success: 'crow:bg-success-50 crow:border-success-200 crow:border crow:border-solid',
  warning: 'crow:bg-warning-50 crow:border-warning-200 crow:border crow:border-solid',
  white: 'crow:bg-white crow:border-gray-200 crow:border crow:border-solid',
  ghost: 'crow:bg-transparent crow:border crow:border-solid crow:border-gray-200',
};

export const cardBodySizeClassnameMap: Record<CardSize, string> = {
  medium: 'crow:p-6 crow:rounded-xl',
  small: 'crow:p-4 crow:rounded-xl',
};

export const cardShadowClassnameMap: Record<CardShadow, string> = {
  none: '',
  sm: 'crow:shadow-sm',
  md: 'crow:shadow-md',
  lg: 'crow:shadow-lg',
};
