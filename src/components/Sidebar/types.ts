import type { ReactNode } from 'react';
import type { ButtonProps } from '../Button';
import type { InputProps } from '../Form/Input';

export interface ThirdLevelSidebarItem {
  title: string;
  link: string;
  badgeCount?: number;
  disabled?: boolean;
  active?: boolean;
}

export interface SecondLevelSidebarItem {
  title: string;
  icon: ReactNode;
  link?: string;
  badgeCount?: number;
  disabled?: boolean;
  active?: boolean;
  children?: ThirdLevelSidebarItem[];
}

export interface FirstLevelSidebarItem {
  title: string;
  children?: SecondLevelSidebarItem[];
}

interface SidebarPropsBase {
  /** Whether the sidebar panel is expanded. */
  isOpen: boolean;
  /** Called to toggle the open state (passed to open/close controls). */
  setIsOpen: (isOpen: boolean) => void;
  /** Logo images for expanded (`open`) and collapsed (`close`) states, plus optional img attributes. */
  logo?: {
    /** Image `src` used when the sidebar is expanded. */
    open: string;
    /** Image `src` used when the sidebar is collapsed. */
    close: string;
  } & Omit<
    React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    'src'
  >;
  /** Pass `true` for a default search input, or `InputProps` to customise it. @default false */
  searchInput?: boolean | Omit<InputProps, 'value' | 'onChange'>;
  /** Navigation item tree rendered in the sidebar body. */
  items?: FirstLevelSidebarItem[];
  /** Additional content rendered below the navigation items. */
  extraComponent?: ReactNode;
  /** User profile block shown at the bottom of the sidebar. */
  userProfile?: {
    /** Avatar image URL. */
    image: string;
    /** Display name. */
    name?: string;
    /** Secondary line (role, email, etc.). */
    description?: string;
    /** If provided, the profile block becomes a link. */
    link?: string;
  };
  /** Called when the logout button is clicked. Renders the logout button when provided. */
  onLogout?: () => void;
  /** Extra props forwarded to the logout Button (excluding `onClick`). */
  logOutButtonProps?: Omit<ButtonProps, 'onClick'>;
  /** Extra class names on the sidebar panel. */
  className?: string;
  hideOnClose?: boolean;
  /** Shows a backdrop overlay when the sidebar is open (useful on mobile). @default false */
  showMask?: boolean;
}

export interface SidebarPropsWithHideOnClose {
  hideOnClose: true;
}

export interface SidebarPropsWithoutHideOnClose {
  hideOnClose?: false;
  openOnHover?: boolean;
}

export type SidebarProps = SidebarPropsBase &
  (SidebarPropsWithHideOnClose | SidebarPropsWithoutHideOnClose);
