import clsx from 'clsx';
import type { FC } from 'react';
import IconArrowLeft2 from '@/src/icons/IconArrowLeft2';
import { DURATION_CLASS } from './constants';
import { useSidebarContext } from './context';

const SidebarToggleButton: FC = () => {
  const { isOpen, setIsOpen } = useSidebarContext();

  return (
    <button
      type="button"
      className="crow:absolute crow:top-7 crow:left-0 crow:-translate-x-1/2 crow:p-1 crow:rounded-lg crow:border crow:border-gray-300 crow:bg-white"
      onClick={() => setIsOpen(!isOpen)}
    >
      <IconArrowLeft2
        className={clsx(
          'crow:transition-transform crow:text-primary-500',
          isOpen && 'crow:rotate-180',
          DURATION_CLASS,
        )}
        width={16}
        height={16}
      />
    </button>
  );
};

export default SidebarToggleButton;
