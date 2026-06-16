import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import IconArrowLeft2 from '@/src/icons/IconArrowLeft2';
import IconArrowRight2 from '@/src/icons/IconArrowRight2';
import {
  INPUT_DEFAULT_CLASS,
  MULTIPLE_INPUT_CLASS,
  THUMB_ICON_SIZE,
  THUMB_SIZE,
} from './constants';
import RangeThumb from './Thumb';
import type { RangeInputProps, RangeValueType } from './types';

function RangeInput<T extends RangeValueType>(props: Readonly<RangeInputProps<T>>) {
  const {
    value,
    wrapperClassName,
    min,
    max,
    color = 'primary',
    step = 1,
    onChange,
    disabled,
    endTitle,
    startTitle,
    tooltip = true,
    tooltipSize = 'medium',
    tooltipClassName,
  } = props;

  const isMultipleRange = Array.isArray(value);
  const [start = 0, end = 0] = isMultipleRange ? value : [0, 0];

  const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

  const handleSingleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value) as T);
  };

  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newStart = Math.min(Number(e.target.value), end - step);
    onChange([newStart, end] as T);
  };

  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEnd = Math.max(Number(e.target.value), start + step);
    onChange([start, newEnd] as T);
  };

  const startPercent = getPercent(isMultipleRange ? start : value);
  const endPercent = getPercent(end);

  const commonThumbProps = {
    color,
    tooltip,
    disabled,
    tooltipSize,
    tooltipClassName,
  };

  return (
    <div {...(wrapperClassName ? { className: wrapperClassName } : {})}>
      <div className="crow:relative crow:group">
        <div className="crow:w-full crow:relative crow:bg-primary-50 crow:h-1 crow:rounded-sm crow:flex crow:items-center">
          <div
            className={clsx(
              'crow:h-full crow:absolute crow:top-0 crow:rounded-sm',
              { 'crow:bg-gray-300': disabled },
              { 'crow:bg-primary-500': color === 'primary' && !disabled },
              { 'crow:bg-secondary-600': color === 'secondary' && !disabled },
            )}
            style={{
              right: isMultipleRange ? `${getPercent(start)}%` : '0%',
              width: isMultipleRange
                ? `${getPercent(end) - getPercent(start)}%`
                : `${getPercent(value)}%`,
            }}
          />
          <input
            type="range"
            min={min}
            max={isMultipleRange ? end : max}
            step={step}
            value={isMultipleRange ? start : value}
            onChange={isMultipleRange ? handleStartChange : handleSingleChange}
            disabled={disabled}
            className={clsx(
              INPUT_DEFAULT_CLASS,
              isMultipleRange && `${MULTIPLE_INPUT_CLASS} crow:right-0`,
            )}
            style={{
              width: isMultipleRange ? `calc(${endPercent}% - ${THUMB_SIZE}px)` : '100%',
            }}
          />
          {isMultipleRange && (
            <input
              type="range"
              min={start}
              max={max}
              step={step}
              value={end}
              onChange={handleEndChange}
              disabled={disabled}
              className={`${INPUT_DEFAULT_CLASS} ${MULTIPLE_INPUT_CLASS} crow:left-0`}
              style={{
                width: `calc(${100 - startPercent}% - ${THUMB_SIZE}px)`,
              }}
            />
          )}
        </div>
        <div
          className="crow:absolute crow:inset-0"
          style={{
            width: `calc(100% - ${THUMB_SIZE}px)`,
          }}
        >
          <RangeThumb
            {...commonThumbProps}
            percent={startPercent}
            value={isMultipleRange ? start : value}
            icon={
              isMultipleRange && (
                <IconArrowLeft2
                  width={THUMB_ICON_SIZE}
                  height={THUMB_ICON_SIZE}
                />
              )
            }
          />
          {isMultipleRange && (
            <RangeThumb
              {...commonThumbProps}
              percent={endPercent}
              value={end}
              icon={
                <IconArrowRight2
                  width={THUMB_ICON_SIZE}
                  height={THUMB_ICON_SIZE}
                />
              }
            />
          )}
        </div>
      </div>
      {Boolean(startTitle ?? endTitle) && (
        <div
          className={clsx(
            'crow:mt-4 crow:w-full crow:flex crow:items-center crow:font-p2-medium',
            disabled ? 'crow:text-gray-300' : 'crow:text-gray-500',
            { 'crow:justify-between': startTitle && endTitle },
            { 'crow:justify-start': startTitle && !endTitle },
            { 'crow:justify-end': !startTitle && endTitle },
          )}
        >
          <span>{startTitle}</span>
          <span>{endTitle}</span>
        </div>
      )}
    </div>
  );
}

export default RangeInput;
export * from './types';
