'use client';
import clsx from 'clsx';
import { useState } from 'react';
import IconArrowLeft2 from '@/src/icons/IconArrowLeft2';
import IconArrowRight2 from '@/src/icons/IconArrowRight2';
import { getPaginationRange, DOTS } from './utils';
import Button from '../Button';

import '@/src/styles.css';

export interface PaginationProps {
  /** Total number of items across all pages. */
  totalCount: number;
  /** Number of items per page. */
  pageSize: number;
  /** Called with the newly selected page number when the user navigates. */
  onPageChange?: (page: number) => void;
  /** Number of page buttons shown on each side of the current page. @default 1 */
  siblingCount?: number;
  /** Page number to display on first render. @default 1 */
  defaultCurrent?: number;
  /** Shows text labels ("Previous" / "Next") inside the navigation buttons. @default true */
  navigationButtonsWithText?: boolean;
  /** Hides the entire pagination when only one page exists. @default false */
  hideOnSinglePage?: boolean;
  /** Extra class names on the pagination container. */
  className?: string;
}

const Pagination = (props: PaginationProps) => {
  const {
    totalCount,
    pageSize,
    onPageChange,
    siblingCount = 1,
    defaultCurrent = 1,
    navigationButtonsWithText = true,
    hideOnSinglePage,
    className,
  } = props;
  const [currentPage, setCurrentPage] = useState(defaultCurrent);
  const paginationRange = getPaginationRange({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });
  const lastPage = paginationRange[paginationRange.length - 1];

  if (hideOnSinglePage && paginationRange.length < 2) {
    return null;
  }

  function handlePageChange(page: number) {
    if (typeof onPageChange === 'function') onPageChange(page);
    setCurrentPage(page);
  }

  return (
    <div
      className={clsx(
        'crow:flex crow:justify-between crow:w-full crow:px-4 crow:text-gray-600',
        className,
      )}
    >
      <Button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        rightIcon={<IconArrowRight2 />}
        variant={navigationButtonsWithText ? 'text' : 'secondary'}
        size={navigationButtonsWithText ? 'medium' : 'small'}
      >
        {navigationButtonsWithText && 'صفحه قبل'}
      </Button>
      <div className="crow:flex crow:items-center crow:gap-x-1 crow:md:gap-x-4">
        {paginationRange.map((pageNumber, index) => {
          if (typeof pageNumber === 'string') {
            return <div key={`${pageNumber}-${index}`}>{DOTS}</div>;
          }
          return (
            <button
              key={pageNumber}
              className={clsx(
                'crow:ss02 crow:w-9 crow:h-9 crow:md:w-11 crow:md:h-11 crow:flex crow:justify-center crow:items-center crow:font-h6-bold crow:md:font-h5-bold crow:transition crow:border crow:border-solid crow:border-transparent crow:rounded-lg',
                pageNumber === currentPage
                  ? 'crow:bg-primary-500 crow:text-white'
                  : 'crow:hover:text-primary-500 crow:hover:border-primary-200',
                className,
              )}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <Button
        disabled={currentPage === lastPage}
        onClick={() => handlePageChange(currentPage + 1)}
        leftIcon={<IconArrowLeft2 />}
        variant={navigationButtonsWithText ? 'text' : 'secondary'}
        size={navigationButtonsWithText ? 'medium' : 'small'}
      >
        {navigationButtonsWithText && 'صفحه بعد'}
      </Button>
    </div>
  );
};

export default Pagination;
