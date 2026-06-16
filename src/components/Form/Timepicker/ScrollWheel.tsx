import clsx from 'clsx';
import { type FC } from 'react';
import GradientOverlay from './GradientOverlay';
import { useScrollWheel } from './hooks/useScrollWheel';
import type { ScrollWheelProps } from './types';

const ScrollWheel: FC<ScrollWheelProps> = (props) => {
  const {
    items,
    defaultValue,
    onValueChange,
    className,
    formatValue = (value) => String(value).padStart(2, '0'),
  } = props;
  const { containerRef, itemRefs } = useScrollWheel(items, defaultValue, onValueChange);

  return (
    <div className="crow:relative crow:h-28 crow:w-full">
      <div
        ref={containerRef}
        className={clsx(
          'crow:h-28 crow:w-full crow:py-10 crow:overflow-y-scroll crow:snap-y crow:snap-mandatory crow:scroll-smooth crow:no-scrollbar',
          className,
        )}
      >
        {items.map((item, index) => (
          <div
            key={item}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="crow:h-10 crow:flex crow:items-center crow:justify-center crow:snap-center crow:font-p1-regular"
          >
            {formatValue(item)}
          </div>
        ))}
      </div>
      <GradientOverlay position="top" />
      <GradientOverlay position="bottom" />
    </div>
  );
};

export default ScrollWheel;
