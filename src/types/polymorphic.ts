import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType } from 'react';

export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

export type PolymorphicProps<C extends ElementType, OwnProps = object> = OwnProps & {
  as?: C;
} & Omit<ComponentPropsWithoutRef<C>, keyof OwnProps | 'as'>;

export type PolymorphicPropsWithRef<C extends ElementType, OwnProps = object> = PolymorphicProps<
  C,
  OwnProps
> & { ref?: PolymorphicRef<C> };
