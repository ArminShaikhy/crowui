import type { ReactNode } from 'react';

export type CardColor = 'primary' | 'warning' | 'error' | 'success' | 'gray' | 'white' | 'ghost';
export type CardSize = 'small' | 'medium';
export type CardShadow = 'none' | 'sm' | 'md' | 'lg';
export type CardTitleVariant = 'primary' | 'default';

export interface CardHeaderProps {
  /** Height tier that matches the parent CardProps `size`. */
  size: CardSize;
  /** Background color of the header strip. */
  color: CardColor;
  /** Heading text. */
  title: string;
  /** Leading icon node. */
  icon: ReactNode;
  /** `'primary'` uses brand styling; `'default'` uses neutral. */
  variant: CardTitleVariant;
  /** Additional element rendered in the header's trailing area. */
  Element: ReactNode;
  /** Extra class names on the header container. */
  className?: string;
}

export interface CardProps {
  /** Controls card padding. @default 'medium' */
  size?: CardSize;
  /** Background color palette. @default 'white' */
  color?: CardColor;
  /** Box-shadow depth. @default 'none' */
  shadow?: CardShadow;
  /** Optional header configuration. Size is inherited from `size`. */
  header?: Omit<Partial<CardHeaderProps>, 'size'>;
  /** Extra class names on the card surface. */
  className?: string;
  /** Card body content. */
  children: ReactNode;
  /** Extra class names on the outer wrapper element. */
  wrapperClassName?: string;
}
