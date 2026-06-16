import type { SegmentedControlProps } from './types';

export const segmentedControlContainerVariant: Record<
  Required<SegmentedControlProps>['variant'],
  string
> = {
  default: 'crow:bg-gray-100 crow:dark:bg-gray-800',
  outline: 'crow:bg-transparent crow:border crow:border-gray-200 crow:dark:border-gray-700',
};

export const segmentedControlSizeStyle: Record<
  Required<SegmentedControlProps>['size'],
  { container: string; segment: string }
> = {
  small: {
    container: 'crow:p-0.5 crow:rounded-lg',
    segment: 'crow:px-2.5 crow:py-1 crow:rounded-md crow:font-p3-medium crow:gap-1',
  },
  medium: {
    container: 'crow:p-1 crow:rounded-xl',
    segment: 'crow:px-3.5 crow:py-1.5 crow:rounded-lg crow:font-p2-medium crow:gap-1.5',
  },
  large: {
    container: 'crow:p-1 crow:rounded-xl',
    segment: 'crow:px-4 crow:py-2.5 crow:rounded-lg crow:font-p1-medium crow:gap-2',
  },
};
