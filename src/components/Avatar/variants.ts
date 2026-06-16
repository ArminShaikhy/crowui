import type { AvatarProps } from './types';

export const avatarSizeStyle: Record<Required<AvatarProps>['size'], string> = {
  sm: 'crow:size-8 crow:font-caption-medium',
  md: 'crow:size-10 crow:font-p3-medium',
  lg: 'crow:size-12 crow:font-p2-medium',
  xl: 'crow:size-16 crow:font-h5-bold',
};

export const avatarShapeStyle: Record<Required<AvatarProps>['shape'], string> = {
  round: 'crow:rounded-full',
  square: 'crow:rounded-md',
};

export const avatarStatusStyle: Record<Required<AvatarProps>['status'], string> = {
  online: 'crow:bg-success-500',
  offline: 'crow:bg-gray-400',
  busy: 'crow:bg-error-500',
  away: 'crow:bg-warning-500',
};

export const avatarStatusSizeStyle: Record<Required<AvatarProps>['size'], string> = {
  sm: 'crow:size-2',
  md: 'crow:size-2.5',
  lg: 'crow:size-3',
  xl: 'crow:size-3.5',
};

export const avatarIconSizeStyle: Record<Required<AvatarProps>['size'], string> = {
  sm: 'crow:size-4',
  md: 'crow:size-5',
  lg: 'crow:size-6',
  xl: 'crow:size-8',
};
