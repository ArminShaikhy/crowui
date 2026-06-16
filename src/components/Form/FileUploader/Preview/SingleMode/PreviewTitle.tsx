import clsx from 'clsx';
import type { FC } from 'react';
import { TITLE_CLASS, COMPACT_TITLE_CLASS } from '../../constants';
import type { FileType } from '../../types';

export type SingleType = 'default' | 'compact';

interface PreviewTitleProps {
  type: SingleType;
  title?: string;
  fileName?: string;
  loading?: FileType['loading'];
  errorMessage?: FileType['errorMessage'];
  status?: FileType['status'];
}

const PreviewTitle: FC<PreviewTitleProps> = ({
  type,
  title,
  fileName,
  loading,
  errorMessage,
  status = 'default',
}) => {
  const text = title ?? fileName;
  if (!text) return null;

  const map = type === 'compact' ? COMPACT_TITLE_CLASS : TITLE_CLASS;
  const classType = loading ? map.loading : errorMessage ? map.error : map[status];

  const baseClass =
    'crow:font-p2-medium crow:text-center crow:line-clamp-1 crow:w-0 crow:min-w-full';

  const layoutClass =
    type === 'compact'
      ? 'crow:absolute crow:-bottom-[0.5px] crow:px-3 crow:backdrop-blur-[1px] crow:text-white crow:py-1.5 crow:rounded-b-lg crow:mt-1'
      : 'crow:px-3 crow:py-1.5 crow:rounded-lg crow:mt-1';

  return <div className={clsx(classType, baseClass, layoutClass)}>{text}</div>;
};

export default PreviewTitle;
