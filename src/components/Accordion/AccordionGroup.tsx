'use client';
import clsx from 'clsx';
import { useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { accordionContext } from './context';

interface AccordionGroupProps {
  /** Key(s) of the item(s) open on initial render. Pass an array only when `disableAccordion` is true. */
  defaultActiveKey?: string | string[];
  /** Extra class names on the accordion list container. */
  className?: string;
  /** When true, multiple items can be open simultaneously (accordion behavior disabled). @default false */
  disableAccordion?: boolean;
}

function initializeState(
  defaultActiveKey: AccordionGroupProps['defaultActiveKey'],
  disableAccordion: AccordionGroupProps['disableAccordion'] = false,
) {
  if (!defaultActiveKey) return disableAccordion ? [] : null;
  const isDefaultKeyArray = Array.isArray(defaultActiveKey);

  if (disableAccordion) return isDefaultKeyArray ? defaultActiveKey : [defaultActiveKey];

  return isDefaultKeyArray ? (defaultActiveKey[0] as string) : defaultActiveKey;
}

const AccordionGroup: FC<PropsWithChildren<AccordionGroupProps>> = (props) => {
  const { defaultActiveKey, className, children, disableAccordion } = props;
  const [activeKey, setActiveKey] = useState<string | string[] | null>(
    initializeState(defaultActiveKey, disableAccordion),
  );

  return (
    <div className={clsx('crow:flex crow:flex-col', className)}>
      <accordionContext.Provider
        value={{
          activeKey,
          setActiveKey,
        }}
      >
        {children}
      </accordionContext.Provider>
    </div>
  );
};

export default AccordionGroup;
