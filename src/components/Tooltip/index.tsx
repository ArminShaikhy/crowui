'use client';
import clsx from 'clsx';
import { useMemo, useState, type FC, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useFlipPosition } from '@/src/hooks/useFlipPosition';
import { isBrowser } from '@/src/utils/isBrowser';
import TooltipContent from './Content';

import '@/src/styles.css';
import type { PopperPosition } from '../Form/Wrappers/PickerWrapper/type';

export interface TooltipProps {
  /** Preferred display position relative to the trigger. Auto-flips if there is insufficient space. @default 'top-center' */
  position?: PopperPosition;
  /** Bold heading inside the tooltip panel. */
  title?: string;
  /** Optional icon rendered beside the title. */
  icon?: ReactNode;
  /** Main tooltip body content (required). */
  content: ReactNode;
  /** Optional content rendered at the bottom of the tooltip panel. */
  footer?: ReactNode;
  /** Extra class names on the tooltip panel. */
  className?: string;
  /** Extra class names on the trigger wrapper element. */
  wrapperClassName?: string;
  /** Trigger element the tooltip is anchored to. */
  children: ReactNode;
  /** When true, the tooltip never shows. @default false */
  disabled?: boolean;
  /** Portals the tooltip panel to `document.body` to escape overflow:hidden parents. @default false */
  attachToBody?: boolean;
  /** Controls panel padding and font size. @default 'medium' */
  size?: 'small' | 'medium' | 'large';
  /** Dark or light color scheme for the panel. @default 'dark' */
  theme?: 'dark' | 'light';
}

const Tooltip: FC<TooltipProps> = (props) => {
  const {
    children,
    content,
    className,
    wrapperClassName,
    footer,
    icon,
    position = 'top-center',
    title,
    disabled,
    attachToBody,
    size = 'medium',
    theme = 'dark',
  } = props;
  const [open, setOpen] = useState(false);
  const [innerPosition, setInnerPosition] = useState(position);
  const { anchorRef, popperRef } = useFlipPosition<HTMLDivElement, HTMLDivElement>({
    initialPosition: position,
    onPositionChange(newPosition) {
      setInnerPosition((prev) => (prev === newPosition ? prev : newPosition));
    },
  });

  function showTooltip() {
    if (disabled) return;
    setOpen(true);
  }

  function closeTooltip() {
    setOpen(false);
  }

  const contentComponent = (
    <TooltipContent
      ref={popperRef}
      open={open}
      title={title}
      icon={icon}
      footer={footer}
      className={className}
      position={innerPosition}
      content={content}
      size={size}
      theme={theme}
    />
  );

  const anchorPositionStyles = useMemo(() => {
    if (!anchorRef.current || !attachToBody || !isBrowser()) return {};
    const { top, left, width, height } = anchorRef.current.getBoundingClientRect();

    return {
      top: `${top + window?.scrollY}px`,
      left: `${left + window?.scrollX}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
  }, [open, attachToBody]);

  return (
    <div
      ref={anchorRef}
      className={clsx('crow:relative', wrapperClassName)}
      onMouseEnter={showTooltip}
      onTouchStart={showTooltip}
      onMouseLeave={closeTooltip}
      onTouchEnd={closeTooltip}
    >
      {children}
      {attachToBody && isBrowser()
        ? createPortal(
            <div
              className="crow:absolute"
              style={{
                ...anchorPositionStyles,
              }}
            >
              {contentComponent}
            </div>,
            document?.body,
          )
        : contentComponent}
    </div>
  );
};

export default Tooltip;
