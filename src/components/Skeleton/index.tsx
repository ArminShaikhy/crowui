import clsx from 'clsx';
import type { CSSProperties, FC } from 'react';
import type { SkeletonProps } from './types';

export type { SkeletonProps } from './types';

const base = 'crow:bg-gray-200 crow:dark:bg-gray-700';

export const Skeleton: FC<SkeletonProps> = ({
  width,
  height,
  variant = 'block',
  animate = true,
  className,
}) => {
  const style: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      aria-hidden="true"
      role="presentation"
      style={style}
      className={clsx(
        base,
        animate && 'crow:animate-pulse',
        variant === 'circle' && 'crow:rounded-full',
        variant === 'block' && 'crow:rounded-md',
        variant === 'line' && 'crow:rounded crow:h-4 crow:w-full',
        className,
      )}
    />
  );
};

export const SkeletonText: FC<{ lines?: number; animate?: boolean; className?: string }> = ({
  lines = 3,
  animate = true,
  className,
}) => (
  <div className={clsx('crow:flex crow:flex-col crow:gap-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        variant="line"
        animate={animate}
        width={i === lines - 1 ? '60%' : '100%'}
      />
    ))}
  </div>
);

export const SkeletonAvatar: FC<{ size?: number; animate?: boolean; className?: string }> = ({
  size = 40,
  animate = true,
  className,
}) => (
  <Skeleton
    variant="circle"
    width={size}
    height={size}
    animate={animate}
    className={className}
  />
);

export const SkeletonCard: FC<{ animate?: boolean; className?: string }> = ({
  animate = true,
  className,
}) => (
  <div
    className={clsx(
      'crow:flex crow:flex-col crow:gap-3 crow:p-4 crow:rounded-xl crow:border crow:border-gray-200',
      className,
    )}
  >
    <Skeleton
      variant="block"
      height={160}
      animate={animate}
      className="crow:w-full"
    />
    <div className="crow:flex crow:items-center crow:gap-3">
      <SkeletonAvatar
        size={36}
        animate={animate}
      />
      <SkeletonText
        lines={2}
        animate={animate}
        className="crow:flex-1"
      />
    </div>
    <SkeletonText
      lines={3}
      animate={animate}
    />
  </div>
);
