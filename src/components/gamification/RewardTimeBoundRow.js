import { format, parseISO } from "date-fns";
import CalendarPopover from "./CalendarPopover";
import CalendarIcon from "./icons/CalendarIcon";

const RewardTimeBoundRow = ({
  calendarMonth,
  enabled,
  isCalendarOpen,
  onDateChange,
  onMonthChange,
  onToggle,
  onToggleCalendar,
  selectedDate,
}) => {
  const formattedDate = selectedDate ? format(parseISO(selectedDate), "d MMM, yyyy") : "Select End Date";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <p className="font-primary text-label font-medium text-text">
          Make the reward time bound
        </p>
        <button
          aria-checked={enabled}
          aria-label="Make the reward time bound"
          className={`relative h-toggle-track w-toggle-track rounded-full transition-colors ${enabled ? "bg-primary" : "bg-track"}`}
          onClick={onToggle}
          role="switch"
          type="button"
        >
          <span
            className={`absolute top-1/2 h-toggle-thumb w-toggle-thumb -translate-y-1/2 rounded-full bg-white shadow-toggle-thumb transition-transform ${
              enabled ? "left-toggle-thumb-enabled" : "left-toggle-thumb-disabled"
            }`}
          />
        </button>
      </div>
      <p className="font-body text-caption text-text-secondary">
        Choose an end date to stop this reward automatically.
      </p>
      {enabled ? (
        <div className="relative">
          <button
            aria-expanded={isCalendarOpen}
            aria-haspopup="dialog"
            className={`flex h-control w-full items-center gap-2 rounded-field border bg-white px-3.5 text-left transition-colors ${
              isCalendarOpen ? "border-2 border-primary" : "border-border"
            }`}
            onClick={onToggleCalendar}
            type="button"
          >
            <CalendarIcon className="h-5 w-5 text-text-secondary" />
            <span
              className={`font-primary text-label ${
                selectedDate ? "text-text" : "text-muted"
              }`}
            >
              {formattedDate}
            </span>
          </button>
          {isCalendarOpen ? (
            <CalendarPopover
              calendarMonth={calendarMonth}
              onClose={onToggleCalendar}
              onMonthChange={onMonthChange}
              onSelectDate={onDateChange}
              selectedDate={selectedDate}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default RewardTimeBoundRow;
