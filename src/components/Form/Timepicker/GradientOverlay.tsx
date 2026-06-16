import clsx from 'clsx';
import type { FC } from 'react';

type GradientOverlayProps = { position: 'top' | 'bottom' };

const GradientOverlay: FC<GradientOverlayProps> = ({ position }) => {
  return (
    <div
      className={clsx(
        'crow:absolute crow:left-0 crow:right-0 crow:h-12 crow:pointer-events-none',
        'crow:from-[rgba(255,255,255,0.54)] crow:to-[rgba(255,255,255,0.90)]',
        position === 'top'
          ? 'crow:bg-gradient-to-t crow:top-0'
          : 'crow:bg-gradient-to-b crow:bottom-0',
      )}
    />
  );
};

export default GradientOverlay;
