import clsx from 'clsx';
import { memo } from 'react';
import type { Option, SelectProps } from './types';
import Checkbox from '../Checkbox';

type OptionItemProps<T> = Partial<SelectProps<T>> & {
  onClick: () => void;
  option: Option<T>;
};

function renderDefaultOptionItem({
  label,
  isMultiple,
  isActive,
  disabled,
}: {
  label: string;
  isMultiple: boolean;
  isActive: boolean;
  disabled: boolean;
}) {
  if (!isMultiple) return label;

  return (
    <Checkbox
      checked={isActive}
      label={label}
      readOnly
      disabled={disabled}
    />
  );
}

const OptionItem = <T,>(props: OptionItemProps<T>) => {
  const { option, onClick, value, mode, optionCellClassName, optionCell } = props;

  function isOptionActive() {
    if (Array.isArray(value)) return value.includes(option.value);
    return option.value === value;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'crow:w-full crow:text-start crow:px-3 crow:disabled:cursor-not-allowed crow:py-3 crow:font-p1-regular crow:disabled:bg-gray-50 crow:transition',
        isOptionActive()
          ? 'crow:bg-primary-50 crow:text-primary-500'
          : 'crow:text-gray-700 crow:disabled:text-gray-400',
        optionCellClassName,
      )}
      disabled={option.disabled}
    >
      {optionCell
        ? optionCell(option, isOptionActive())
        : renderDefaultOptionItem({
            label: option.label,
            isMultiple: mode === 'multiple',
            isActive: isOptionActive(),
            disabled: option.disabled ?? false,
          })}
    </button>
  );
};

export default memo(OptionItem) as typeof OptionItem;
