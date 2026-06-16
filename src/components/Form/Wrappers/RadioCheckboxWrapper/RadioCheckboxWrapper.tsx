import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

import '@/src/styles.css';

interface RadioCheckboxBaseProps {
  /** Label rendered beside the input. */
  label?: string | ReactNode;
  /** Applies error border styling. Also auto-set when `errorMessage` is present. */
  isError?: boolean;
  /** Error text shown below the input. */
  errorMessage?: string;
  /** Helper / hint text shown below the input when there is no error. */
  helperMessage?: string;
  /** Extra class names on the root label element. */
  containerClassName?: string;
}

interface RadioCheckboxBordered extends RadioCheckboxBaseProps {
  /** `'bordered'` wraps the whole row in a bordered card; `'default'` is inline. */
  variant: 'bordered';
  /** Trailing icon rendered inside the bordered card (only available in `'bordered'` variant). */
  icon?: ReactNode;
}

interface RadioCheckboxDefault extends RadioCheckboxBaseProps {
  /** `'bordered'` wraps the whole row in a bordered card; `'default'` is inline. @default 'default' */
  variant?: 'default';
  icon?: never;
}

export type RadioCheckboxBaseUnionProps = RadioCheckboxBordered | RadioCheckboxDefault;

type RadioCheckboxWrapperProps = RadioCheckboxBaseUnionProps & {
  children: (classNames: { inputClassName: string; checkedInputClassName: string }) => ReactNode;
};

const RadioCheckboxWrapper: FC<RadioCheckboxWrapperProps> = (props) => {
  const {
    children,
    containerClassName,
    errorMessage,
    helperMessage,
    isError,
    label,
    variant = 'default',
  } = props;

  const icon = (props as RadioCheckboxBordered).icon;
  const showError = isError || Boolean(errorMessage);

  return (
    <label
      className={clsx(
        'crow:flex crow:w-fit crow:justify-between crow:items-center crow:group crow:has-[:disabled]:opacity-40 crow:has-[:disabled]:cursor-not-allowed crow:transition',
        {
          'crow:p-3 crow:border crow:w-full crow:border-solid crow:rounded-xl crow:bg-surface crow:has-[:checked]:bg-primary-50':
            variant === 'bordered',
          'crow:has-[:checked]:border-primary-500 crow:border-gray-200 crow:hover:ring-4 crow:hover:ring-gray-100 has-[:focus]:ring crow:has-[:focus]:ring-primary-300 crow:has-[:focus]:ring-offset-1 crow:has-[:focus]:ring-offset-white':
            variant === 'bordered' && !showError,
          'crow:border-error-500 crow:hover:ring-4 crow:hover:ring-error-50 has-[:focus]:ring crow:has-[:focus]:ring-error-300 crow:has-[:focus]:ring-offset-1 crow:has-[:focus]:ring-offset-white':
            variant === 'bordered' && showError,
        },
        containerClassName,
      )}
    >
      <div className={clsx('crow:flex crow:items-start crow:space-x-2')}>
        <div
          className={clsx('crow:relative crow:h-[18px] crow:w-[18px] crow:shrink-0', {
            'crow:mt-1': label,
          })}
        >
          {children({
            inputClassName: clsx(
              'crow:peer crow:w-full crow:h-full crow:disabled:bg-gray-200 crow:appearance-none crow:border crow:border-gray-300 crow:group-hover:border-primary-500 crow:checked:bg-primary-500 crow:checked:border-transparent crow:transition-all',
              {
                'crow:group-hover:ring-4 crow:group-hover:ring-gray-100 crow:focus:!ring crow:focus:!ring-primary-300 crow:focus:ring-offset-1 crow:focus:ring-offset-white':
                  variant !== 'bordered' && !showError,
                'crow:!border-error-500 crow:group-hover:ring-4 crow:group-hover:ring-error-50 crow:focus:!ring crow:focus:!ring-error-300 crow:focus:ring-offset-1 crow:focus:ring-offset-white':
                  variant !== 'bordered' && showError,
              },
            ),
            checkedInputClassName:
              'crow:absolute crow:top-0 crow:left-0 crow:w-full crow:h-full crow:flex crow:items-center crow:justify-center crow:text-white crow:opacity-0 crow:peer-checked:opacity-100 crow:transition-opacity',
          })}
        </div>
        {Boolean(label) && (
          <div className="crow:space-y-1">
            <div className="crow:font-p2-medium crow:text-gray-700 crow:transition crow:group-hover:text-primary-500">
              {label}
            </div>
            {Boolean(errorMessage || helperMessage) && (
              <div
                className={clsx(
                  'crow:font-p3-regular',
                  errorMessage ? 'crow:text-error-500' : 'crow:text-gray-500',
                )}
              >
                {errorMessage || helperMessage}
              </div>
            )}
          </div>
        )}
      </div>
      {variant === 'bordered' && icon ? (
        <div className="crow:text-gray-600 crow:group-hover:text-primary-500 crow:group-checked:text-primary-500">
          {icon}
        </div>
      ) : null}
    </label>
  );
};

export default RadioCheckboxWrapper;
