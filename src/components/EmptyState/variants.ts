import type { EmptyStateProps } from './types';

export const sizeClassNames: Record<
  Required<EmptyStateProps>['size'],
  { container: string; icon: string; title: string; description: string }
> = {
  sm: {
    container: 'crow:py-6 crow:px-4 crow:gap-2',
    icon: 'crow:w-10 crow:h-10',
    title: 'crow:font-h6-bold',
    description: 'crow:font-p3-regular',
  },
  md: {
    container: 'crow:py-10 crow:px-6 crow:gap-3',
    icon: 'crow:w-14 crow:h-14',
    title: 'crow:font-h5-bold',
    description: 'crow:font-p2-regular',
  },
  lg: {
    container: 'crow:py-16 crow:px-8 crow:gap-4',
    icon: 'crow:w-20 crow:h-20',
    title: 'crow:font-h4-bold',
    description: 'crow:font-p1-regular',
  },
};
