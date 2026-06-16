import clsx from 'clsx';
import type { FC } from 'react';
import IconStarFill from '@/src/icons/IconStarFill';
import IconStarHalfFill from '@/src/icons/IconStarHalfFill';
import IconStarOutline from '@/src/icons/IconStarOutline';
import type { RateProps } from './types';

export interface RateStarProps {
  size: RateProps['size'];
  state: 'empty' | 'half-fill' | 'fill';
  onClick?: () => void;
}

const RateStar: FC<RateStarProps> = (props) => {
  const { size, state, onClick } = props;

  let Icon = IconStarOutline;
  if (state === 'fill') Icon = IconStarFill;
  else if (state === 'half-fill') Icon = IconStarHalfFill;

  return (
    <Icon
      className={clsx(
        'crow:hover:scale-110 crow:transition-transform',
        {
          'crow:size-6': size === 'large',
          'crow:size-5': size === 'small',
        },
        state === 'empty' ? 'crow:text-gray-200' : 'crow:text-warning-500',
        typeof onClick === 'function' && 'crow:cursor-pointer',
      )}
      onClick={onClick}
    />
  );
};

export default RateStar;
