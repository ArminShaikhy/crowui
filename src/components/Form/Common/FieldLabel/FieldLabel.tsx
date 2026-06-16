import clsx from 'clsx';
import type { FC } from 'react';

export interface FieldLabelProps {
  required?: boolean;
  disabled?: boolean;
  labelContent?: string;
  labelAddon?: React.ReactNode;
  link?: {
    cnotent: string;
    href: string;
  };
}

const FieldLabel: FC<FieldLabelProps> = (props) => {
  const { link, labelContent, required, disabled, labelAddon } = props;

  return (
    <>
      <div
        className={clsx('crow:flex', {
          'crow:justify-between': labelContent && link?.href,
          'crow:mb-2': !labelAddon,
          'crow:justify-start': labelContent && !link?.href,
          'crow:justify-end': !labelContent && link?.href,
          'crow:text-gray-400': disabled,
        })}
      >
        {labelContent && (
          <label className="crow:px-0 crow:font-p2-medium crow:md:mx-0">
            {labelContent}
            {required && <span className="crow:ms-2 crow:text-error-500">*</span>}
          </label>
        )}
        {link?.href && (
          <a
            href={link.href}
            className="crow:font-button-small crow:text-primary-400"
          >
            {link.cnotent}
          </a>
        )}
      </div>
      {labelAddon}
    </>
  );
};

export default FieldLabel;
