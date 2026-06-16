'use client';

import { type FC, useMemo, useRef, useState } from 'react';
import { debounce } from '@/src/utils/debounce';
import { useTimePickerContext } from './context';
import TimeInputs from './TimeInputs';
import TimeScrollWheels from './TimeScrollWheels';
import type { IRangeDate } from '../types/DateAndTimePicker';

const Body: FC = () => {
  const { timePickerProps } = useTimePickerContext();
  const { acceptRange, value, onChange } = timePickerProps;
  const [activePart, setActivePart] = useState<'start' | 'end'>('start');

  const latestRef = useRef({ acceptRange, value, onChange });
  latestRef.current = { acceptRange, value, onChange };

  const setTime = (date: Date, hour: number, minute: number): Date => {
    const newDate = new Date(date);
    newDate.setHours(hour);
    newDate.setMinutes(minute);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate;
  };

  const handleSingleTimeChange = useMemo(
    () =>
      debounce((hour: number, minute: number) => {
        const { value, onChange, acceptRange } = latestRef.current;
        if (!value || acceptRange) return;
        const singleValue = value as Date;
        if (singleValue.getHours() === hour && singleValue.getMinutes() === minute) return;
        (onChange as (v: Date) => void)(setTime(singleValue, hour, minute));
      }, 200),
    [],
  );

  const handleRangeTimeChange = useMemo(
    () =>
      debounce((part: 'start' | 'end', hour: number, minute: number) => {
        const { value, onChange, acceptRange } = latestRef.current;
        if (!value || !acceptRange) return;
        const rangeValue = value as IRangeDate;
        const current = new Date(rangeValue[part] ?? new Date());
        if (current.getHours() === hour && current.getMinutes() === minute) return;
        (onChange as (v: IRangeDate) => void)({
          ...rangeValue,
          [part]: setTime(current, hour, minute),
        });
      }, 200),
    [],
  );

  const componentsCommonProps = { timePickerProps, handleSingleTimeChange, handleRangeTimeChange };

  return (
    <div
      dir="rtl"
      className="crow:p-4 crow:ss02"
    >
      <TimeInputs
        setActivePart={setActivePart}
        {...componentsCommonProps}
      />

      <TimeScrollWheels
        activePart={activePart}
        {...componentsCommonProps}
      />
    </div>
  );
};

export default Body;
