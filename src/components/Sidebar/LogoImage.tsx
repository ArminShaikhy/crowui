import clsx from 'clsx';
import { type FC } from 'react';
import { useSidebarContext } from './context';

const SidebarLogoImage: FC = () => {
  const { isOpen, logo } = useSidebarContext();
  return (
    <div className="crow:flex crow:justify-center crow:items-center crow:mb-8">
      <img
        {...logo}
        alt={logo?.alt ?? 'Logo'}
        src={isOpen ? logo?.open : logo?.close}
        className={clsx('crow:h-12 crow:w-full', logo?.className)}
      />
    </div>
  );
};

export default SidebarLogoImage;
