'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useSliderContext } from './context';
import type { SliderProps } from './types';

interface NavigationDotProps {
  active: boolean;
  index: number;
  onClick?: () => void;
  onNavigateToNext?: () => void;
}

function styleNavigationDot({
  active,
  autoplay,
  variant = 'outside',
}: {
  active: NavigationDotProps['active'];
  autoplay: SliderProps['autoplay'];
  variant: SliderProps['navigationVariant'];
}) {
  const variantClassName: Record<Required<SliderProps>['navigationVariant'], string> = {
    inside: 'crow:bg-gray-500/50 crow:hover:bg-gray-500/80',
    outside: 'crow:bg-gray-200 crow:hover:bg-gray-300',
  };

  return [
    variantClassName[variant],
    active ? 'crow:w-[22px]' : 'crow:w-[6px]',
    autoplay ? 'crow:p-[1px]' : '',
  ];
}

const NavigationDot = (props: NavigationDotProps) => {
  const { active, onClick, onNavigateToNext, index } = props;
  const { autoplay, navigationVariant = 'outside' } = useSliderContext();
  const [fillPercentage, setFillPercentage] = useState(0);

  useEffect(() => {
    if (!active || !autoplay) return;
    const autoplayTime = typeof autoplay === 'boolean' ? 7000 : (autoplay?.delay ?? 7000);
    let startTime = Date.now();

    const autoplayInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = (elapsed / autoplayTime) * 100;
      setFillPercentage(Math.min(percentage, 100));

      if (elapsed >= autoplayTime && typeof onNavigateToNext === 'function') {
        onNavigateToNext();
        setFillPercentage(0);
        clearInterval(autoplayInterval);
      }
    }, 100);

    return function cleanup() {
      setFillPercentage(0);
      startTime = Date.now();
      return clearInterval(autoplayInterval);
    };
  }, [active, autoplay, onNavigateToNext]);

  return (
    <button
      className={clsx(
        'crow:rounded-full crow:overflow-hidden crow:transition-all crow:h-[6px]',
        styleNavigationDot({ active, autoplay, variant: navigationVariant }),
      )}
      onClick={onClick}
      aria-label={`slider-navigation-dot-${index + 1}`}
    >
      {active && (
        <div
          className={clsx('crow:h-full crow:rounded-full', {
            'crow:bg-white': navigationVariant === 'inside',
            'crow:bg-gray-700': navigationVariant === 'outside',
          })}
          style={{ width: autoplay ? `${fillPercentage}%` : '100%' }}
        />
      )}
    </button>
  );
};

export default NavigationDot;
