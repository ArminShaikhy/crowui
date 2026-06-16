'use client';

import clsx from 'clsx';
import { useEffect, useRef, type FC, type ReactNode } from 'react';
import { useTableContext } from './context';
import type { ColumnsType } from './types';
import { getStickyClass } from './utils';

interface TabelCellProps {
  children: ReactNode;
  className?: string;
  type: 'td' | 'th';
  sticky?: ColumnsType['sticky'];
  addBorderToSticky?: boolean;
  stuckToTop?: boolean;
}

const TabelCell: FC<TabelCellProps> = (props) => {
  const { children, className, type, sticky, addBorderToSticky, stuckToTop } = props;
  const cellRef = useRef<HTMLTableCellElement>(null);
  const Element = type;
  const { observer } = useTableContext();

  useEffect(() => {
    if (!cellRef.current || !observer) return;

    if (sticky) observer.observe(cellRef.current);

    return () => {
      if (!cellRef.current || !observer) return;

      if (sticky) observer.unobserve(cellRef.current);
    };
  }, [cellRef, observer]);

  return (
    <Element
      ref={cellRef}
      className={clsx(className, getStickyClass(sticky, addBorderToSticky), {
        'crow:border-b-0 crow:before:content[""] crow:before:absolute crow:before:bottom-0 crow:before:left-0 crow:before:w-full crow:before:border-b crow:before:border-solid crow:before:border-gray-200':
          stuckToTop,
        'crow:top-0 crow:z-20': stuckToTop && sticky,
        'crow:sticky crow:top-0 crow:z-10': stuckToTop && !sticky,
      })}
      id={sticky && `sticky-cell-${sticky}`}
    >
      {children}
    </Element>
  );
};

export default TabelCell;
