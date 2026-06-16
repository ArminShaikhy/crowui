'use client';

import clsx from 'clsx';
import {
  type ForwardedRef,
  type InputHTMLAttributes,
  type JSX,
  type ReactNode,
  forwardRef,
  useState,
} from 'react';
import IconCloseSquare from '@/src/icons/IconCloseSquare';
import IconEye from '@/src/icons/IconEye';
import IconHide from '@/src/icons/IconHide';
import omitObject from '@/src/utils/omitObjects';
import TextFieldWrapper from '../Wrappers/TextFieldWrapper/TextFieldWrapper';
import type { TextFieldBaseProps } from '../Wrappers/TextFieldWrapper/TextFieldWrapper';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'dir' | 'prefix'>,
    TextFieldBaseProps {
  /** Icon rendered inside the field on the trailing (left in RTL) side. */
  leftIcon?: JSX.Element;
  /** Static text or node shown before the input value (e.g. currency symbol). */
  prefix?: ReactNode;
  /** Extra class names on the prefix container. */
  prefixClassName?: string;
  /** Static text or node shown after the input value (e.g. unit label). */
  postfix?: ReactNode;
  /** Extra class names on the postfix container. */
  postfixClassName?: string;
  /** When provided, renders a clear (✕) button that calls this when clicked. Requires a controlled `value`. */
  onClear?: () => void;
  /** Called on every input event. Return `true` to prevent the built-in maxLength enforcement for number inputs. */
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void | boolean;
}

const Input = forwardRef(function Input(props: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  const {
    dir = 'rtl',
    placeholderDir = dir,
    containerClassName,
    leftIcon,
    prefix,
    prefixClassName,
    postfix,
    postfixClassName,
    onClear,
    value,
    ...restProps
  } = props;
  const inputProps = omitObject(restProps, [
    'labelAddon',
    'labelContent',
    'link',
    'rightIcon',
    'isError',
    'errorMessage',
    'hintMessage',
    'wrapperClassName',
    'showMaxLength',
    'fieldSize',
  ]);

  const isError = props.isError || Boolean(props.errorMessage);

  const [type, setType] = useState(restProps.type);

  function renderClearButton() {
    return (
      <button
        onClick={() => {
          if (typeof onClear === 'function') onClear();
        }}
      >
        <IconCloseSquare
          className="crow:text-gray-600"
          width={20}
          height={20}
        />
      </button>
    );
  }

  return (
    <TextFieldWrapper
      {...props}
      containerClassName={clsx('crow:items-center', containerClassName)}
      value={value}
    >
      {prefix && (
        <div className={clsx('crow:font-p1-regular crow:text-gray-500', prefixClassName)}>
          {prefix}
        </div>
      )}
      {typeof onClear === 'function' && value && dir === 'ltr' && renderClearButton()}
      <input
        {...inputProps}
        ref={ref}
        aria-invalid={isError || undefined}
        className={clsx(
          'crow:bg-transparent crow:focus:outline-none crow:flex-1',
          dir === 'rtl' ? 'crow:text-right' : 'crow:!text-left',
          placeholderDir === 'rtl' ? 'crow:placeholder:text-right' : 'crow:placeholder:text-left',
          {
            'crow:ss02': restProps.type != 'password',
          },
          props.className,
        )}
        {...(dir === 'ltr' ? { style: { direction: 'ltr' } } : {})}
        value={value}
        type={type}
        onInput={(e) => {
          if (typeof restProps.onInput === 'function') {
            const stopExecution = restProps.onInput(e);
            if (stopExecution) return;
          }
          if (type !== 'number') return;
          const element = e.currentTarget;
          if (restProps.maxLength && element.value.length > restProps.maxLength) {
            element.value = element.value.slice(0, restProps.maxLength);
          }
        }}
      />
      {typeof onClear === 'function' && value && dir === 'rtl' && renderClearButton()}
      {postfix && (
        <div className={clsx('crow:font-p1-regular crow:text-gray-500', postfixClassName)}>
          {postfix}
        </div>
      )}
      {leftIcon && <div className="crow:text-gray-600">{leftIcon}</div>}
      {restProps.type === 'password' && (
        <button
          type="button"
          onClick={() => setType((prv) => (prv === 'text' ? 'password' : 'text'))}
          className="crow:text-gray-600"
        >
          {type === 'password' ? (
            <IconEye
              width={20}
              height={20}
            />
          ) : (
            <IconHide
              width={20}
              height={20}
            />
          )}
        </button>
      )}
    </TextFieldWrapper>
  );
});
export default Input;
