import clsx from 'clsx';
import IconArrowLeft2 from '@/src/icons/IconArrowLeft2';
import type { BreadcrumbProps } from './types';

import '@/src/styles.css';

const Breadcrumb = (props: BreadcrumbProps) => {
  const { items, pageTitle, className } = props;

  return (
    <div className={clsx('crow:bg-gray-100 crow:w-full', className)}>
      <div className="crow:flex crow:items-center crow:gap-x-1 crow:py-1 crow:overflow-x-auto crow:no-scrollbar crow:container">
        {items.map((breadcrumbItem, index) => {
          const ItemElement = 'link' in breadcrumbItem ? 'a' : 'button';
          return (
            <ItemElement
              key={breadcrumbItem.title}
              {...('link' in breadcrumbItem
                ? { href: breadcrumbItem.link }
                : { onClick: breadcrumbItem.onClick })}
              className="crow:transition crow:shrink-0 crow:flex crow:items-center crow:gap-x-1 crow:text-gray-500 crow:hover:text-primary-500"
            >
              {breadcrumbItem.icon && breadcrumbItem.icon}
              <div className="crow:font-caption-regular">{breadcrumbItem.title}</div>
              {index !== items.length - 1 || (index === items.length - 1 && pageTitle) ? (
                <IconArrowLeft2
                  width={16}
                  height={16}
                />
              ) : null}
            </ItemElement>
          );
        })}
        {pageTitle ? (
          <div className="crow:text-gray-500 crow:font-caption-demibold crow:shrink-0">
            {pageTitle}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Breadcrumb;
export * from './types';
