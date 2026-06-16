'use client';

import clsx from 'clsx';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FC,
  type ReactNode,
} from 'react';
import '@/src/styles.css';
import { createPortal } from 'react-dom';
import IconCloseRemove from '@/src/icons/IconCloseRemove';
import { trapFocus, getFocusableElements } from '@/src/utils/focusTrap';
import { isBrowser } from '@/src/utils/isBrowser';

const ANIMATION_DURATION = 150;
let openDrawerCount = 0;
let updateOpenDrawerCountTimeout: ReturnType<typeof setTimeout>;

export interface DrawerProps {
  /** Whether the drawer is visible. */
  open: boolean;
  /** Called when the user closes the drawer (backdrop click, close button, Escape key). */
  onClose: () => void;
  /** When true, clicking the backdrop does not close the drawer. @default false */
  persist?: boolean;
  /** Edge the drawer slides in from; `'center'` renders a centered dialog. @default 'right' */
  position?: 'bottom' | 'top' | 'right' | 'left' | 'center';
  /** Extra class names on the panel surface. */
  className?: string;
  /** Extra class names on the backdrop overlay. */
  maskClassName?: string;
  /** Extra class names on the container wrapping header + content + footer. */
  containerClassName?: string;
  /** Inner padding (px) of the drawer panel. @default 0 */
  padding?: number;
  /** Explicit panel width; applies to `'left'` and `'right'` positions. */
  width?: CSSProperties['width'];
  /** Optional header bar configuration. */
  header?: {
    /** Heading text. */
    title?: string;
    /** Subheading text below the title. */
    description?: string;
    /** Shows a close (✕) icon button. @default true */
    haveCloseIcon?: boolean;
    /** Aria-label for the close icon (for accessibility). */
    closeIconAriaLabel?: string;
    /** Extra node rendered in the header's trailing area. */
    actionElement?: ReactNode;
    /** Extra class names on the header row. */
    containerClassName?: string;
  };
  /** Optional footer bar configuration. */
  footer?: {
    /** Content rendered inside the footer. */
    element?: ReactNode;
    /** Extra class names on the footer row. */
    containerClassName?: string;
  };
  /** Drawer body content. */
  children?: ReactNode | undefined;
  /** DOM element to portal into; defaults to `document.body`. */
  containerElement?: Element | null;
  /** Enables popover z-index layering for nested drawers. @default false */
  havePopover?: boolean;
}

function getSize({
  position,
  padding = 0,
  item,
}: {
  position: DrawerProps['position'];
  padding: DrawerProps['padding'];
  item: 'height' | 'width';
}) {
  if (position === 'center') return 'auto';
  else if (item === 'width') {
    if (position === 'bottom' || position === 'top') return `calc(100% - ${padding * 2}px)`;
    else return `auto`;
  } else {
    if (position === 'bottom' || position === 'top') return 'auto';
    else return `calc(100% - ${padding * 2}px)`;
  }
}

function getRadius({
  position,
  padding = 0,
}: {
  position: DrawerProps['position'];
  padding: DrawerProps['padding'];
}) {
  const defaultRadius = 'crow:rounded-2xl';
  if (padding > 0 || position === 'center') return defaultRadius;
  switch (position) {
    case 'bottom':
      return `${defaultRadius} crow:rounded-b-none`;
    case 'left':
      return `${defaultRadius} crow:rounded-l-none`;
    case 'right':
      return `${defaultRadius} crow:rounded-r-none`;
    case 'top':
      return `${defaultRadius} crow:rounded-t-none`;
    default:
      return defaultRadius;
  }
}

