interface RateBaseProps {
  /** Currently selected star count (controlled). */
  value: number;
  /** Total number of stars to render. */
  total: number;
  /** Called with the newly selected star count when the user clicks. */
  onChange?: (value: number) => void;
  /** Star icon size. @default 'large' */
  size?: 'small' | 'large';
  /** Shows a numeric label of the total star count. @default false */
  showStarsNumber?: boolean;
  /** Extra class names on the root container. */
  className?: string;
}

interface RatePropsWithStars {
  showTotalStars: true;
  showRateNumber?: boolean;
}

interface RatePropsWithRateNumber {
  showTotalStars?: boolean;
  showRateNumber: true;
}

export type RateProps = RateBaseProps & (RatePropsWithStars | RatePropsWithRateNumber);
