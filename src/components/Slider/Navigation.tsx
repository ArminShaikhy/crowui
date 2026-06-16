import clsx from 'clsx';
import type { FC } from 'react';
import IconArrowLeft2 from '@/src/icons/IconArrowLeft2';
import IconArrowRight2 from '@/src/icons/IconArrowRight2';
import { useSliderContext } from './context';
import NavigationDot from './NavigationDot';
import Button from '../Button';

interface NavigationProps {
  onNavigate: (slide: number) => void;
  slideIndex: number;
  slidesCount: number;
}

const SHOW_ON_HOVER_CLASS = 'crow:opacity-0 crow:group-hover:opacity-100 crow:transition-opacity';

const Navigation: FC<NavigationProps> = (props) => {
  const { onNavigate, slideIndex, slidesCount } = props;

  const {
    navigationButtonsShowType = 'hide',
    dotsClassName,
    navigationContainerClassName,
    navigationVariant = 'outside',
    showNavigationDots = true,
    showPaginationText,
  } = useSliderContext();

  const getNavigationButtons = () => {
    const buttonsBaseClassForOnSides = clsx(
      'crow:!absolute crow:top-1/2 crow:-translate-y-1/2',
      SHOW_ON_HOVER_CLASS,
    );
    return (
      <>
        <Button
          type="button"
          variant="secondary"
          onClick={() => onNavigate(slideIndex - 1)}
          rightIcon={<IconArrowRight2 />}
          aria-label="slider-previous-button"
          className={
            navigationButtonsShowType === 'onSides'
              ? clsx(buttonsBaseClassForOnSides, 'crow:right-[5.5%]')
              : undefined
          }
        />
        <Button
          type="button"
          variant="secondary"
          onClick={() => onNavigate(slideIndex + 1)}
          rightIcon={<IconArrowLeft2 />}
          aria-label="slider-next-button"
          className={
            navigationButtonsShowType === 'onSides'
              ? clsx(buttonsBaseClassForOnSides, 'crow:left-[5.5%]')
              : undefined
          }
        />
      </>
    );
  };

  return (
    <>
      {navigationButtonsShowType &&
        navigationButtonsShowType !== 'hide' &&
        navigationButtonsShowType === 'onSides' &&
        getNavigationButtons()}
      <div
        className={clsx(
          'crow:flex',
          {
            'crow:items-center crow:mt-2': navigationVariant === 'outside',
            'crow:absolute crow:bottom-4 crow:w-full crow:justify-center':
              navigationVariant === 'inside',
            'crow:justify-between':
              navigationVariant === 'outside' &&
              navigationButtonsShowType !== 'hide' &&
              navigationButtonsShowType !== 'onSides',
            'crow:justify-center':
              navigationVariant === 'outside' &&
              (navigationButtonsShowType === 'hide' || navigationButtonsShowType === 'onSides'),
          },
          navigationContainerClassName,
        )}
      >
        {navigationButtonsShowType &&
          navigationButtonsShowType !== 'hide' &&
          navigationButtonsShowType !== 'onSides' && (
            <div
              className={clsx(
                'crow:flex crow:gap-2',
                navigationButtonsShowType === 'hover' && SHOW_ON_HOVER_CLASS,
                navigationVariant === 'inside' && 'crow:absolute crow:bottom-0 crow:left-[5.5%]',
              )}
            >
              {getNavigationButtons()}
            </div>
          )}
        {(showNavigationDots || showPaginationText) && (
          <div className="crow:flex crow:items-center crow:gap-3">
            {showPaginationText && (
              <div className="crow:flex crow:items-center crow:gap-1 crow:font-caption-regular crow:text-gray-400 crow:ss02">
                <span
                  className={clsx('crow:font-bold', {
                    'crow:text-gray-600': navigationVariant === 'outside',
                    'crow:text-white': navigationVariant === 'inside',
                  })}
                >
                  {slideIndex + 1}
                </span>
                <span>از</span>
                <span>{slidesCount}</span>
              </div>
            )}
            {showNavigationDots && (
              <div
                className={clsx(
                  'crow:flex crow:items-center crow:justify-center crow:gap-2',
                  dotsClassName,
                )}
              >
                {Array.from(Array(slidesCount).keys()).map((item, index) => (
                  <NavigationDot
                    key={item + slidesCount}
                    active={slideIndex === index}
                    index={index}
                    onClick={() => onNavigate(index)}
                    onNavigateToNext={() => onNavigate(slideIndex + 1)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navigation;
