'use client';

import clsx from 'clsx';
import { useRef, useState, type FC, type PropsWithChildren } from 'react';
import Drawer from '@/src/components/Drawer';
import { useFlipPosition } from '@/src/hooks/useFlipPosition';
import { useOutsideClick } from '@/src/hooks/useOutsideClick';
import IconArrowDown2 from '@/src/icons/IconArrowDown2';
import { pickerWrapperContext } from './contexts';
import type { PickerWrapperProps, PopperPosition } from './type';
import Input from '../../Input';

import '@/src/styles.css';

const DURATION_CLASS = 'crow:duration-300';
// it should be bigger than duration class to show transition fully
const REMOVE_CONTAINER_TIMEOUT = 400;

const PickerWrapper: FC<PropsWithChildren<PickerWrapperProps>> = (props) => {
  const {
    dropdownType = 'popover',
    disabled,
    isLoading,
    wrapperClassName,
    customInput,
    children,
    drawerProps,
    inputProps,
    popoverClassName,
    popoverPosition,
  } = props;
  const popoverInitialPosition = popoverPosition ?? 'bottom-left';
  const [isShowWrapper, setIsShowWrapper] = useState(false);
  const [isWrapperInDom, setIsWrapperInDom] = useState(false);
  const [position, setPosition] = useState<PopperPosition>(popoverInitialPosition);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { anchorRef, popperRef } = useFlipPosition<HTMLButtonElement, HTMLDivElement>({
    initialPosition: popoverInitialPosition,
    minVisible: 180,
    onPositionChange(newPosition) {
      setPosition((prev) => (prev === newPosition ? prev : newPosition));
    },
  });

  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    if (dropdownType === 'popover' && isShowWrapper) {
      setIsShowWrapper(false);
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
      transitionTimeout.current = setTimeout(() => {
        setIsWrapperInDom(false);
      }, REMOVE_CONTAINER_TIMEOUT);
    }
  });

  function toggleWrapperVisibility() {
    if (disabled || isLoading) return;
    const newState = !isWrapperInDom;

    if (transitionTimeout.current) clearTimeout(transitionTimeout.current);

    if (newState) {
      setIsWrapperInDom(true);
      transitionTimeout.current = setTimeout(() => {
        setIsShowWrapper(true);
      }, 0);
    } else {
      setIsShowWrapper(false);
      transitionTimeout.current = setTimeout(() => {
        setIsWrapperInDom(false);
      }, REMOVE_CONTAINER_TIMEOUT);
    }
  }

  const cursorClass = clsx({
    'crow:!cursor-not-allowed': disabled,
    'crow:!cursor-wait': isLoading,
    'crow:!cursor-pointer': !isLoading && !disabled,
  });

  return (
    <div
      ref={containerRef}
      className={clsx('crow:relative', wrapperClassName)}
    >
      <button
        ref={anchorRef}
        type="button"
        className={clsx('crow:w-full', cursorClass)}
        onClick={toggleWrapperVisibility}
      >
        {customInput ? (
          customInput(isShowWrapper)
        ) : (
          <Input
            leftIcon={
              isLoading ? (
                <div className="dot-flashing crow:mr-2" />
              ) : (
                <IconArrowDown2
                  width={20}
                  height={20}
                  className={clsx('crow:transition', DURATION_CLASS, {
                    'crow:rotate-180': isShowWrapper,
                  })}
                />
              )
            }
            containerClassName={clsx(cursorClass, {
              'crow:items-baseline': isLoading,
            })}
            className={clsx('crow:caret-transparent', cursorClass)}
            disabled={disabled}
            {...inputProps}
          />
        )}
      </button>
      <pickerWrapperContext.Provider
        value={{
          toggleWrapperVisibility,
        }}
      >
        {isWrapperInDom && (
          <>
            {dropdownType === 'popover' ? (
              <div
                ref={popperRef}
                className={clsx(
                  'crow:absolute crow:min-w-[300px] crow:overflow-y-auto crow:overflow-x-hidden crow:shadow-lg crow:w-full crow:max-h-[360px] crow:transition-all crow:bg-white crow:z-50 crow:rounded-lg crow:border crow:border-solid crow:border-gray-200 crow:pb-3',
                  DURATION_CLASS,
                  isShowWrapper
                    ? 'crow:opacity-100'
                    : 'crow:opacity-0 crow:max-h-0 crow:overflow-y-hidden',
                  {
                    'crow:bottom-0 crow:translate-y-[calc(100%+8px)]': position.includes('bottom'),
                    'crow:top-0 crow:translate-y-[calc(-100%-8px)]': position.includes('top'),
                  },
                  {
                    'crow:right-0': position.endsWith('left'),
                    'crow:left-0': position.endsWith('right'),
                    'crow:left-1/2 crow:-translate-x-1/2': position.endsWith('center'),
                  },
                  popoverClassName,
                )}
              >
                {children}
              </div>
            ) : (
              <Drawer
                {...drawerProps}
                open={isShowWrapper}
                onClose={() => setIsShowWrapper(false)}
                containerClassName={clsx('crow:!pb-3 crow:!px-0', drawerProps?.containerClassName)}
              >
                {children}
              </Drawer>
            )}
          </>
        )}
      </pickerWrapperContext.Provider>
    </div>
  );
};

export default PickerWrapper;
