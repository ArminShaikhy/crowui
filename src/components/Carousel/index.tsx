'use client';

import clsx from 'clsx';
import { Children, useEffect, useRef, useState, type FC } from 'react';
import '@/src/styles.css';
import IconArrowLeft2 from '@/src/icons/IconArrowLeft2';
import IconArrowRight2 from '@/src/icons/IconArrowRight2';
import { DEFAULT_AUTOPLAY_DELAY, TRANSITION_CLASS } from './constants';
import type { CarouselProps } from './types';
import Button from '../Button';

const Carousel: FC<CarouselProps> = (props) => {
  const {
    children,
    className,
    trackClassName,
    showControls = true,
    showIndicators = true,
    indicatorsClassName,
    initialSlide = 0,
    autoplay = false,
    loop = true,
    onSlideIndexChange,
    prevButtonAriaLabel = 'carousel-previous-button',
    nextButtonAriaLabel = 'carousel-next-button',
  } = props;

  const slides = Children.toArray(children);
  const slidesCount = slides.length;

  const [slideIndex, setSlideIndex] = useState(() =>
    Math.min(Math.max(initialSlide, 0), Math.max(slidesCount - 1, 0)),
  );
  const autoplayTimeoutRef = useRef<ReturnType<typeof setInterval>>(undefined);

  function goTo(target: number) {
    if (slidesCount <= 0) return;

    let nextIndex = target;
    if (loop) nextIndex = ((target % slidesCount) + slidesCount) % slidesCount;
    else nextIndex = Math.min(Math.max(target, 0), slidesCount - 1);

    setSlideIndex(nextIndex);
  }

  function goToPrevious() {
    goTo(slideIndex - 1);
  }

  function goToNext() {
    goTo(slideIndex + 1);
  }

  useEffect(() => {
    if (onSlideIndexChange) onSlideIndexChange(slideIndex);
  }, [slideIndex]);

  useEffect(() => {
    if (!autoplay || slidesCount <= 1) return;

    const delay =
      typeof autoplay === 'boolean'
        ? DEFAULT_AUTOPLAY_DELAY
        : (autoplay.delay ?? DEFAULT_AUTOPLAY_DELAY);

    autoplayTimeoutRef.current = setInterval(() => {
      goToNext();
    }, delay);

    return () => {
      if (autoplayTimeoutRef.current) clearInterval(autoplayTimeoutRef.current);
    };
  }, [autoplay, slideIndex, slidesCount]);

  const canGoPrevious = loop || slideIndex > 0;
  const canGoNext = loop || slideIndex < slidesCount - 1;

  return (
    <div
      className={clsx('crow:relative crow:overflow-hidden crow:group', className)}
      style={{ direction: 'rtl' }}
    >
      <div
        className={clsx('crow:flex', TRANSITION_CLASS, trackClassName)}
        style={{ transform: `translateX(${slideIndex * -100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="crow:w-full crow:shrink-0"
          >
            {slide}
          </div>
        ))}
      </div>

      {showControls && slidesCount > 1 && (
        <>
          <Button
            type="button"
            variant="secondary"
            size="small"
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            rightIcon={<IconArrowRight2 />}
            aria-label={prevButtonAriaLabel}
            className="crow:!absolute crow:top-1/2 crow:-translate-y-1/2 crow:right-3 crow:opacity-0 crow:group-hover:opacity-100 crow:transition-opacity"
          />
          <Button
            type="button"
            variant="secondary"
            size="small"
            onClick={goToNext}
            disabled={!canGoNext}
            rightIcon={<IconArrowLeft2 />}
            aria-label={nextButtonAriaLabel}
            className="crow:!absolute crow:top-1/2 crow:-translate-y-1/2 crow:left-3 crow:opacity-0 crow:group-hover:opacity-100 crow:transition-opacity"
          />
        </>
      )}

      {showIndicators && slidesCount > 1 && (
        <div
          className={clsx(
            'crow:absolute crow:bottom-3 crow:left-0 crow:right-0 crow:flex crow:items-center crow:justify-center crow:gap-2',
            indicatorsClassName,
          )}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`carousel-indicator-${index + 1}`}
              className={clsx(
                'crow:h-[6px] crow:rounded-full crow:transition-all crow:bg-gray-200 crow:hover:bg-gray-300',
                slideIndex === index ? 'crow:w-[22px]' : 'crow:w-[6px]',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
