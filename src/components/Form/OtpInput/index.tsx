'use client';
import clsx from 'clsx';
import { useEffect, useRef, type ChangeEvent, type FC, type KeyboardEvent } from 'react';
import { persianToEnglish } from '@/src/utils/convertNumbers';
import { isBrowser } from '@/src/utils/isBrowser';
import FieldBottomInfo from '../Common/FieldBottomInfo/FieldBottomInfo';
import FieldLabel from '../Common/FieldLabel/FieldLabel';
import Input, { type InputProps } from '../Input';
import '@/src/styles.css';

export interface OtpInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  /** Number of individual input cells. @default 4 */
  inputsNumber?: number;
  /** Called with the concatenated OTP string on every keystroke. */
  onChange: (value: string) => void;
  /** Called with the final OTP string once all cells are filled. */
  onEnd?: (value: string) => void;
  /** Extra class names on the root wrapper. */
  className?: string;
  /** Extra class names on the row of input cells. */
  inputsContainerClassName?: string;
  /** Current OTP string value (controlled). */
  value: string;
}

const OtpInput: FC<OtpInputProps> = (props) => {
  const {
    inputsNumber = 4,
    onChange,
    onEnd,
    className,
    inputsContainerClassName,
    labelContent,
    hintMessage,
    errorMessage,
    isError,
    value,
    ...rest
  } = props;

  const canTriggerOnEnd = useRef(false);

  function focusOnInput(index: number) {
    if (!isBrowser()) return;
    const input = document?.getElementById(`crow:otp-input-${index}`) as HTMLInputElement;
    input?.focus();
  }

  function handleInputKeyUp(e: KeyboardEvent<HTMLInputElement>, index: number) {
    const key = [e.code, e.key];

    // Move forward if current input and key have the same value
    // because it doesn't tregger onChange in this situation
    if (value[index] && key.includes(value[index])) {
      focusOnInput(index + 1);
      return;
    }

    if (key.includes('Backspace') || key.includes('Delete')) {
      const newValues = value.split('');
      newValues[index] = '';
      if (index !== 0) {
        focusOnInput(index - 1);
      }
      onChange(newValues.join(''));
    } else if (key.includes('ArrowLeft')) {
      focusOnInput(index - 1);
    } else if (key.includes('ArrowRight')) {
      focusOnInput(index + 1);
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const currentValue = persianToEnglish(e.currentTarget.value);
    const newValues = value.split('');

    if (currentValue.length > 1) {
      currentValue.split('').forEach((char, currentIndex) => {
        if (currentIndex < inputsNumber) {
          newValues[currentIndex] = char;
        }
      });
    } else {
      newValues[index] = currentValue;
    }

    onChange(newValues.join(''));

    if (index + 1 !== inputsNumber && currentValue) {
      focusOnInput(index + 1);
    }
  }

  useEffect(() => {
    if (value.length === inputsNumber && canTriggerOnEnd.current) {
      canTriggerOnEnd.current = false;
      if (typeof onEnd === 'function') {
        onEnd(value);
      }
    } else if (value.length < inputsNumber) {
      canTriggerOnEnd.current = true;
    }
  }, [value]);

  return (
    <div className={clsx('crow:space-y-2', className)}>
      {labelContent ? <FieldLabel labelContent={labelContent} /> : null}
      <div
        className={clsx(
          'crow:flex crow:items-center crow:gap-2 crow:[direction:ltr]',
          inputsContainerClassName,
        )}
      >
        {Array.from(Array(inputsNumber).keys()).map((item, index) => (
          <Input
            key={item}
            containerClassName="crow:w-12 crow:h-12 crow:p-0"
            className="crow:w-full crow:h-full crow:!text-center crow:placeholder:!text-center"
            placeholder="-"
            autoFocus={index === 0}
            onChange={(e) => handleInputChange(e, index)}
            onKeyUp={(e) => handleInputKeyUp(e, index)}
            onFocus={(e) => e.currentTarget.select()}
            id={`crow:otp-input-${index}`}
            value={value[index] || ''}
            showMaxLength={false}
            isError={Boolean(errorMessage) || isError}
            autoComplete="off"
            //remove maxLength for first input at first (because of chrome autofill)
            maxLength={index === 0 && !Number(value.split('')[0]) ? inputsNumber : 1}
            onPaste={(e) => {
              const pastedText = e.clipboardData.getData('text');
              if (Number(pastedText)) onChange(pastedText);
            }}
            onInput={(e) => {
              const element = e.currentTarget;
              if (Number(element.value) && element.value.length > 1) return true;
              return false;
            }}
            {...rest}
          />
        ))}
      </div>
      {errorMessage || hintMessage ? (
        <FieldBottomInfo
          errorMessage={errorMessage}
          hintMessage={hintMessage}
        />
      ) : null}
    </div>
  );
};

export default OtpInput;
