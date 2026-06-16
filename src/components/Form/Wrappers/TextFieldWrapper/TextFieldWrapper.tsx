'use client';
import clsx from 'clsx';
import React, { type FC, type JSX, type ReactNode } from 'react';
import FieldBottomInfo, {
  type FieldBottomInfoProps,
} from '../../Common/FieldBottomInfo/FieldBottomInfo';
import FieldLabel, { type FieldLabelProps } from '../../Common/FieldLabel/FieldLabel';

import '@/src/styles.css';

export interface TextFieldBaseProps
  extends FieldLabelProps,
    Omit<FieldBottomInfoProps, 'extraHelper'> {
  /** Extra class names on the inner input row (border + background container). */
  containerClassName?: string;
  /** Icon rendered inside the field on the leading (right in RTL) side. */
  rightIcon?: JSX.Element;
  /** Text direction for the input value. @default 'rtl' */
  dir?: 'rtl' | 'ltr';
  /** Text direction for the placeholder text. Defaults to the value of `dir`. */
  placeholderDir?: 'rtl' | 'ltr';
  /** Applies error border/ring styling when true. Also auto-set when `errorMessage` is present. */
  isError?: boolean;
  /** Extra class names on the outer label+input+hint wrapper element. */
  wrapperClassName?: string;
  /** Shows a character counter (`current/max`) when true and `maxLength` is set. @default false */
  showMaxLength?: boolean;
  /** Controls field padding. @default 'medium' */
  fieldSize?: 'small' | 'medium' | 'large';
}

interface TextFieldWrapperProps extends TextFieldBaseProps {
  maxLength?: number;
  value?: string | number | readonly string[];
  children: ReactNode;
}

const FIELD_SIZE_CLASS: Record<NonNullable<TextFieldBaseProps['fieldSize']>, string> = {
  small: 'crow:p-2',
  medium: 'crow:p-3',
  large: 'crow:p-4',
};

const TextFieldWrapper: FC<TextFieldWrapperProps> = (props) => {
  const {
    labelContent,
    link,
    containerClassName,
    rightIcon,
    isError,
    errorMessage,
    hintMessage,
    required,
    labelAddon,
    maxLength,
    disabled,
    value,
    wrapperClassName,
    showMaxLength,
    fieldSize = 'medium',
    children,
  } = props;

  const showInfo = Boolean(errorMessage || hintMessage || (maxLength && showMaxLength));
  const showLabel = Boolean(labelContent || link?.href);
  const WrapperElement = showInfo || showLabel || wrapperClassName ? 'div' : React.Fragment;

  const handleFocusInputOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const divElement = e.currentTarget;
    const inputElement = divElement.querySelector('textarea, input') as
      | HTMLTextAreaElement
      | HTMLInputElement
      | null;
    if (inputElement) inputElement.focus();
  };

  return (
    <WrapperElement {...(wrapperClassName ? { className: wrapperClassName } : {})}>
      {showLabel && (
        <FieldLabel
          disabled={disabled}
          labelContent={labelContent}
          link={link}
          required={required}
          labelAddon={labelAddon}
        />
      )}
      <div
        onClick={handleFocusInputOnClick}
        className={clsx(
          `crow:relative crow:cursor-text crow:border crow:border-solid crow:rounded-lg crow:ring-4 crow:flex crow:justify-between crow:gap-x-3 crow:bg-gray-100 crow:transition-all crow:ring-transparent crow:has-[:focus]:bg-white ${!disabled && 'crow:hover:ring-gray-50'}`,
          FIELD_SIZE_CLASS[fieldSize],
          isError || errorMessage
            ? 'crow:border-error-500 crow:has-[:focus]:ring-error-50'
            : `crow:border-transparent crow:has-[:focus]:border-primary-500 crow:has-[:focus]:ring-primary-50 ${!disabled && 'crow:hover:border-gray-300'}`,
          containerClassName,
          {
            'crow:text-gray-400': disabled,
          },
        )}
      >
        {rightIcon && <div className="crow:text-gray-600">{rightIcon}</div>}
        {children}
      </div>
      {showInfo && (
        <FieldBottomInfo
          disabled={disabled}
          errorMessage={errorMessage}
          hintMessage={hintMessage}
          extraHelper={
            maxLength &&
            showMaxLength && (
              <span className="crow:ss02">
                {value?.toString()?.length ?? 0}/{maxLength}
              </span>
            )
          }
        />
      )}
    </WrapperElement>
  );
};

export default TextFieldWrapper;
