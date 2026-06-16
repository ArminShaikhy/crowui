import clsx from 'clsx';
import type { ButtonProps } from '../../../Button';
import Button from '../../../Button';
import type { ActionConfig, FilePreviewProps, FileType } from '../types';

export function renderPreviewDefaultAction(
  button: FilePreviewProps['leftButton'],
  file: FileType,
  defaults?: ActionConfig,
) {
  if (!button) return null;

  return (
    <Button
      className={clsx(
        'crow:opacity-50 crow:z-10',
        defaults?.className,
        (button as ButtonProps)?.className,
      )}
      type="button"
      rightIcon={defaults?.icon}
      size="small"
      {...defaults}
      {...(typeof button === 'boolean' ? {} : button)}
      onClick={(e) => {
        if (typeof button !== 'boolean' && typeof button.onClick === 'function')
          button.onClick(file, e);
      }}
    >
      {(button as ButtonProps)?.children}
    </Button>
  );
}

export function getPreviewBorder(loading: FileType['loading'], status: FileType['status']) {
  return clsx(
    'crow:border crow:border-transparent crow:rounded-lg',
    status && status !== 'default' && 'crow:p-1',
    {
      'crow:!border-error-500': !loading && status === 'error',
      'crow:!border-warning-600': !loading && status === 'warning',
    },
  );
}
