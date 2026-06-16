export interface SliderProps {
  /** Extra class names on the slides track. */
  className?: string;
  /** Extra class names on the root slider container. */
  containerClassName?: string;
  /** Renders dot indicators below the slider. @default false */
  showNavigationDots?: boolean;
  /** Extra class names on the dots row. */
  dotsClassName?: string;
  /** Number of slides visible at once. @default 1 */
  slidesPerView?: number;
  /** Centers the active slide with partial views of siblings. @default false */
  centerMode?: boolean;
  /** Pass `true` for default autoplay, or `{ delay }` to customize the interval in ms. @default false */
  autoplay?:
    | boolean
    | {
        delay?: number | null;
      };
  /** Gap in pixels between slides. @default 0 */
  spaceBetween?: number;
  /** Shows a "current / total" text counter alongside navigation. @default false */
  showPaginationText?: boolean;
  /** Extra class names on the navigation buttons container. */
  navigationContainerClassName?: string;
  /** Places navigation buttons inside or outside the slide area. @default 'outside' */
  navigationVariant?: 'inside' | 'outside';
  /** Controls when navigation buttons are visible. @default 'permanent' */
  navigationButtonsShowType?: 'hide' | 'hover' | 'permanent' | 'onSides';
  /** Breakpoint-specific prop overrides keyed by min-width in pixels. */
  responsive?: Record<number, Omit<SliderProps, 'responsive'>>;
  /** Horizontal padding (px) added to the slider container. @default 0 */
  containerXPadding?: number;
  /** Zero-based index of the slide to show on mount. @default 0 */
  initialSlide?: number;
  /** Called with the new zero-based slide index when navigation occurs. */
  onSlideIndexChange?: (slideIndex: number) => void;
}

export interface SliderRef {
  navigate: (target: number) => void;
  element: HTMLDivElement | null;
}
