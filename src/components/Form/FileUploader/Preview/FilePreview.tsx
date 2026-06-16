import clsx from 'clsx';
import type { FC, ReactNode, SyntheticEvent } from 'react';
import fallbackImage from './preveiwFallback.svg';
import ProgressDoughnut from '../../../Progress/Doughnut';
import { ABSOLUTE_CENTER, DEFAULT_COMPACT_SIZE_CLASS, DEFAULT_SIZE_CLASS } from '../constants';
import type { FileType } from '../types';

interface FilePreviewProps {
  children?: ReactNode;
  file: FileType;
  className?: string;
  isCompact?: boolean;
}

const FilePreview: FC<FilePreviewProps> = (props) => {
  const { file, children, className, isCompact } = props;
  const fileSrc = file.file ? URL.createObjectURL(file.file) : (file.src ?? '');

  function handleImageError(e: SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.currentTarget;
    target.src = fallbackImage;
    target.classList.add('crow:bg-gray-100');
  }

  return (
    <div
      className={clsx(
        'crow:relative crow:rounded-lg crow:overflow-hidden',
        isCompact ? DEFAULT_COMPACT_SIZE_CLASS : DEFAULT_SIZE_CLASS,
        className,
      )}
    >
      <img
        className="crow:w-full crow:h-full"
        src={fileSrc}
        alt="image-preview"
        onError={handleImageError}
      />
      <div
        className={clsx(
          'crow:transition-colors crow:absolute crow:w-full crow:h-full crow:top-0 crow:left-0',
          file.loading ? 'crow:bg-black/70' : 'crow:bg-black/50',
        )}
      >
        {typeof file.loading === 'boolean' && file.loading && (
          <div className={clsx('dot-flashing', ABSOLUTE_CENTER)} />
        )}
        {typeof file.loading === 'number' && (
          <div
            className={clsx(
              'crow:flex crow:flex-col crow:items-center crow:justify-center',
              ABSOLUTE_CENTER,
            )}
          >
            <ProgressDoughnut
              current={file.loading}
              total={100}
              color="gray"
              size={30}
              strokeSize={4}
            />
            <div className="crow:font-oveline-regular crow:text-gray-50 crow:ss02 crow:mt-1">
              {file.loading} %
            </div>
          </div>
        )}
        {!file.loading && children}
      </div>
    </div>
  );
};

export default FilePreview;
