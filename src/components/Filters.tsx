import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchDashboardData,
  setCustomRange,
  setFilter,
} from "../store/dashboardSlice";
import type { CustomRange, FilterType } from "../types/dashboard";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css
import "react-date-range/dist/theme/default.css"; // theme css

// Gradient Calendar Icon
// const GradientCalendar = ({ size = 20, active = false }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={active ? "url(#calendar-gradient)" : "currentColor"}
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={active ? "" : "text-gray-500"}
//   >
//     <defs>
//       <linearGradient id="calendar-gradient" x1="0" y1="0" x2="1" y2="1">
//         <stop offset="0%" stopColor="var(--color-pink-g)" />
//         <stop offset="50%" stopColor="var(--color-purple-g)" />
//         <stop offset="100%" stopColor="var(--color-blue-g)" />
//       </linearGradient>
//     </defs>
//     <path d="M8 2v4" />
//     <path d="M16 2v4" />
//     <rect width="18" height="18" x="3" y="4" rx="2" />
//     <path d="M3 10h18" />
//     <path d="M8 14h.01" />
//     <path d="M12 14h.01" />
//     <path d="M16 14h.01" />
//     <path d="M8 18h.01" />
//     <path d="M12 18h.01" />
//     <path d="M16 18h.01" />
//   </svg>
// );

// Gradient Crown Icon
// const GradientCrown = ({ size = 20 }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="url(#crown-gradient)"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <defs>
//       <linearGradient id="crown-gradient" x1="0" y1="0" x2="1" y2="1">
//         <stop offset="0%" stopColor="var(--color-pink-g)" />
//         <stop offset="50%" stopColor="var(--color-purple-g)" />
//         <stop offset="100%" stopColor="var(--color-blue-g)" />
//       </linearGradient>
//     </defs>
//     <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
//     <path d="M5 21h14" />
//   </svg>
// );

const options: {
  label: string;
  value: FilterType;
  premium?: boolean;
  custom?: boolean;
}[] = [
  { label: "1 Month", value: "1Month" },
  { label: "3 Months", value: "3Months" },
  { label: "1 Year", value: "1Year", premium: true },
  { label: "Calendar", value: "Calendar", custom: true },
];

// helper → compute preset ranges
function getPresetRange(type: FilterType): CustomRange {
  const end = new Date();
  const start = new Date();

  if (type === "1Month") start.setMonth(end.getMonth() - 1);
  if (type === "3Months") start.setMonth(end.getMonth() - 3);
  if (type === "1Year") start.setFullYear(end.getFullYear() - 1);

  return { start: start.toISOString(), end: end.toISOString() };
}

export default function Filters() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.dashboard.filter);
  const customRange = useAppSelector((state) => state.dashboard.customRange);

  const [showCalendar, setShowCalendar] = useState(false);
  const [tempRange, setTempRange] = useState<CustomRange | null>(null);

  const handleClick = (v: FilterType) => {
    if (v === "Calendar") {
      setShowCalendar((prev) => !prev);
    } else {
      const range = getPresetRange(v);
      dispatch(setCustomRange(range));
      dispatch(setFilter(v));
      dispatch(fetchDashboardData({ filter: v, customRange: range }));
    }
  };

  const handleRangeChange = (ranges: any) => {
    const { selection } = ranges;
    setTempRange({
      start: selection.startDate.toISOString(),
      end: selection.endDate.toISOString(),
    });
  };

  const applyRange = () => {
    if (tempRange) {
      dispatch(setCustomRange(tempRange));
      dispatch(setFilter("Calendar"));
      dispatch(
        fetchDashboardData({ filter: "Calendar", customRange: tempRange })
      );
    }
    setShowCalendar(false);
  };

  return (
    <div className="w-full rounded-2xl border-2 border-light_gray py-4 px-3 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sparko-dark-gray font-roboto font-medium text-sm">
          Time Period
        </span>
        {customRange ? (
          <span className="text-sparko-dark-gray font-roboto text-[12px]">
            {new Date(customRange.start).toLocaleDateString()} -{" "}
            {new Date(customRange.end).toLocaleDateString()}
          </span>
        ) : (
          <span className="text-sparko-dark-gray font-roboto text-[12px]">
            dd:mm:yyyy - dd:mm:yyyy
          </span>
        )}
      </div>

      {/* Options */}
      <div className="flex gap-2 flex-wrap">
        {options.map((option) => {
          const isActive = selected === option.value;
          return (
            <button
              key={option.value}
              onClick={() => handleClick(option.value)}
              className={`px-3 py-1 rounded-2xl border transition-all flex items-center gap-2 font-roboto border-gray-200
                ${
                  isActive
                    ? "bg-gradient-to-b from-[var(--color-pink-g-12)] via-[var(--color-purple-g-12)] to-[var(--color-blue-g-12)]"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
            >
              {option.custom ? (
                <>
                  <img src="/Calendar.png" alt="Calendar" />
                  <span
                    className={`${
                      isActive
                        ? "bg-gradient-to-b from-[var(--color-pink-g)] via-[var(--color-purple-g)] to-[var(--color-blue-g)] bg-clip-text text-transparent"
                        : "text-gray-600"
                    }`}
                  >
                    {option.label}
                  </span>
                </>
              ) : (
                <>
                  <span
                    className={`${
                      isActive
                        ? "bg-gradient-to-b from-[var(--color-pink-g)] via-[var(--color-purple-g)] to-[var(--color-blue-g)] bg-clip-text text-transparent"
                        : "text-gray-600"
                    }`}
                  >
                    {option.label}
                  </span>
                  {option.premium && <img src="/Crown.png" alt="Crown" />}
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Calendar */}
      {showCalendar && (
        <div className="mt-4 p-4 bg-white rounded-2xl border-2 border-light_gray">
          <DateRange
            ranges={[
              {
                startDate: tempRange
                  ? new Date(tempRange.start)
                  : customRange
                  ? new Date(customRange.start)
                  : new Date(),
                endDate: tempRange
                  ? new Date(tempRange.end)
                  : customRange
                  ? new Date(customRange.end)
                  : new Date(),
                key: "selection",
              },
            ]}
            onChange={handleRangeChange}
            moveRangeOnFirstSelection={false}
            minDate={new Date(new Date().getFullYear(), 0, 1)} // restrict to Jan 1
            maxDate={new Date(new Date().getFullYear(), 11, 31)} // restrict to Dec 31
            className="custom-calendar"
          />
          <div className="flex justify-end mt-3 gap-2">
            <button
              onClick={() => setShowCalendar(false)}
              className="px-4 py-1 rounded-lg text-sm font-medium font-roboto bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={applyRange}
              className="px-4 py-1 rounded-lg font-roboto text-sm font-medium bg-gradient-to-b from-[var(--color-pink-g)] via-[var(--color-purple-g)] to-[var(--color-blue-g)] text-white"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