const Drawer: FC<DrawerProps> = (props) => {
  const {
    open,
    onClose,
    persist,
    position = 'bottom',
    children,
    className,
    maskClassName,
    containerClassName,
    padding = 8,
    width,
    header,
    footer,
    containerElement,
    havePopover,
  } = props;
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(open);
  const container = containerElement ?? (isBrowser() ? document?.body : null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const previousFocusRef = useRef<HTMLElement | null>(null);

  function updateBodyClasses() {
    if (!container) return;
    if (updateOpenDrawerCountTimeout) clearTimeout(updateOpenDrawerCountTimeout);

    updateOpenDrawerCountTimeout = setTimeout(() => {
      if (openDrawerCount > 0) {
        container.classList.add('crow:overflow-hidden', 'crow:relative');
      } else {
        container.classList.remove('crow:overflow-hidden', 'crow:relative');
      }
    }, ANIMATION_DURATION);
  }

  function openDrawer() {
    if (openDrawerCount === 0) updateBodyClasses();
    openDrawerCount++;
    setMounted(true);
    setTimeout(() => {
      setShow(true);
    }, ANIMATION_DURATION);
  }

  function closeDrawer(runOnClose = true) {
    setShow(false);

    setTimeout(() => {
      openDrawerCount = Math.max(0, openDrawerCount - 1);
      updateBodyClasses();
      setMounted(false);
      if (runOnClose) onClose();
    }, ANIMATION_DURATION);
  }

  useEffect(() => {
    if (open) {
      if (isBrowser()) previousFocusRef.current = document.activeElement as HTMLElement;
      openDrawer();
      setTimeout(() => {
        const focusable = dialogRef.current ? getFocusableElements(dialogRef.current) : [];
        focusable[0]?.focus();
      }, ANIMATION_DURATION + 50);
    } else if (show || mounted) {
      closeDrawer(false);
      previousFocusRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && !persist) {
        closeDrawer();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) trapFocus(dialogRef.current, e);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, persist]);

  useEffect(() => {
    return () => {
      closeDrawer(false);
    };
  }, []);

  if (!mounted || !container) return;

  const haveHeader = header
    ? Object.values(header).some((headerItem) => Boolean(headerItem))
    : false;

  const cardPosition: CSSProperties =
    position === 'center'
      ? {
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${show ? 1 : 0.95})`,
        }
      : {
          top: position !== 'bottom' ? (padding ?? 0) : 'unset',
          bottom: position !== 'top' ? (padding ?? 0) : 'unset',
          left: position !== 'right' ? (padding ?? 0) : 'unset',
          right: position !== 'left' ? (padding ?? 0) : 'unset',
        };

  return createPortal(
    <div
      className={clsx(
        'crow:bg-black/40 crow:top-0 crow:left-0 crow:z-50 crow:opacity-0 crow:overflow-hidden crow:cursor-default crow:transition-opacity crow:duration-300 crow:ease-in-out',
        { 'crow:opacity-100': show, 'crow:w-full crow:h-full': mounted },
        containerElement ? 'crow:absolute' : 'crow:fixed',
        maskClassName,
      )}
      onClick={() => (persist ? null : closeDrawer())}
    >
      <div
        className={clsx(
          'crow:absolute crow:z-10 crow:opacity-0 crow:transition crow:duration-300 crow:ease-in-out crow:flex crow:justify-center',
          {
            'crow:opacity-100': show,
            'crow:translate-y-full': !show && position === 'bottom',
            'crow:-translate-y-full': !show && position === 'top',
            'crow:translate-x-full': !show && position === 'right',
            'crow:-translate-x-full': !show && position === 'left',
          },
          className,
        )}
        style={{
          ...cardPosition,
          maxHeight: `calc(100svh - ${padding * 2}px)`,
          maxWidth: `calc(100vw - ${padding * 2}px)`,
          width: getSize({ position, padding, item: 'width' }),
          height: getSize({ position, padding, item: 'height' }),
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={header?.title ? titleId : undefined}
          className={clsx(
            'crow:flex crow:flex-col crow:bg-white crow:divide-y crow:divide-gray-200 crow:divide-solid',
            !havePopover && 'crow:overflow-x-hidden',
            getRadius({ position, padding }),
          )}
          style={{ width: width ?? '100%' }}
          onClick={(e) => e.stopPropagation()}
        >
          {header && haveHeader && (
            <div
              className={clsx('crow:h-16 crow:relative crow:shrink-0', header?.containerClassName)}
            >
              {header.actionElement ? (
                <div className="crow:absolute crow:top-1/2 crow:-translate-y-1/2 crow:right-4 crow:[&>svg]:w-6 crow:[&_svg]:h-6 crow:text-gray-600">
                  {header.actionElement}
                </div>
              ) : null}
              {header.title ? (
                <div className="crow:flex crow:flex-col crow:absolute crow:top-1/2 crow:right-1/2 crow:-translate-y-1/2 crow:translate-x-1/2 crow:text-center">
                  <span
                    id={titleId}
                    className="crow:font-h6-bold crow:text-gray-800"
                  >
                    {header.title}
                  </span>
                  {header.description ? (
                    <span className="crow:font-caption-regular crow:text-gray-500">
                      {header.description}
                    </span>
                  ) : null}
                </div>
              ) : null}
              {header.haveCloseIcon && (
                <button
                  onClick={() => closeDrawer()}
                  aria-label={header.closeIconAriaLabel ?? 'بستن'}
                  className="crow:absolute crow:top-1/2 crow:-translate-y-1/2 crow:left-4"
                >
                  <IconCloseRemove
                    width={24}
                    height={24}
                    className="crow:text-gray-600"
                  />
                </button>
              )}
            </div>
          )}
          <div
            className={clsx('crow:p-4', !havePopover && 'crow:overflow-y-auto', containerClassName)}
          >
            {children}
          </div>
          {footer?.element ? (
            <div className={clsx('crow:p-4 crow:mt-auto', footer.containerClassName)}>
              {footer.element}
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    container,
  );
};

export default Drawer;
