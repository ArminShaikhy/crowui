import type { PickerWrapperProps } from '../Wrappers/PickerWrapper/type';

export interface IRangeDate {
  start: Date | null;
  end: Date | null;
}

interface WithSubmitButton {
  showSubmitButton?: true;
  onSubmit?: () => void;
}

interface WithoutSubmitButton {
  showSubmitButton?: false;
  onSubmit?: never;
}

export interface WithRange {
  acceptRange: true;
  value: IRangeDate;
  onChange: (value: WithRange['value']) => void;
}

interface WithoutRange {
  acceptRange?: false;
  value: Date | null;
  onChange: (value: Date) => void;
}

export type HasOrNotSubmitButton = WithSubmitButton | WithoutSubmitButton;
export type HasOrNotRange = WithRange | WithoutRange;

export enum DateTypes {
  Day,
  Month,
  Year,
}

export type DayItem = { date: Date; isInMonth: boolean; isDisabled: boolean; isHoliday: boolean };

type DatepickerPropsBase = PickerWrapperProps & {
  /** Earliest selectable date. */
  startDate?: Date;
  /** Latest selectable date. */
  endDate?: Date;
  /** Shows days from adjacent months in the calendar grid. @default false */
  showExtraDays?: boolean;
  /** Renders a "Today" quick-select button in the footer. @default false */
  showTodayButton?: boolean;
  /** Renders a confirm button; use `onSubmit` to handle confirmation. @default false */
  showSubmitButton?: boolean;
  /** Enables range selection mode (requires `WithRange` props). @default false */
  acceptRange?: boolean;
  /** Applies a distinct style to Saturday and Friday cells. @default false */
  highlightWeekends?: boolean;
  /** List of dates to mark as holidays (highlighted in red). */
  holidays?: Date[];
  /** List of dates that cannot be selected. */
  disableDates?: Date[];
  /** `'input'` shows a text field trigger; `'calendar'` renders the calendar inline. @default 'input' */
  mode?: 'input' | 'calendar';
  /** Called whenever the calendar navigates to a new internal month/year (not on value commit). */
  onInternalDateChange?: (date: Date) => void;
  /** Custom per-day hover overlay configuration. */
  dayHoverAction?: {
    /** Called when a day cell is clicked in hover-action mode. */
    onClick: (dayItem: DayItem) => void;
    /** Renders a custom overlay element for a given day cell. */
    element: (dayItem: DayItem) => React.ReactNode;
  };
};

export type DatepickerProps = DatepickerPropsBase & HasOrNotSubmitButton & HasOrNotRange;

export interface IDatepickerContext {
  dateType: DateTypes;
  setDateType: (type: DateTypes) => void;
  internalDate: Date;
  setInternalDate: (date: Date) => void;
  datepickerProps: DatepickerProps;
}

export interface ContextProviderProps {
  datepickerProps: DatepickerProps;
}
