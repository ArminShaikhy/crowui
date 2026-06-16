import clsx from 'clsx';
import {
  forwardRef,
  type DetailedHTMLProps,
  type ForwardedRef,
  type TextareaHTMLAttributes,
} from 'react';
import omitObject from '@/src/utils/omitObjects';
import type { TextFieldBaseProps } from '../Wrappers/TextFieldWrapper/TextFieldWrapper';
import TextFieldWrapper from '../Wrappers/TextFieldWrapper/TextFieldWrapper';

/** Props for the Textarea component. Extends all standard textarea HTML attributes and TextFieldBaseProps. */
export interface TextareaProps
  extends Omit<
      DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
      'dir' | 'onClick'
    >,
    TextFieldBaseProps {}

const Textarea = forwardRef(function Textarea(
  props: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const { dir = 'rtl', placeholderDir = dir, className, ...restProps } = props;
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
    'containerClassName',
  ]);

  return (
    <TextFieldWrapper {...props}>
      <textarea
        {...inputProps}
        ref={ref}
        className={clsx(
          'crow:bg-transparent crow:leading-normal crow:w-full crow:h-full crow:focus:outline-none crow:ss02 crow:flex-1 crow:resize-none',
          dir === 'rtl' ? 'crow:text-right' : 'crow:!text-left',
          placeholderDir === 'rtl' ? 'crow:placeholder:text-right' : 'crow:placeholder:text-left',
          className,
        )}
        rows={restProps.rows ?? 5}
      />
    </TextFieldWrapper>
  );
});

export default Textarea;
