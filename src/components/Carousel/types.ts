import type { ReactNode } from 'react';

export interface CarouselProps {
  /** Slide content; each direct child renders as one slide. */
  children: ReactNode;
  /** Extra class names on the root container. */
  className?: string;
  /** Extra class names on the sliding track. */
  trackClassName?: string;
  /** Shows the previous/next arrow buttons. @default true */
  showControls?: boolean;
  /** Shows the dot indicators below the slides. @default true */
  showIndicators?: boolean;
  /** Extra class names on the dot indicators container. */
  indicatorsClassName?: string;
  /** Zero-based index of the slide to show on mount. @default 0 */
  initialSlide?: number;
  /** Pass `true` for default autoplay, or `{ delay }` to customize the interval in ms. @default false */
  autoplay?:
    | boolean
    | {
        delay?: number;
      };
  /** Loops back to the first/last slide when navigating past the edges. @default true */
  loop?: boolean;
  /** Called with the new zero-based slide index when navigation occurs. */
  onSlideIndexChange?: (slideIndex: number) => void;
  /** Aria-label for the previous slide button. */
  prevButtonAriaLabel?: string;
  /** Aria-label for the next slide button. */
  nextButtonAriaLabel?: string;
}
