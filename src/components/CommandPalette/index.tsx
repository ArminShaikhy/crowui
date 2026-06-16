'use client';

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FC,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import '@/src/styles.css';
import IconSearch from '@/src/icons/IconSearch';
import { trapFocus } from '@/src/utils/focusTrap';
import { isBrowser } from '@/src/utils/isBrowser';
import {
  ANIMATION_DURATION,
  DEFAULT_ARIA_LABEL,
  DEFAULT_EMPTY_MESSAGE,
  DEFAULT_PLACEHOLDER,
} from './constants';
import type { CommandItem, CommandPaletteProps } from './types';
import { getBackdropClassName, getItemClassName, getPanelClassName } from './variants';

export type { CommandItem, CommandPaletteProps } from './types';

function matches(item: CommandItem, query: string): boolean {
  if (!query) return true;
  const haystack = [item.label, item.description, ...(item.keywords ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

const CommandPalette: FC<CommandPaletteProps> = ({
  open,
  onOpenChange,
  items,
  onSelect,
  placeholder = DEFAULT_PLACEHOLDER,
  emptyMessage = DEFAULT_EMPTY_MESSAGE,
  disableShortcut = false,
  closeOnSelect = true,
  className,
  ariaLabel = DEFAULT_ARIA_LABEL,
}) => {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isControlled ? Boolean(open) : internalOpen;

  const [show, setShow] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const listId = useId();

  const container = isBrowser() ? document.body : null;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const filteredItems = useMemo(() => items.filter((item) => matches(item, query)), [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, isOpen]);

  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (isBrowser()) previousFocusRef.current = document.activeElement as HTMLElement;
      setRendered(true);
      setShow(true);
      setQuery('');
      const focusTimeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(focusTimeout);
    }

    if (!rendered) return;

    // Play the exit animation, then unmount once it finishes.
    setShow(false);
    previousFocusRef.current?.focus();
    const unmountTimeout = setTimeout(() => {
      setRendered(false);
    }, ANIMATION_DURATION);
    return () => clearTimeout(unmountTimeout);
  }, [isOpen]);

  const activate = useCallback(
    (item: CommandItem) => {
      if (item.disabled) return;
      item.onSelect?.();
      onSelect?.(item);
      if (closeOnSelect) setOpen(false);
    },
    [onSelect, closeOnSelect, setOpen],
  );

  useEffect(() => {
    if (disableShortcut) return;
    function onKeyDown(e: KeyboardEvent) {
      const isShortcut = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isShortcut) {
        e.preventDefault();
        setOpen(!isOpen);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [disableShortcut, isOpen, setOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) trapFocus(dialogRef.current, e);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, setOpen]);

  const handleInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) =>
        filteredItems.length === 0 ? 0 : (prev + 1) % filteredItems.length,
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) =>
        filteredItems.length === 0 ? 0 : (prev - 1 + filteredItems.length) % filteredItems.length,
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = filteredItems[activeIndex];
      if (item) activate(item);
    }
  };

  if (!rendered || !container) return null;

  const groups = new Map<string | undefined, CommandItem[]>();
  filteredItems.forEach((item) => {
    const key = item.group;
    groups.set(key, [...(groups.get(key) ?? []), item]);
  });

  let renderIndex = 0;

  return createPortal(
    <div
      className={getBackdropClassName(show)}
      onClick={() => setOpen(false)}
    >
      <div className="crow:flex crow:justify-center crow:px-4 crow:pt-[12vh]">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={titleId}
          className={getPanelClassName(show, className)}
          onClick={(e) => e.stopPropagation()}
        >
          <span
            id={titleId}
            className="crow:sr-only"
          >
            {ariaLabel}
          </span>
          <div className="crow:flex crow:items-center crow:gap-2 crow:px-4 crow:py-3 crow:border-b crow:border-gray-200 crow:dark:border-gray-700">
            <IconSearch
              width={20}
              height={20}
              className="crow:text-gray-400 crow:shrink-0"
            />
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-autocomplete="list"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder={placeholder}
              className="crow:flex-1 crow:bg-transparent crow:focus:outline-none crow:font-p1-regular crow:text-gray-800 crow:dark:text-gray-100 crow:placeholder:text-gray-400"
            />
          </div>
          <div
            id={listId}
            role="listbox"
            className="crow:flex crow:flex-col crow:gap-1 crow:p-2 crow:overflow-y-auto"
          >
            {filteredItems.length === 0 ? (
              <div className="crow:px-4 crow:py-6 crow:text-center crow:font-p2-regular crow:text-gray-400">
                {emptyMessage}
              </div>
            ) : (
              Array.from(groups.entries()).map(([group, groupItems]) => (
                <div key={group ?? '__ungrouped__'}>
                  {group ? (
                    <div className="crow:px-2 crow:py-1 crow:font-caption-regular crow:text-gray-400">
                      {group}
                    </div>
                  ) : null}
                  {groupItems.map((item) => {
                    const index = renderIndex;
                    renderIndex += 1;
                    const active = index === activeIndex;
                    return (
                      <div
                        key={item.id}
                        id={`${listId}-option-${index}`}
                        role="option"
                        aria-selected={active}
                        aria-disabled={item.disabled || undefined}
                        className={getItemClassName(active, item.disabled)}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => activate(item)}
                      >
                        {item.icon ? (
                          <span className="crow:shrink-0 crow:text-gray-500 crow:dark:text-gray-300 crow:[&_svg]:w-5 crow:[&_svg]:h-5">
                            {item.icon}
                          </span>
                        ) : null}
                        <span className="crow:flex-1 crow:flex crow:flex-col crow:min-w-0">
                          <span className="crow:truncate">{item.label}</span>
                          {item.description ? (
                            <span className="crow:truncate crow:font-caption-regular crow:text-gray-400">
                              {item.description}
                            </span>
                          ) : null}
                        </span>
                        {item.shortcut ? (
                          <span className="crow:shrink-0 crow:font-caption-regular crow:text-gray-400">
                            {item.shortcut}
                          </span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>,
    container,
  );
};

export default CommandPalette;
