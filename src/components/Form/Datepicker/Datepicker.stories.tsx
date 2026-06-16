import type { Meta, StoryObj } from '@storybook/react';
import { isSameDay } from 'date-fns-jalali/isSameDay';
import React, { useState } from 'react';
import { DatepickerProps } from './types';
import IconMinus4 from '../../../icons/IconMinus4';
import IconPlus4 from '../../../icons/IconPlus4';
import { fullWidthStory } from '../../../utils/storybook/helpers';

import Datepicker from '.';

const meta = {
  title: 'Components/Form/Datepicker',
  component: Datepicker,
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport Datepicker from 'crow-ui/Form/Datepicker';\nOr\nimport { Datepicker } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  beforeEach: () => fullWidthStory({ alignItems: 'flex-start', height: '550px' }),
  argTypes: {
    value: {
      table: {
        type: {
          summary: 'Date | null | {start: Date | null, end: Date | null}',
          detail: "'start' and 'end' only available if acceptRange='true'",
        },
      },
    },
    onChange: {
      table: {
        type: {
          summary: '(value: ValueType) => void',
        },
      },
    },
    onSubmit: {
      if: { arg: 'showSubmitButton', neq: true },
      table: {
        type: {
          summary: '() => void',
          detail: 'only available if showSubmitButton is not true.',
        },
      },
    },
    mode: {
      control: { type: 'select' },
      options: ['input', 'calendar'],
      table: {
        type: {
          summary: 'input | calendar',
        },
      },
    },
    popoverPosition: {
      control: 'select',
      options: [
        'top',
        'bottom',
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      description: 'Initial position of the Datepicker',
    },
  },
} satisfies Meta<typeof Datepicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const DefaultDatepickerExample = (props: DatepickerProps) => {
  const [value, setValue] = useState(new Date());

  return (
    <Datepicker
      {...props}
      acceptRange={false}
      value={value}
      onChange={setValue}
    />
  );
};

export const Default: Story = {
  args: {
    value: new Date(),
    onChange: () => {},
    popoverPosition: 'bottom',
  },
  render: (args) => <DefaultDatepickerExample {...args} />,
};

export const DisableAndHoliday: Story = {
  ...Default,
  args: {
    ...Default.args,
    highlightWeekends: true,
    disableDates: [
      new Date(new Date(Date.now() + 24 * 60 * 60 * 1000)), // Tomorrow
      new Date(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)), // Day after tomorrow
    ],
    holidays: [
      new Date(new Date(Date.now() - 24 * 60 * 60 * 1000)), // Yesterday
      new Date(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)), // Day before yesterday
    ],
  },
};

export const OpenMode: Story = {
  ...Default,
  args: {
    ...Default.args,
    onInternalDateChange: () => {},
    mode: 'calendar',
    wrapperClassName: 'crow:w-[350px] crow:shadow-2xl crow:rounded-lg',
  },
};

const RangeDatepickerExample = (props: DatepickerProps) => {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return (
    <Datepicker
      {...props}
      acceptRange
      value={value}
      onChange={setValue}
    />
  );
};

export const Range: Story = {
  args: {
    value: new Date(),
    onChange: () => {},
    inputProps: {
      placeholder: 'تاریخ موردنظر خود را انتخاب کنید',
    },
  },
  render: (args) => <RangeDatepickerExample {...args} />,
};

const DayHoverDatepickerExample = (props: DatepickerProps) => {
  const [value, setValue] = useState<Date | null>(null);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  return (
    <Datepicker
      {...props}
      acceptRange={false}
      value={value}
      onChange={setValue}
      disableDates={disabledDates}
      dayHoverAction={{
        onClick: (dayItem) => {
          setDisabledDates((prev) => {
            if (dayItem.isDisabled) {
              return prev.filter((date) => !isSameDay(date, dayItem.date));
            }
            return [...prev, dayItem.date];
          });
        },
        element: (dayItem) => (
          <span className="crow:bg-primary-500 crow:text-white crow:size-4 crow:rounded-full crow:flex crow:justify-center crow:items-center">
            {dayItem.isDisabled ? (
              <IconMinus4
                width={12}
                height={12}
              />
            ) : (
              <IconPlus4
                width={12}
                height={12}
              />
            )}
          </span>
        ),
      }}
    />
  );
};

export const DayHoverAction: Story = {
  args: {
    value: null,
    onChange: () => {},
    dayHoverAction: {
      onClick: () => {},
      element: () => null, // This will be overridden in the component
    },
    inputProps: {
      placeholder: 'تاریخ موردنظر خود را انتخاب کنید',
    },
  },
  render: (args) => <DayHoverDatepickerExample {...args} />,
};
