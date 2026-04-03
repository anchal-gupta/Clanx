import { useEffect, useMemo, useRef } from "react";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import ArrowIcon from "./icons/ArrowIcon";

const weekLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const CalendarCaption = ({ displayMonth, canGoPrevious, canGoNext, onPrevious, onNext }) => (
  <div className="grid grid-cols-[32px_minmax(0,1fr)_32px] items-center gap-1.5 px-0 pb-2">
    <button
      aria-label="Previous month"
      className="flex h-calendar-nav w-calendar-nav items-center justify-center rounded-button border border-border bg-white text-text-secondary transition-colors hover:bg-surface-hover hover:text-text disabled:cursor-not-allowed disabled:opacity-40"
      disabled={!canGoPrevious}
      onClick={onPrevious}
      type="button"
    >
      <ArrowIcon className="h-5 w-5" direction="left" />
    </button>
    <div className="text-center font-primary text-label font-medium text-text">
      {format(displayMonth, "LLLL yyyy")}
    </div>
    <button
      aria-label="Next month"
      className="flex h-calendar-nav w-calendar-nav items-center justify-center rounded-button border border-border bg-white text-text-secondary transition-colors hover:bg-surface-hover hover:text-text disabled:cursor-not-allowed disabled:opacity-40"
      disabled={!canGoNext}
      onClick={onNext}
      type="button"
    >
      <ArrowIcon className="h-5 w-5" direction="right" />
    </button>
  </div>
);

const CalendarPopover = ({ calendarMonth, onClose, onMonthChange, onSelectDate, selectedDate }) => {
  const rootRef = useRef(null);
  const minDate = useMemo(() => startOfDay(addDays(new Date(), 1)), []);
  const selectedDateObject = selectedDate ? parseISO(selectedDate) : undefined;
  const month = useMemo(() => {
    if (calendarMonth) {
      return startOfMonth(parseISO(calendarMonth));
    }

    if (selectedDateObject) {
      return startOfMonth(selectedDateObject);
    }

    return startOfMonth(minDate);
  }, [calendarMonth, minDate, selectedDateObject]);

  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 0 });
    const days = [];
    let current = start;

    while (current <= end) {
      days.push(current);
      current = addDays(current, 1);
    }

    return days;
  }, [month]);

  const canGoPrevious = useMemo(
    () => startOfMonth(month) > startOfMonth(minDate),
    [minDate, month],
  );
  const canGoNext = true;

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handlePrevious = () => {
    if (!canGoPrevious) {
      return;
    }

    onMonthChange(subMonths(month, 1));
  };

  const handleNext = () => {
    onMonthChange(addMonths(month, 1));
  };

  return (
    <div
      className="absolute left-0 top-full z-40 mt-2 w-calendar rounded-tooltip border border-border bg-white p-2 shadow-popup"
      ref={rootRef}
    >
      <CalendarCaption
        canGoNext={canGoNext}
        canGoPrevious={canGoPrevious}
        displayMonth={month}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      <div className="grid grid-cols-7 px-0.5">
        {weekLabels.map((label) => (
          <div
            className="flex h-7 items-center justify-center font-body text-caption font-normal text-text-secondary"
            key={label}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-y-2">
        {calendarDays.map((day) => {
          const isOutsideMonth = !isSameMonth(day, month);
          const isDisabled = isOutsideMonth || isBefore(day, minDate);
          const isSelected = selectedDateObject ? isSameDay(day, selectedDateObject) : false;

          return (
            <button
              aria-disabled={isDisabled}
              className={`flex h-calendar-cell w-calendar-cell items-center justify-center rounded-calendar-cell font-body text-caption font-normal leading-[1.4] transition-colors ${
                isSelected
                  ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  : isDisabled
                    ? "cursor-not-allowed text-muted opacity-40"
                    : "text-text hover:bg-magenta-3"
              }`}
              disabled={isDisabled}
              key={day.toISOString()}
              onClick={() => {
                if (isDisabled) {
                  return;
                }

                onSelectDate(day);
                onClose();
              }}
              type="button"
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
      {selectedDate ? <div className="sr-only">Selected date {format(selectedDateObject, "d MMM, yyyy")}</div> : null}
    </div>
  );
};

export default CalendarPopover;
