'use client';

import clsx from 'clsx';
import { useEffect, useLayoutEffect, useRef, useState, type FC, type KeyboardEvent } from 'react';

import '@/src/styles.css';

import type { SegmentedControlOption, SegmentedControlProps } from './types';
import { segmentedControlContainerVariant, segmentedControlSizeStyle } from './variants';

interface IndicatorRect {
  left: number;
  width: number;
}

const SegmentedControl: FC<SegmentedControlProps> = (props) => {
  const {
    options,
    value,
    onChange,
    variant = 'default',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    className,
    segmentClassName,
    'aria-label': ariaLabel,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const hasMeasuredRef = useRef(false);
  const [indicatorRect, setIndicatorRect] = useState<IndicatorRect | null>(null);
  const [hasMeasured, setHasMeasured] = useState(false);

  const enabledOptions = options.filter((option) => !option.disabled);

  const measureIndicator = () => {
    const activeEl = segmentRefs.current.get(value);
    const containerEl = containerRef.current;
    if (!activeEl || !containerEl) return;

    const containerRect = containerEl.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    setIndicatorRect({
      left: activeRect.left - containerRect.left,
      width: activeRect.width,
    });

    if (!hasMeasuredRef.current) {
      hasMeasuredRef.current = true;
      setHasMeasured(true);
    }
  };

  useLayoutEffect(() => {
    measureIndicator();
  }, [value, options, size, fullWidth]);

  useEffect(() => {
    const handleResize = () => measureIndicator();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = enabledOptions.findIndex((option) => option.value === value);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = enabledOptions[(currentIndex + 1) % enabledOptions.length];
      if (next) onChange(next.value);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev =
        enabledOptions[(currentIndex - 1 + enabledOptions.length) % enabledOptions.length];
      if (prev) onChange(prev.value);
    } else if (e.key === 'Home') {
      e.preventDefault();
      if (enabledOptions[0]) onChange(enabledOptions[0].value);
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = enabledOptions[enabledOptions.length - 1];
      if (last) onChange(last.value);
    }
  };

  const sizeStyle = segmentedControlSizeStyle[size];

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled}
      onKeyDown={handleKeyDown}
      className={clsx(
        'crow:relative crow:inline-flex crow:items-center',
        sizeStyle.container,
        segmentedControlContainerVariant[variant],
        fullWidth && 'crow:flex crow:w-full',
        disabled && 'crow:opacity-50 crow:cursor-not-allowed',
        className,
      )}
    >
      {indicatorRect && (
        <div
          aria-hidden
          className={clsx(
            'crow:absolute crow:top-1 crow:bottom-1 crow:bg-white crow:dark:bg-gray-700 crow:shadow-sm crow:rounded-lg',
            'crow:transition-[left,width] crow:duration-300 crow:ease-in-out',
            !hasMeasured && 'crow:transition-none',
          )}
          style={{ left: indicatorRect.left, width: indicatorRect.width }}
        />
      )}
      {options.map((option) => {
        const isActive = option.value === value;
        const isDisabled = disabled || option.disabled;

        return (
          <button
            key={option.value}
            ref={(el) => {
              if (el) segmentRefs.current.set(option.value, el);
              else segmentRefs.current.delete(option.value);
            }}
            type="button"
            role="radio"
            aria-checked={isActive}
            tabIndex={isActive ? 0 : -1}
            disabled={isDisabled}
            onClick={() => !isDisabled && onChange(option.value)}
            className={clsx(
              'crow:relative crow:z-10 crow:flex crow:items-center crow:justify-center crow:transition-colors crow:duration-300',
              sizeStyle.segment,
              fullWidth && 'crow:flex-1',
              isActive
                ? 'crow:text-gray-900 crow:dark:text-gray-50'
                : 'crow:text-gray-500 crow:dark:text-gray-400 crow:hover:text-gray-700 crow:dark:hover:text-gray-200',
              isDisabled && 'crow:cursor-not-allowed crow:opacity-40',
              segmentClassName,
            )}
          >
            {option.icon && <span className="crow:shrink-0">{option.icon}</span>}
            <span className="crow:whitespace-nowrap">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
export type { SegmentedControlOption, SegmentedControlProps };
