import type { ReactNode } from 'react';

interface BreadcrumbItemBase {
  title: string;
  icon?: ReactNode;
}

interface BreadcrumbItemLink {
  link: string;
  onClick?: never;
}
interface BreadcrumbItemOnClick {
  link?: never;
  onClick: () => void;
}

export type BreadcrumbItem = BreadcrumbItemBase & (BreadcrumbItemLink | BreadcrumbItemOnClick);

export interface BreadcrumbProps {
  /** Ordered list of breadcrumb items to render. */
  items: BreadcrumbItem[];
  /** Current page title displayed at the end of the breadcrumb trail. */
  pageTitle?: string;
  /** Extra class names on the breadcrumb container. */
  className?: string;
}
