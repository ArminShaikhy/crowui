import type { ButtonOwnProps } from '.';

export const variantStyle: Record<
  Required<ButtonOwnProps>['variant'],
  Record<Required<ButtonOwnProps>['color'], string>
> = {
  primary: {
    primary:
      'crow:bg-primary-500 crow:active:bg-primary-600 crow:hover:bg-primary-300 crow:text-white crow:border-transparent',
    success:
      'crow:bg-success-600 crow:active:bg-success-700 crow:hover:bg-success-500 crow:text-white crow:border-transparent',
    error:
      'crow:bg-error-500 crow:active:bg-error-600 crow:hover:bg-error-400 crow:text-white crow:border-transparent',
    warning:
      'crow:bg-warning-500 crow:active:bg-warning-600 crow:hover:bg-warning-300 crow:text-gray-900 crow:border-transparent',
    gray: 'crow:bg-gray-600 crow:active:bg-gray-700 crow:hover:bg-gray-500 crow:text-white crow:border-transparent',
    sky: 'crow:bg-sky-500 crow:active:bg-sky-600 crow:hover:bg-sky-400 crow:text-white crow:border-transparent',
    violet:
      'crow:bg-violet-500 crow:active:bg-violet-600 crow:hover:bg-violet-400 crow:text-white crow:border-transparent',
    flamingo:
      'crow:bg-flamingo-500 crow:active:bg-flamingo-600 crow:hover:bg-flamingo-400 crow:text-white crow:border-transparent',
  },
  secondary: {
    primary:
      'crow:text-primary-500 crow:hover:text-primary-400 crow:active:text-primary-700 crow:bg-gray-100 crow:active:bg-gray-200 crow:hover:bg-gray-50 crow:border-transparent',
    success:
      'crow:text-success-600 crow:hover:text-success-500 crow:active:text-success-700 crow:bg-success-50 crow:active:bg-success-100 crow:hover:bg-success-50 crow:border-transparent',
    error:
      'crow:text-error-500 crow:hover:text-error-400 crow:active:text-error-700 crow:bg-error-50 crow:active:bg-error-100 crow:hover:bg-error-50 crow:border-transparent',
    warning:
      'crow:text-gray-700 crow:hover:text-gray-600 crow:active:text-gray-800 crow:bg-warning-50 crow:active:bg-warning-100 crow:hover:bg-warning-50 crow:border-transparent',
    gray: 'crow:text-gray-600 crow:hover:text-gray-500 crow:active:text-gray-800 crow:bg-gray-100 crow:active:bg-gray-200 crow:hover:bg-gray-100 crow:border-transparent',
    sky: 'crow:text-sky-600 crow:hover:text-sky-500 crow:active:text-sky-700 crow:bg-sky-50 crow:active:bg-sky-100 crow:hover:bg-sky-50 crow:border-transparent',
    violet:
      'crow:text-violet-600 crow:hover:text-violet-500 crow:active:text-violet-700 crow:bg-violet-50 crow:active:bg-violet-100 crow:hover:bg-violet-50 crow:border-transparent',
    flamingo:
      'crow:text-flamingo-600 crow:hover:text-flamingo-500 crow:active:text-flamingo-700 crow:bg-flamingo-50 crow:active:bg-flamingo-100 crow:hover:bg-flamingo-50 crow:border-transparent',
  },
  outline: {
    primary:
      'crow:text-primary-500 crow:hover:text-primary-400 crow:active:text-primary-700 crow:border-primary-300 crow:hover:border-primary-200 crow:active:border-primary-600',
    success:
      'crow:text-success-600 crow:hover:text-success-500 crow:active:text-success-700 crow:border-success-500 crow:hover:border-success-400 crow:active:border-success-700 crow:disabled:active:border-success-600',
    error:
      'crow:text-error-500 crow:hover:text-error-400 crow:active:text-error-700 crow:border-error-300 crow:hover:border-error-200 crow:active:border-error-600 crow:disabled:border-error-500',
    warning:
      'crow:text-warning-700 crow:hover:text-warning-600 crow:active:text-warning-800 crow:border-warning-500 crow:hover:border-warning-400 crow:active:border-warning-600',
    gray: 'crow:text-gray-600 crow:hover:text-gray-500 crow:active:text-gray-800 crow:border-gray-400 crow:hover:border-gray-300 crow:active:border-gray-700 crow:disabled:border-gray-600',
    sky: 'crow:text-sky-600 crow:hover:text-sky-500 crow:active:text-sky-700 crow:border-sky-400 crow:hover:border-sky-300 crow:active:border-sky-600',
    violet:
      'crow:text-violet-600 crow:hover:text-violet-500 crow:active:text-violet-700 crow:border-violet-400 crow:hover:border-violet-300 crow:active:border-violet-600',
    flamingo:
      'crow:text-flamingo-600 crow:hover:text-flamingo-500 crow:active:text-flamingo-700 crow:border-flamingo-400 crow:hover:border-flamingo-300 crow:active:border-flamingo-600',
  },
  text: {
    primary:
      'crow:text-primary-500 crow:hover:text-primary-400 crow:active:text-primary-700 crow:border-transparent',
    success:
      'crow:text-success-600 crow:hover:text-success-500 crow:active:text-success-700 crow:border-transparent',
    error:
      'crow:text-error-500 crow:hover:text-error-400 crow:active:text-error-700 crow:border-transparent',
    warning:
      'crow:text-warning-700 crow:hover:text-warning-600 crow:active:text-warning-800 crow:border-transparent',
    gray: 'crow:text-gray-600 crow:hover:text-gray-500 crow:active:text-gray-800 crow:border-transparent',
    sky: 'crow:text-sky-600 crow:hover:text-sky-500 crow:active:text-sky-700 crow:border-transparent',
    violet:
      'crow:text-violet-600 crow:hover:text-violet-500 crow:active:text-violet-700 crow:border-transparent',
    flamingo:
      'crow:text-flamingo-600 crow:hover:text-flamingo-500 crow:active:text-flamingo-700 crow:border-transparent',
  },
  ghost: {
    primary:
      'crow:text-primary-500 crow:hover:text-primary-400 crow:active:text-primary-700 crow:border-transparent crow:hover:bg-primary-50 crow:active:bg-primary-100',
    success:
      'crow:text-success-600 crow:hover:text-success-500 crow:active:text-success-700 crow:border-transparent crow:hover:bg-success-50 crow:active:bg-success-100',
    error:
      'crow:text-error-500 crow:hover:text-error-400 crow:active:text-error-700 crow:border-transparent crow:hover:bg-error-50 crow:active:bg-error-100',
    warning:
      'crow:text-warning-700 crow:hover:text-warning-600 crow:active:text-warning-800 crow:border-transparent crow:hover:bg-warning-50 crow:active:bg-warning-100',
    gray: 'crow:text-gray-600 crow:hover:text-gray-500 crow:active:text-gray-800 crow:border-transparent crow:hover:bg-gray-100 crow:active:bg-gray-200',
    sky: 'crow:text-sky-600 crow:hover:text-sky-500 crow:active:text-sky-700 crow:border-transparent crow:hover:bg-sky-50 crow:active:bg-sky-100',
    violet:
      'crow:text-violet-600 crow:hover:text-violet-500 crow:active:text-violet-700 crow:border-transparent crow:hover:bg-violet-50 crow:active:bg-violet-100',
    flamingo:
      'crow:text-flamingo-600 crow:hover:text-flamingo-500 crow:active:text-flamingo-700 crow:border-transparent crow:hover:bg-flamingo-50 crow:active:bg-flamingo-100',
  },
  link: {
    primary:
      'crow:text-primary-500 crow:hover:text-primary-400 crow:active:text-primary-700 crow:border-transparent crow:hover:underline',
    success:
      'crow:text-success-600 crow:hover:text-success-500 crow:active:text-success-700 crow:border-transparent crow:hover:underline',
    error:
      'crow:text-error-500 crow:hover:text-error-400 crow:active:text-error-700 crow:border-transparent crow:hover:underline',
    warning:
      'crow:text-warning-700 crow:hover:text-warning-600 crow:active:text-warning-800 crow:border-transparent crow:hover:underline',
    gray: 'crow:text-gray-600 crow:hover:text-gray-500 crow:active:text-gray-800 crow:border-transparent crow:hover:underline',
    sky: 'crow:text-sky-600 crow:hover:text-sky-500 crow:active:text-sky-700 crow:border-transparent crow:hover:underline',
    violet:
      'crow:text-violet-600 crow:hover:text-violet-500 crow:active:text-violet-700 crow:border-transparent crow:hover:underline',
    flamingo:
      'crow:text-flamingo-600 crow:hover:text-flamingo-500 crow:active:text-flamingo-700 crow:border-transparent crow:hover:underline',
  },
};

export const sizeStyle: Record<Required<ButtonOwnProps>['size'], string> = {
  small: 'button-small-icon crow:py-2.5 crow:px-4 crow:font-button-small',
  medium: 'button-medium-icon crow:py-3 crow:px-5 crow:font-button-medium',
  large: 'button-large-icon crow:py-3 crow:px-6 crow:font-button-large',
  xlarge: 'button-xlarge-icon crow:py-4 crow:px-8 crow:font-button-large crow:text-lg',
};

export const iconOnlyButtonSizeStyle: Record<Required<ButtonOwnProps>['size'], string> = {
  small: 'button-small-icon crow:p-[10px]',
  medium: 'button-medium-icon crow:p-3',
  large: 'button-large-icon crow:p-3',
  xlarge: 'button-xlarge-icon crow:p-5',
};
