'use client';

import clsx from 'clsx';
import { useEffect, useId, useRef, useState, type FC } from 'react';

import { useFlipPosition } from '@/src/hooks/useFlipPosition';
import { useOutsideClick } from '@/src/hooks/useOutsideClick';

import { DURATION_CLASS, POSITION_CLASS_NAMES, REMOVE_CONTAINER_TIMEOUT } from './constants';
import { MenuContext } from './context';
import MenuItem from './MenuItem';
import type { MenuContextType, MenuProps } from './types';
import { menuPanelStyle } from './variants';
import type { PopperPosition } from '../Form/Wrappers/PickerWrapper/type';

const MenuComponent: FC<MenuProps> = (props) => {
  const {
    trigger,
    children,
    className = '',
    popoverClassName = '',
    position = 'bottom-right',
    panelVariant = 'default',
  } = props;
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isMenuInDom, setIsMenuInDom] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<PopperPosition>(position);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  const { anchorRef, popperRef } = useFlipPosition<HTMLElement, HTMLDivElement>({
    initialPosition: position,
    minVisible: 180,
    padding: 8,
    onPositionChange(newPosition) {
      setCurrentPosition(newPosition);
    },
  });

  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    if (isShowMenu) {
      setIsShowMenu(false);
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
      transitionTimeout.current = setTimeout(() => {
        setIsMenuInDom(false);
      }, REMOVE_CONTAINER_TIMEOUT);
    }
  });

  function toggleMenuVisibility() {
    const newState = !isMenuInDom;

    if (transitionTimeout.current) clearTimeout(transitionTimeout.current);

    if (newState) {
      setIsMenuInDom(true);
      transitionTimeout.current = setTimeout(() => {
        setIsShowMenu(true);
      }, 0);
    } else {
      setIsShowMenu(false);
      transitionTimeout.current = setTimeout(() => {
        setIsMenuInDom(false);
      }, REMOVE_CONTAINER_TIMEOUT);
    }
  }

  const value: MenuContextType = { close: toggleMenuVisibility };

  useEffect(() => {
    if (!isShowMenu) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') toggleMenuVisibility();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isShowMenu]);

  return (
    <MenuContext.Provider value={value}>
      <div
        ref={containerRef}
        className={clsx('crow:relative crow:inline-block crow:text-right', className)}
      >
        {trigger(toggleMenuVisibility, anchorRef, isShowMenu)}
        {isMenuInDom && (
          <div
            ref={popperRef}
            id={menuId}
            role="menu"
            aria-hidden={!isShowMenu}
            className={clsx(
              'crow:absolute crow:z-50 crow:min-w-[256px] crow:px-4 crow:pb-4 crow:rounded-2xl crow:focus:outline-none',
              menuPanelStyle[panelVariant],
              'crow:transition-all',
              DURATION_CLASS,
              isShowMenu ? 'crow:opacity-100 crow:scale-100' : 'crow:opacity-0 crow:scale-95',
              POSITION_CLASS_NAMES[currentPosition],
              popoverClassName,
            )}
          >
            {children}
          </div>
        )}
      </div>
    </MenuContext.Provider>
  );
};

interface IMenuComponent extends FC<MenuProps> {
  Item: typeof MenuItem;
}

const Menu = MenuComponent as IMenuComponent;
Menu.Item = MenuItem;

export default Menu;
export * from './types';
