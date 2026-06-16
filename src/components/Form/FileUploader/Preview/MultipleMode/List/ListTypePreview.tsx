import clsx from 'clsx';
import type { FC } from 'react';
import Button from '@/src/components/Button';
import FieldBottomInfo from '@/src/components/Form/Common/FieldBottomInfo/FieldBottomInfo';
import IconDelete from '@/src/icons/IconDelete';
import IconEye from '@/src/icons/IconEye';
import type { FileType } from '../../../types';
import FilePreview from '../../FilePreview';
import type { PreviewProps } from '../../types';
import { getPreviewBorder, renderPreviewDefaultAction } from '../../utils';

const ListTypePreview: FC<PreviewProps<FileType>> = (props) => {
  const {
    files: file,
    previewClassName,
    leftButton = true,
    rightButton = true,
    exteraButton,
  } = props;
  const { status, errorMessage, hintMessage, loading, title } = file;

  const fileName = title ?? file.file?.name;
  const haveFieldBottomInfo = Boolean(errorMessage ?? hintMessage);

  return (
    <div
      className={clsx(
        'crow:flex crow:items-center crow:space-x-2 crow:w-0 crow:min-w-full',
        getPreviewBorder(loading, errorMessage ? 'error' : status),
        (!status || status === 'default') && !errorMessage && 'crow:p-1 crow:!border-gray-200',
        previewClassName,
      )}
    >
      <FilePreview
        file={file}
        className="crow:!size-[72px] crow:shrink-0"
      />
      {Boolean(fileName ?? haveFieldBottomInfo) && (
        <div className="crow:space-y-1 crow:overflow-hidden crow:w-full">
          {Boolean(fileName) && (
            <span className="crow:font-p2-medium crow:text-gray-700 crow:break-words crow:line-clamp-1">
              {fileName}
            </span>
          )}
          {haveFieldBottomInfo && (
            <FieldBottomInfo
              hintMessage={hintMessage}
              errorMessage={errorMessage}
            />
          )}
        </div>
      )}
      {(leftButton || rightButton || exteraButton) && (
        <div className="crow:flex crow:space-x-1 crow:shrink-0">
          {exteraButton && (
            <Button
              {...exteraButton}
              onClick={(e) => {
                if (typeof exteraButton.onClick === 'function') exteraButton.onClick(file, e);
              }}
            >
              {exteraButton.children}
            </Button>
          )}
          {renderPreviewDefaultAction(rightButton, file, {
            color: 'gray',
            icon: <IconEye />,
            variant: 'text',
            className: 'crow:!opacity-100',
          })}
          {renderPreviewDefaultAction(leftButton, file, {
            color: 'error',
            icon: <IconDelete />,
            variant: 'text',
            className: 'crow:!opacity-100',
          })}
        </div>
      )}
    </div>
  );
};

export default ListTypePreview;
