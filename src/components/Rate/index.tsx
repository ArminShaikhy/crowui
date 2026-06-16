import clsx from 'clsx';
import type { FC } from 'react';
import RateStar, { type RateStarProps } from './RateStar';
import type { RateProps } from './types';

import '@/src/styles.css';

function getStarState(currentValue: number, value: number): RateStarProps['state'] {
  const integerPart = Math.floor(value);

  if (currentValue <= integerPart) return 'fill';
  if (currentValue - 1 === integerPart && value % 1 >= 0.5) return 'half-fill';
  return 'empty';
}

const Rate: FC<RateProps> = (props) => {
  const {
    value,
    total,
    onChange,
    showRateNumber = true,
    showStarsNumber,
    showTotalStars,
    size = 'large',
    className,
  } = props;

  return (
    <div
      className={clsx(
        'crow:flex crow:gap-2',
        showTotalStars && showStarsNumber ? 'crow:items-start' : 'crow:items-center',
        className,
      )}
    >
      {showTotalStars ? (
        <div className="crow:flex crow:flex-row-reverse crow:items-center crow:gap-1">
          {Array(total)
            .keys()
            .map((starItem) => (
              <div
                key={starItem}
                className="crow:flex crow:flex-col crow:items-center crow:justify-center"
              >
                <RateStar
                  size={size}
                  state={getStarState(starItem + 1, value)}
                  onClick={() => onChange && onChange(starItem + 1)}
                />
                {showStarsNumber && (
                  <span className="crow:mt-0.5 crow:font-caption-regular crow:ss02 crow:text-gray-500">
                    {starItem + 1}
                  </span>
                )}
              </div>
            ))}
        </div>
      ) : (
        <RateStar
          size={size}
          state="fill"
        />
      )}
      {showRateNumber && (
        <div className="crow:flex crow:items-center crow:ss02">
          <span
            className={clsx('crow:text-primary-400 crow:ml-1', {
              'crow:font-h2-bold crow:leading-7': size === 'large',
              'crow:font-h5-bold crow:leading-6': size === 'small',
            })}
          >
            {value <= total ? value : total}
          </span>
          <span
            className={clsx('crow:text-gray-400', {
              'crow:font-h5-bold': size === 'large',
              'crow:font-h6-bold': size === 'small',
            })}
          >
            از {total}
          </span>
        </div>
      )}
    </div>
  );
};

export default Rate;
export * from './types';
