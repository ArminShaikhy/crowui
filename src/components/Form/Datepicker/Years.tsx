import { eachYearOfInterval } from 'date-fns-jalali/eachYearOfInterval';
import { format } from 'date-fns-jalali/format';
import { startOfYear } from 'date-fns-jalali/startOfYear';
import { subYears } from 'date-fns-jalali/subYears';
import type { FC } from 'react';
import { useDatepickerContext } from './context';
import { DateTypes } from './types';
import { getYearClassName } from './utils';

const Years: FC = () => {
  const { internalDate, setDateType, setInternalDate, datepickerProps } = useDatepickerContext();

  function handleYearSelect(year: Date) {
    setInternalDate(startOfYear(year));
    setDateType(DateTypes.Month);
  }
  return (
    <div className="crow:p-3 crow:grid crow:grid-cols-3 crow:text-center crow:gap-y-3 crow:font-p3-medium crow:text-gray-600 crow:ss02">
      {eachYearOfInterval({
        start: internalDate,
        end: subYears(internalDate, 11),
      }).map((year) => (
        <button
          type="button"
          key={year.toString()}
          onClick={() => handleYearSelect(year)}
          className={getYearClassName({ year, ...datepickerProps })}
        >
          {format(year, 'yyyy')}
        </button>
      ))}
    </div>
  );
};

export default Years;
