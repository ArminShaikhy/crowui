'use client';

import clsx from 'clsx';
import { useEffect, useId, useRef, useState, type FC } from 'react';
import { useFlipPosition } from '@/src/hooks/useFlipPosition';
import { useOutsideClick } from '@/src/hooks/useOutsideClick';
import '@/src/styles.css';
import { DURATION_CLASS, POSITION_CLASS_NAMES, REMOVE_CONTAINER_TIMEOUT } from './constants';
import type { PopconfirmProps } from './types';
import Button from '../Button';
import type { PopperPosition } from '../Form/Wrappers/PickerWrapper/type';

const Popconfirm: FC<PopconfirmProps> = (props) => {
  const {
    trigger,
    title,
    description,
    confirmLabel = 'تایید',
    cancelLabel = 'انصراف',
    onConfirm,
    onCancel,
    confirmLoading,
    disabled = false,
    position = 'top-center',
    className,
    wrapperClassName,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isInDom, setIsInDom] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<PopperPosition>(position);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popconfirmId = useId();

  const { anchorRef, popperRef } = useFlipPosition<HTMLElement, HTMLDivElement>({
    initialPosition: position,
    minVisible: 180,
    padding: 8,
    onPositionChange(newPosition) {
      setCurrentPosition(newPosition);
    },
  });

  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    closePopconfirm();
  });

  function clearTransitionTimeout() {
    if (transitionTimeout.current) {
      clearTimeout(transitionTimeout.current);
      transitionTimeout.current = null;
    }
  }

  function openPopconfirm() {
    if (disabled) return;
    clearTransitionTimeout();
    setIsInDom(true);
    transitionTimeout.current = setTimeout(() => {
      setIsOpen(true);
    }, 0);
  }

  function closePopconfirm() {
    clearTransitionTimeout();
    setIsOpen(false);
    transitionTimeout.current = setTimeout(() => {
      setIsInDom(false);
    }, REMOVE_CONTAINER_TIMEOUT);
  }

  function togglePopconfirm() {
    if (isInDom) closePopconfirm();
    else openPopconfirm();
  }

  function handleConfirm() {
    onConfirm?.();
    closePopconfirm();
  }

  function handleCancel() {
    onCancel?.();
    closePopconfirm();
  }

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closePopconfirm();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    return () => clearTransitionTimeout();
  }, []);

  return (
    <div
      ref={containerRef}
      className={clsx('crow:relative crow:inline-block', wrapperClassName)}
    >
      {trigger(togglePopconfirm, anchorRef, isOpen)}
      {isInDom && (
        <div
          ref={popperRef}
          id={popconfirmId}
          role="dialog"
          aria-hidden={!isOpen}
          className={clsx(
            'crow:absolute crow:z-50 crow:w-max crow:max-w-[280px] crow:flex crow:flex-col crow:gap-3 crow:rounded-2xl crow:border crow:border-gray-200 crow:bg-white crow:p-4 crow:shadow-lg',
            'crow:dark:bg-gray-700 crow:dark:border-gray-600',
            'crow:transition-all',
            DURATION_CLASS,
            isOpen ? 'crow:opacity-100 crow:scale-100' : 'crow:opacity-0 crow:scale-95',
            POSITION_CLASS_NAMES[currentPosition],
            className,
          )}
        >
          <div className="crow:flex crow:flex-col crow:gap-1">
            {title && (
              <div className="crow:font-h5-bold crow:text-gray-800 crow:dark:text-white">
                {title}
              </div>
            )}
            {description && (
              <div className="crow:font-p3-regular crow:text-gray-600 crow:dark:text-gray-300">
                {description}
              </div>
            )}
          </div>
          <div className="crow:flex crow:gap-2 crow:justify-end">
            <Button
              variant="outline"
              color="gray"
              size="small"
              onClick={handleCancel}
            >
              {cancelLabel}
            </Button>
            <Button
              variant="primary"
              color="primary"
              size="small"
              isLoading={confirmLoading}
              onClick={handleConfirm}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popconfirm;
export type { PopconfirmProps } from './types';
