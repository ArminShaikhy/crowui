import clsx from 'clsx';
import type { FC } from 'react';

import '@/src/styles.css';

export interface SwitchProps {
  /** Current on/off state. */
  checked: boolean;
  /** Called with the new boolean state when the user toggles the switch. */
  onChange: (checked: SwitchProps['checked']) => void;
  /** Shows an indeterminate (dash) state instead of on/off. @default false */
  isIntermediate?: boolean;
  /** Text label rendered beside the switch. */
  label?: string;
  /** Secondary description text below the label. */
  description?: string;
  /** Dims and blocks interaction. @default false */
  disabled?: boolean;
  /** Switch track size. @default 'large' */
  size?: 'large' | 'small';
  /** Extra class names on the root label element. */
  containerClassName?: string;
  /** Extra class names on the switch track. */
  className?: string;
}

const SIZE_CLASS: Record<
  Required<SwitchProps>['size'],
  { switch: string; label: string; toggler: string }
> = {
  large: {
    switch: 'crow:w-11 crow:h-6',
    label: 'crow:font-p1-medium',
    toggler: 'crow:size-5',
  },
  small: {
    switch: 'crow:w-9 crow:h-5',
    label: 'crow:font-p2-medium',
    toggler: 'crow:size-4',
  },
};

const Switch: FC<SwitchProps> = (props) => {
  const {
    checked,
    onChange,
    isIntermediate,
    label,
    description,
    disabled,
    size = 'large',
    className,
    containerClassName,
  } = props;

  return (
    <button
      type="button"
      className={clsx(
        'crow:flex crow:gap-x-2 crow:group',
        disabled && 'crow:opacity-50',
        containerClassName,
      )}
      onClick={() => onChange(!checked)}
      disabled={disabled}
    >
      <div
        className={clsx(
          'crow:relative crow:rounded-xl crow:transition',
          'crow:group-hover:ring-4 crow:group-hover:ring-gray-100',
          'crow:group-focus:ring-offset-1 crow:group-focus:ring-offset-white crow:group-focus:ring-4 crow:group-focus:ring-primary-300',
          checked ? 'crow:bg-primary-500' : 'crow:bg-gray-300',
          SIZE_CLASS[size].switch,
          className,
        )}
      >
        <div
          className={clsx(
            'crow:bg-white crow:rounded-full crow:transition-all crow:absolute crow:top-1/2 crow:-translate-y-1/2 crow:right-0.5 crow:left-0.5',
            {
              'crow:left-[calc(100%-2px)]': !checked,
              'crow:!w-3 crow:!h-0.5 crow:left-1/2 crow:right-1/2 crow:translate-x-1/2':
                checked && isIntermediate,
              'crow:right-[calc(100%-2px)] crow:translate-x-full': checked && !isIntermediate,
            },
            SIZE_CLASS[size].toggler,
          )}
        />
      </div>
      <div className="crow:space-y-1 crow:-mt-1">
        <div
          className={clsx(
            SIZE_CLASS[size].label,
            'crow:text-gray-700 crow:group-hover:text-primary-500 crow:transition-colors',
          )}
        >
          {label}
        </div>
        <div className="crow:font-p3-regular crow:text-gray-500">{description}</div>
      </div>
    </button>
  );
};

export default Switch;
