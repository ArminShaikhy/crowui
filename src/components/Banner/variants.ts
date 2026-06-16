import type { BannerProps } from './types';

type BannerVariantRecords = Record<Required<BannerProps>['variant'], string>;

interface SectionRecords {
  container: BannerVariantRecords;
  icon: BannerVariantRecords;
  title: BannerVariantRecords;
  text: BannerVariantRecords;
  close: BannerVariantRecords;
}

export const bannerVariantClassNames: SectionRecords = {
  container: {
    info: 'crow:bg-primary-50 crow:border-primary-100',
    success: 'crow:bg-success-50 crow:border-success-200',
    warning: 'crow:bg-warning-50 crow:border-warning-200',
    error: 'crow:bg-error-50 crow:border-error-200',
  },
  icon: {
    info: 'crow:text-primary-400',
    success: 'crow:text-success-600',
    warning: 'crow:text-warning-700',
    error: 'crow:text-error-600',
  },
  title: {
    info: 'crow:text-primary-700',
    success: 'crow:text-success-800',
    warning: 'crow:text-warning-800',
    error: 'crow:text-error-700',
  },
  text: {
    info: 'crow:text-primary-600',
    success: 'crow:text-success-800',
    warning: 'crow:text-warning-800',
    error: 'crow:text-error-600',
  },
  close: {
    info: 'crow:text-primary-600',
    success: 'crow:text-success-800',
    warning: 'crow:text-warning-800',
    error: 'crow:text-error-600',
  },
};
