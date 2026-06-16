import clsx from 'clsx';
import type { FC } from 'react';
import type { SpinnerProps } from './types';
import { sizeClassNames, colorClassNames } from './variants';

import '@/src/styles.css';

export type { SpinnerProps } from './types';

const base = 'crow:inline-block crow:rounded-full crow:border-solid crow:animate-spin';

const Spinner: FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  label = 'Loading',
  className,
}) => (
  <span
    role="status"
    aria-label={label}
    className={clsx(base, sizeClassNames[size], colorClassNames[color], className)}
  >
    <span className="crow:sr-only">{label}</span>
  </span>
);

export default Spinner;
