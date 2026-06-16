import type { AlertProps } from '.';

type AlertVariantRecords = Record<Required<AlertProps>['variant'], string>;
type AlertSizeRecords = Record<Required<AlertProps>['size'], string | number>;

interface SectionRecords<T extends AlertVariantRecords | AlertSizeRecords> {
  container: T;
  icon: T;
  title: T;
  close: T;
  text: T;
}

export const alertVariantClassNames: SectionRecords<AlertVariantRecords> = {
  container: {
    warning: 'crow:bg-warning-50 crow:border-warning-200',
    primary: 'crow:bg-primary-50 crow:border-primary-100',
    error: 'crow:bg-error-50 crow:border-error-200',
    success: 'crow:bg-success-50 crow:border-success-200',
    gray: 'crow:bg-gray-50 crow:border-gray-200',
  },
  icon: {
    warning: 'crow:text-warning-700',
    primary: 'crow:text-primary-400',
    error: 'crow:text-error-600',
    success: 'crow:text-success-600',
    gray: 'crow:text-gray-600',
  },
  title: {
    warning: 'crow:text-warning-800',
    primary: 'crow:text-primary-700',
    error: 'crow:text-error-700',
    success: 'crow:text-success-800',
    gray: 'crow:text-gray-800',
  },
  close: {
    warning: 'crow:text-warning-800',
    primary: 'crow:text-primary-600',
    error: 'crow:text-error-600',
    success: 'crow:text-success-800',
    gray: 'crow:text-gray-800',
  },
  text: {
    warning: 'crow:text-warning-800',
    primary: 'crow:text-primary-600',
    error: 'crow:text-error-600',
    success: 'crow:text-success-800',
    gray: 'crow:text-gray-700',
  },
};

export const alertSizeClassNames: SectionRecords<AlertSizeRecords> = {
  container: {
    large: 'crow:p-4',
    small: 'crow:p-3',
  },
  icon: {
    large: 24,
    small: 20,
  },
  title: {
    large: 'crow:font-h5-bold mb-2',
    small: 'crow:font-h6-bold mb-1',
  },
  close: {
    large: 20,
    small: 20,
  },
  text: {
    large: 'crow:font-p2-regular',
    small: 'crow:font-p3-regular',
  },
};
