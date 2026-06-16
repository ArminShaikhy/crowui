import { format } from 'date-fns-jalali/format';
import { isBefore } from 'date-fns-jalali/isBefore';
import { isSameDay } from 'date-fns-jalali/isSameDay';
import { Fragment, type FC } from 'react';
import { useDatepickerContext } from './context';
import { getDayClassName, getDaysOfCalendar } from './utils';

const SHORT_WEEK_DAYS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

const Days: FC = () => {
  const { internalDate, datepickerProps } = useDatepickerContext();
  const { showExtraDays, onChange, acceptRange, value, disableDates, holidays, dayHoverAction } =
    datepickerProps;
  const daysOfCalendar = getDaysOfCalendar(internalDate, disableDates, holidays);
  const haveAction = Boolean(dayHoverAction?.onClick && dayHoverAction?.element);

  const DayWrapper = haveAction ? 'div' : Fragment;

  function handleChange(date: Date) {
    if (acceptRange) {
      if (value.start && isSameDay(value.start, date)) return;
      if ((value.start && !value.end && isBefore(date, value.start)) || !value.start || value.end)
        onChange({ start: date, end: null });
      else
        onChange({
          start: value.start,
          end: date,
        });
    } else onChange(date);
  }

  return (
    <>
      <div className="crow:bg-gray-50 crow:p-3 crow:font-button-small crow:text-gray-600 crow:text-center crow:grid crow:grid-rows-1 crow:grid-cols-7">
        {SHORT_WEEK_DAYS.map((weekDay) => (
          <span key={weekDay}>{weekDay}</span>
        ))}
      </div>
      <div className="crow:grid crow:grid-cols-7 crow:text-center crow:font-p3-medium crow:ss02 crow:p-3 crow:gap-y-2">
        {daysOfCalendar.map((dayItem) => (
          <DayWrapper
            key={dayItem.date.toString()}
            {...(haveAction ? { className: 'crow:group crow:relative' } : {})}
          >
            {haveAction && (dayItem.isInMonth || showExtraDays) && (
              <button
                type="button"
                className="crow:absolute crow:top-0 crow:right-0 crow:-translate-y-1/2 crow:opacity-0 crow:group-hover:opacity-100 crow:transition-opacity"
                onClickCapture={(e) => {
                  e.stopPropagation();
                  dayHoverAction!.onClick(dayItem);
                }}
              >
                {dayHoverAction!.element(dayItem)}
              </button>
            )}
            <button
              type="button"
              className={getDayClassName({ ...dayItem, ...datepickerProps })}
              onClick={() => handleChange(dayItem.date)}
              disabled={dayItem.isDisabled}
            >
              {dayItem.isInMonth || showExtraDays ? format(dayItem.date, 'd') : ''}
            </button>
          </DayWrapper>
        ))}
      </div>
    </>
  );
};

export default Days;
