import type { PopperPosition } from '../Form/Wrappers/PickerWrapper/type';

export const DURATION_CLASS = 'crow:duration-300';
export const REMOVE_CONTAINER_TIMEOUT = 400;

export const POSITION_CLASS_NAMES: Record<PopperPosition, string> = {
  bottom: 'crow:bottom-0 crow:translate-y-[calc(100%+8px)] crow:right-0',
  'bottom-right': 'crow:bottom-0 crow:translate-y-[calc(100%+8px)] crow:left-0',
  'bottom-center':
    'crow:bottom-0 crow:translate-y-[calc(100%+8px)] crow:left-1/2 crow:-translate-x-1/2',
  'bottom-left': 'crow:bottom-0 crow:translate-y-[calc(100%+8px)] crow:right-0',
  top: 'crow:top-0 crow:-translate-y-[calc(100%+8px)] crow:right-0',
  'top-right': 'crow:top-0 crow:-translate-y-[calc(100%+8px)] crow:left-0',
  'top-center': 'crow:top-0 crow:-translate-y-[calc(100%+8px)] crow:left-1/2 crow:-translate-x-1/2',
  'top-left': 'crow:top-0 crow:-translate-y-[calc(100%+8px)] crow:right-0',
};
