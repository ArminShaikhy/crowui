import clsx from 'clsx';
import type { FC } from 'react';
import { useStepperContext } from './context';
import type { HorizontalStepperStepStatus } from './type';
import { getStepStatus } from './utils';

interface ConnectorProps {
  index: number;
}

const connectorStatusClassnameMap: Record<HorizontalStepperStepStatus, string> = {
  complete: 'crow:bg-teal-500 crow:opacity-100',
  current: 'crow:bg-gray-300 crow:opacity-75',
  incomplete: 'crow:bg-gray-200 crow:opacity-50',
};

const Connector: FC<ConnectorProps> = ({ index }) => {
  const { activeStep, stepOrientation } = useStepperContext();
  const status = getStepStatus(activeStep, index - 1);

  return (
    <div
      className={clsx(
        'crow:flex crow:min-w-5 crow:items-center crow:w-full',
        stepOrientation === 'vertical' ? 'crow:h-10' : 'crow:h-15',
      )}
    >
      <div
        className={clsx(
          'crow:h-0.5 crow:w-full crow:rounded-md',
          connectorStatusClassnameMap[status],
        )}
      />
    </div>
  );
};

export default Connector;
