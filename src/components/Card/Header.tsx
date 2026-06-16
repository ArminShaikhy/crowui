import clsx from 'clsx';
import type { FC } from 'react';
import { cardBodyColorClassnameMap, cardBodySizeClassnameMap } from './constants';
import type { CardHeaderProps, CardSize, CardTitleVariant } from './types';

const titleVariantClassnameMap: Record<CardTitleVariant, string> = {
  default: 'crow:text-gray-700',
  primary: 'crow:text-primary-500',
};

const sizeClassnameMap: Record<CardSize, string> = {
  small: 'crow:font-h5-bold',
  medium: 'crow:font-h3-bold',
};

const CardHeader: FC<Partial<CardHeaderProps>> = (props) => {
  const { variant = 'default', size = 'medium', color = 'white', title, icon, Element } = props;

  const headerClassName = clsx(
    'crow:rounded-b-none crow:flex crow:gap-3 crow:items-center',
    cardBodyColorClassnameMap[color],
    cardBodySizeClassnameMap[size],
  );

  const titleClassname = clsx(
    'crow:font-bold',
    titleVariantClassnameMap[variant],
    sizeClassnameMap[size],
  );

  return (
    <div className={headerClassName}>
      <div className="crow:flex crow:gap-2 crow:items-center">
        {icon}
        <p className={titleClassname}>{title}</p>
      </div>
      <div className="crow:w-full">{Element}</div>
    </div>
  );
};

export default CardHeader;
