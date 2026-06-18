'use client';

import clsx from 'clsx';
import { useState, type DragEvent, type FC } from 'react';
import IconPlus4 from '@/src/icons/IconPlus4';
import IconPlusBold from '@/src/icons/IconPlusBold';
import FileInputIcon from './FileInputIcon';
import Button from '../../../Button';
import FieldBottomInfo from '../../Common/FieldBottomInfo/FieldBottomInfo';
import {
  DEFAULT_GRID_SIZE_CLASS,
  DEFAULT_SIZE_CLASS,
  DEFAULT_COMPACT_SIZE_CLASS,
  DISABLED_CLASS,
  DRAG_CLASS,
  ERROR_CLASS,
  FOCUS_CLASS,
  COMPACT_LAYOUT_CLASS,
  DEFAULT_LAYOUT_CLASS,
} from '../constants';
import type { FileInputProps, MultipleFilePreviewProps, SingleFilePreviewProps } from '../types';

function renderUploadButton(button: FileInputProps['button'], isCompact?: boolean) {
  const zIndexClass = 'crow:relative crow:z-10';

  if (typeof button === 'boolean') {
    if (isCompact) {
      return (
        <Button
          size="small"
          variant="secondary"
          rightIcon={<IconPlusBold />}
          className={clsx(
            zIndexClass,
            'crow:!w-7 crow:!h-7 crow:mb-0 crow:text-primary-500 crow:bg-primary-50',
            'crow:flex crow:justify-center crow:items-center crow:rounded-md crow:!p-0',
          )}
        />
      );
    }
    return (
      <Button
        className={zIndexClass}
        rightIcon={<IconPlus4 />}
        size="small"
      />
    );
  }

  return (
    <Button
      {...button}
      className={clsx(zIndexClass, button?.className)}
    >
      {button?.children}
    </Button>
  );
}

interface Props extends FileInputProps {
  previewType?: SingleFilePreviewProps['type'] | MultipleFilePreviewProps['type'];
}

const FileInput: FC<Props> = (props) => {
  const {
    title,
    description,
    button = true,
    hideIcon,
    isError,
    className,
    onChange,
    helperProps,
    disabled,
    previewType = 'default',
    ...rest
  } = props;

  const [isOnDrag, setIsOnDrag] = useState(false);
  const isGridPreview = previewType === 'grid';
  const isCompact = previewType === 'compact';

  function handleDrop(e: DragEvent<HTMLInputElement>) {
    e.preventDefault();
    setIsOnDrag(false);
    onChange(e.dataTransfer.files?.[0], e.dataTransfer.files);
  }

  const layoutClass = isCompact ? COMPACT_LAYOUT_CLASS : DEFAULT_LAYOUT_CLASS;

  let sizeClass = DEFAULT_SIZE_CLASS;
  if (isGridPreview) sizeClass = DEFAULT_GRID_SIZE_CLASS;
  else if (isCompact) sizeClass = DEFAULT_COMPACT_SIZE_CLASS;

  const baseClasses = clsx(
    'crow:relative crow:text-center crow:bg-surface crow:transition-all',
    'crow:border crow:border-gray-300 crow:border-dashed crow:rounded-xl',
    'crow:hover:ring-4 crow:hover:ring-gray-100',
    FOCUS_CLASS,
    DISABLED_CLASS,
    (isError || helperProps?.errorMessage) && ERROR_CLASS,
    isOnDrag && DRAG_CLASS,
    layoutClass,
    sizeClass,
    className,
  );

  return (
    <div className="crow:space-y-2">
      <div className={baseClasses}>
        {title && (
          <p
            className={clsx(
              isCompact
                ? 'crow:font-caption-demibold crow:line-clamp-1 crow:text-primary-500 [font-feature-settings:inherit]'
                : 'crow:font-p1-medium crow:text-primary-500 [font-feature-settings:inherit]',
            )}
          >
            {title}
          </p>
        )}

        {!isCompact && description && (
          <pre className="crow:font-caption-demibold crow:text-primary-200 [font-feature-settings:inherit]">
            {description}
          </pre>
        )}

        {button ? renderUploadButton(button, isCompact) : null}
        {!hideIcon && <FileInputIcon />}

        <input
          className="crow:!mb-0 crow:absolute crow:inset-0 crow:size-full crow:opacity-0 crow:cursor-pointer crow:disabled:cursor-not-allowed crow:z-10"
          type="file"
          onDragEnter={() => setIsOnDrag(true)}
          onDragLeave={() => setIsOnDrag(false)}
          onDrop={handleDrop}
          onChange={(e) => onChange(e.currentTarget.files?.[0], e.currentTarget.files)}
          disabled={disabled}
          {...rest}
        />
      </div>

      {!isGridPreview && Object.keys(helperProps ?? {}).length > 0 && (
        <FieldBottomInfo
          {...helperProps}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default FileInput;
