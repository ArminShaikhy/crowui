import clsx from 'clsx';

export function getBackdropClassName(show: boolean): string {
  return clsx(
    'crow:fixed crow:inset-0 crow:z-50 crow:bg-black/40 crow:cursor-default',
    show ? 'crow:command-palette-backdrop-enter' : 'crow:command-palette-backdrop-exit',
  );
}

export function getPanelClassName(show: boolean, className?: string): string {
  return clsx(
    'crow:relative crow:flex crow:flex-col crow:w-full crow:max-w-lg crow:max-h-[28rem]',
    'crow:bg-white crow:rounded-2xl crow:shadow-xl crow:overflow-hidden',
    'crow:dark:bg-gray-800',
    show ? 'crow:command-palette-panel-enter' : 'crow:command-palette-panel-exit',
    className,
  );
}

export function getItemClassName(active: boolean, disabled?: boolean): string {
  return clsx(
    'crow:flex crow:items-center crow:gap-3 crow:px-4 crow:py-2.5 crow:rounded-lg crow:font-p2-regular crow:text-left',
    'crow:transition-colors crow:cursor-pointer',
    disabled
      ? 'crow:opacity-40 crow:cursor-not-allowed'
      : active
        ? 'crow:bg-primary-50 crow:text-primary-700 crow:dark:bg-primary-900 crow:dark:text-primary-200'
        : 'crow:text-gray-700 crow:dark:text-gray-200 crow:hover:bg-gray-100 crow:dark:hover:bg-gray-700',
  );
}
