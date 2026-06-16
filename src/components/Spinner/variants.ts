import type { SpinnerProps } from './types';

export const sizeClassNames: Record<Required<SpinnerProps>['size'], string> = {
  sm: 'crow:w-4 crow:h-4 crow:border-2',
  md: 'crow:w-6 crow:h-6 crow:border-2',
  lg: 'crow:w-10 crow:h-10 crow:border-[3px]',
};

export const colorClassNames: Record<Required<SpinnerProps>['color'], string> = {
  primary: 'crow:border-primary-200 crow:border-t-primary-500',
  secondary: 'crow:border-secondary-200 crow:border-t-secondary-500',
  gray: 'crow:border-gray-200 crow:border-t-gray-600',
  success: 'crow:border-success-200 crow:border-t-success-600',
  error: 'crow:border-error-200 crow:border-t-error-500',
  warning: 'crow:border-warning-200 crow:border-t-warning-500',
  sky: 'crow:border-sky-200 crow:border-t-sky-500',
  violet: 'crow:border-violet-200 crow:border-t-violet-500',
  flamingo: 'crow:border-flamingo-200 crow:border-t-flamingo-500',
};
