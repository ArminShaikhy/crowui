'use client';

import { type FC, type ReactNode } from 'react';
import Button from '../Button';
import Drawer, { type DrawerProps } from '../Drawer';

export interface ModalProps extends Omit<DrawerProps, 'position' | 'header'> {
  /** Heading text in the modal header. */
  title?: string;
  /** Subheading text below the title. */
  description?: string;
  /** Label for the confirm (primary) button. @default 'تایید' */
  confirmLabel?: string;
  /** Label for the cancel (outline) button. @default 'انصراف' */
  cancelLabel?: string;
  /** Called when the user clicks the confirm button. Renders the confirm button when provided. */
  onConfirm?: () => void;
  /** Called when the user clicks the cancel button. Renders the cancel button when provided. */
  onCancel?: () => void;
  /** Shows a loading spinner on the confirm button and disables it. @default false */
  confirmLoading?: boolean;
  /** Extra node rendered in the header's trailing area. */
  headerActionElement?: ReactNode;
  /** Aria-label for the close icon button (accessibility). */
  closeIconAriaLabel?: string;
}

const Modal: FC<ModalProps> = ({
  title,
  description,
  confirmLabel = 'تایید',
  cancelLabel = 'انصراف',
  onConfirm,
  onCancel,
  confirmLoading,
  headerActionElement,
  closeIconAriaLabel,
  onClose,
  children,
  footer,
  ...rest
}) => {
  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const resolvedFooter =
    footer !== undefined
      ? footer
      : onConfirm || onCancel
        ? {
            element: (
              <div className="crow:flex crow:gap-3 crow:justify-end crow:w-full">
                {onCancel && (
                  <Button
                    variant="outline"
                    color="gray"
                    onClick={handleCancel}
                  >
                    {cancelLabel}
                  </Button>
                )}
                {onConfirm && (
                  <Button
                    variant="primary"
                    color="primary"
                    isLoading={confirmLoading}
                    onClick={onConfirm}
                  >
                    {confirmLabel}
                  </Button>
                )}
              </div>
            ),
          }
        : undefined;

  return (
    <Drawer
      {...rest}
      position="center"
      onClose={onClose}
      header={
        title || description || headerActionElement
          ? {
              title,
              description,
              haveCloseIcon: true,
              closeIconAriaLabel,
              actionElement: headerActionElement,
            }
          : undefined
      }
      footer={resolvedFooter}
    >
      {children}
    </Drawer>
  );
};

export default Modal;
