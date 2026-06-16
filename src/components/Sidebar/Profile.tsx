import clsx from 'clsx';
import IconArrowLeft2 from '@/src/icons/IconArrowLeft2';
import { useSidebarContext } from './context';
import { showItemsClass } from './utils';

const SidebarProfile = () => {
  const { userProfile, isOpen } = useSidebarContext();

  return (
    <a
      href={userProfile?.link ?? '#'}
      className={clsx('crow:mb-8 crow:flex crow:flex-col crow:justify-center crow:items-center', {
        'crow:pointer-events-none': !userProfile?.link,
      })}
    >
      <img
        src={userProfile?.image}
        alt={userProfile?.name ?? 'user_avatar'}
        className={clsx(
          'crow:rounded-full crow:shrink-0',
          isOpen ? 'crow:size-20' : 'crow:size-12',
        )}
      />
      <div className={clsx('crow:mt-2 crow:w-full crow:relative', showItemsClass(isOpen))}>
        <p className="crow:font-p3-medium crow:text-gray-700 crow:text-center">
          {userProfile?.name}
        </p>
        <p className="crow:font-p3-regular crow:text-gray-400 crow:text-center">
          {userProfile?.description}
        </p>
        {userProfile?.link && (
          <IconArrowLeft2 className="crow:absolute crow:top-1/2 crow:-translate-y-1/2 crow:left-0 crow:text-3xl crow:text-gray-500 crow:p-1 crow:rounded-lg crow:border crow:border-gray-200" />
        )}
      </div>
    </a>
  );
};

export default SidebarProfile;
