import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setFilter } from "../store/dashboardSlice";
import type { FilterType } from "../types/dashboard";

// Gradient Calendar Icon
const GradientCalendar = ({ size = 20, active = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={active ? "url(#calendar-gradient)" : "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={active ? "" : "text-gray-500"}
  >
    <defs>
      <linearGradient id="calendar-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--color-pink-g)" />
        <stop offset="50%" stopColor="var(--color-purple-g)" />
        <stop offset="100%" stopColor="var(--color-blue-g)" />
      </linearGradient>
    </defs>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);

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

export default function Filters() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.dashboard.filter);

  const options: {
    label: string;
    value: FilterType;
    premium?: boolean;
    custom?: boolean;
  }[] = [
    { label: "1 Month", value: "1 month" },
    { label: "3 Months", value: "3 months" },
    { label: "1 Year", value: "1 year", premium: true },
    { label: "Calendar", value: "Calendar", custom: true },
  ];

  return (
    <div className="w-full rounded-2xl border-2 border-light_gray py-4 px-3 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sparko-dark-gray font-roboto font-medium text-sm">
          Time Period
        </span>
        <span className="text-sparko-dark-gray font-roboto text-[12px]">
          dd:mm:yyyy - dd:mm:yyyy
        </span>
      </div>

      {/* Options */}
      <div className="flex gap-2 flex-wrap">
        {options.map((option) => {
          const isActive = selected === option.value;
          return (
            <button
              key={option.value}
              onClick={() => dispatch(setFilter(option.value))}
              className={`px-3 py-1 rounded-2xl border transition-all flex items-center gap-2 font-roboto border-gray-200
                ${
                  isActive
                    ? "bg-gradient-to-b from-[var(--color-pink-g-12)] via-[var(--color-purple-g-12)] to-[var(--color-blue-g-12)]"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
            >
              {option.custom ? (
                <>
                  <GradientCalendar size={18} active={isActive} />
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
    </div>
  );
}
