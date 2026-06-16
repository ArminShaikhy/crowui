import { addDays } from 'date-fns-jalali/addDays';
import { eachDayOfInterval } from 'date-fns-jalali/eachDayOfInterval';
import { endOfMonth } from 'date-fns-jalali/endOfMonth';
import { endOfWeek } from 'date-fns-jalali/endOfWeek';
import { endOfYear } from 'date-fns-jalali/endOfYear';
import { getDay } from 'date-fns-jalali/getDay';
import { isAfter } from 'date-fns-jalali/isAfter';
import { isBefore } from 'date-fns-jalali/isBefore';
import { isSameDay } from 'date-fns-jalali/isSameDay';
import { isSameMonth } from 'date-fns-jalali/isSameMonth';
import { isSameYear } from 'date-fns-jalali/isSameYear';
import { isWithinInterval } from 'date-fns-jalali/isWithinInterval';
import { startOfMonth } from 'date-fns-jalali/startOfMonth';
import { startOfWeek } from 'date-fns-jalali/startOfWeek';
import { subDays } from 'date-fns-jalali/subDays';
import type { DatepickerProps, DayItem } from './types';

function isDateInDateArray(datesArray: Date[], date: Date) {
  return datesArray.some((disabledDate) => isSameDay(disabledDate, date));
}

export function getYearClassName({
  year,
  value,
  startDate,
  endDate,
}: { year: Date } & DatepickerProps) {
  let className =
    'crow:rounded-full crow:py-1 crow:transition crow:hover:bg-primary-50 crow:hover:text-primary-500';
  const activeClassName = 'crow:!bg-primary-500 crow:!text-white';

  const isSelectable =
    (startDate ? isAfter(endOfYear(year), startDate) : true) &&
    (endDate ? isBefore(year, endOfYear(endDate)) : true);

  {
    if (value instanceof Date) {
      if (isSameYear(value, year)) className = `${className} ${activeClassName}`;
    } else if (value?.start && isSameYear(year, value.start))
      className = `${className} ${activeClassName}`;
  }

  if (!isSelectable) className = `${className} crow:line-through crow:pointer-events-none`;

  return className;
}

export function getMonthClassName({
  month,
  value,
  startDate,
  endDate,
}: { month: Date } & DatepickerProps) {
  let className =
    'crow:rounded-full crow:py-1 crow:transition crow:hover:bg-primary-50 crow:hover:text-primary-500';
  const activeClassName = 'crow:!bg-primary-500 crow:!text-white';

  const isSelectable =
    (startDate ? isAfter(endOfMonth(month), startDate) : true) &&
    (endDate ? isBefore(month, endOfMonth(endDate)) : true);

  if (value instanceof Date) {
    if (isSameMonth(value, month)) className = `${className} ${activeClassName}`;
  } else if (value?.start && isSameMonth(month, value.start))
    className = `${className} ${activeClassName}`;

  if (!isSelectable) className = `${className} crow:line-through crow:pointer-events-none`;

  return className;
}

export function getDaysOfCalendar(
  internalDate: Date,
  disableDates: DatepickerProps['disableDates'] = [],
  holidays: DatepickerProps['holidays'] = [],
) {
  let tempDays: DayItem[] = [];
  const endOfCurrentMonth = endOfMonth(internalDate);
  const startOfCurrentMonth = startOfMonth(internalDate);
  const daysOfMonth = eachDayOfInterval({
    start: startOfMonth(internalDate),
    end: endOfMonth(internalDate),
  }).map((date) => ({
    date,
    isInMonth: true,
    isDisabled: isDateInDateArray(disableDates, date),
    isHoliday: isDateInDateArray(holidays, date),
  }));
  const startOfMonthWeekday = getDay(startOfCurrentMonth);
  const endOfMonthWeekday = getDay(endOfCurrentMonth);

  // in jalali calendar, the week starts on Saturday (6) and ends on Friday (5)
  if (startOfMonthWeekday !== 6) {
    const daysTillStartOfWeek = eachDayOfInterval({
      start: startOfWeek(startOfCurrentMonth),
      end: subDays(startOfCurrentMonth, 1),
    }).map((date) => ({
      date,
      isInMonth: false,
      isDisabled: isDateInDateArray(disableDates, date),
      isHoliday: isDateInDateArray(holidays, date),
    }));
    tempDays = [...daysTillStartOfWeek, ...daysOfMonth];
  } else tempDays = [...daysOfMonth];

  if (endOfMonthWeekday != 5) {
    const daysTillEndOfWeek = eachDayOfInterval({
      start: addDays(endOfCurrentMonth, 1),
      end: endOfWeek(endOfCurrentMonth),
    }).map((date) => ({
      date,
      isInMonth: false,
      isDisabled: isDateInDateArray(disableDates, date),
      isHoliday: isDateInDateArray(holidays, date),
    }));
    tempDays = [...tempDays, ...daysTillEndOfWeek];
  }

  return tempDays;
}

export function getDayClassName({
  date,
  isInMonth,
  isHoliday,
  showExtraDays,
  value,
  startDate,
  endDate,
  highlightWeekends,
  dayHoverAction,
}: DayItem & DatepickerProps) {
  const isDateVisible = isInMonth || showExtraDays;
  if (!isDateVisible) return 'crow:pointer-events-none';

  const isToday = isSameDay(new Date(), date);
  const isWeekend = getDay(date) === 5;
  const isSelectable =
    (startDate ? isAfter(date, startDate) : true) && (endDate ? isBefore(date, endDate) : true);

  const activeItemClass = 'crow:!bg-primary-500 crow:!text-white crow:border-none';
  let className =
    'crow:w-full crow:py-1 crow:rounded-2xl crow:transition crow:disabled:bg-gray-200';

  if (isToday) className = `${className} crow:border crow:border-primary-300`;

  if (!isInMonth && isDateVisible) className = `${className} crow:text-gray-400`;
  else if ((isWeekend && highlightWeekends) || isHoliday)
    className = `${className} crow:!text-error-500`;
  else className = `${className} crow:text-gray-600`;

  if (!isSelectable) className = `${className} crow:line-through crow:pointer-events-none`;

  if (!dayHoverAction?.element)
    className = `${className} crow:disabled:cursor-not-allowed crow:hover:bg-primary-50 crow:not-disabled:hover:text-primary-500`;
  else
    className = `${className} crow:group-hover:bg-primary-50 crow:not-disabled:group-hover:text-primary-500`;

  if (value instanceof Date) {
    if (isSameDay(value, date)) className = `${className} ${activeItemClass}`;
  } else if (value?.start && isSameDay(value.start, date))
    className = `${className} crow:rounded-l-none ${activeItemClass}`;
  else if (value?.end && isSameDay(value.end, date))
    className = `${className} crow:rounded-r-none ${activeItemClass}`;
  else if (
    value?.start &&
    value?.end &&
    isWithinInterval(date, {
      start: value.start,
      end: value.end,
    })
  )
    className = `${className} crow:rounded-none crow:border-none crow:bg-primary-50 crow:text-primary-500`;

  return className;
}
