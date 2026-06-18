import clsx from 'clsx';
import type { FC } from 'react';
import IconSearch from '@/src/icons/IconSearch';
import { DURATION_CLASS } from './constants';
import { useSidebarContext } from './context';
import { showItemsClass } from './utils';
import Input from '../Form/Input';

interface SidebarSearchInputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SidebarSearchInput: FC<SidebarSearchInputProps> = (props) => {
  const { value, onChange } = props;
  const { isOpen, searchInput } = useSidebarContext();
  return (
    <Input
      value={value}
      onChange={onChange}
      rightIcon={<IconSearch />}
      placeholder="جستجو"
      {...(typeof searchInput === 'boolean' ? {} : searchInput)}
      wrapperClassName={clsx(
        'crow:mb-8 crow:sticky crow:top-0 crow:bg-surface crow:z-10 crow:px-4',
        showItemsClass(isOpen),
        typeof searchInput === 'object' && searchInput.wrapperClassName,
        DURATION_CLASS,
      )}
    />
  );
};

export default SidebarSearchInput;
