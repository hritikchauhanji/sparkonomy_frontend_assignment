import { useState } from "react"; // reuse your ChevronDown component
import type { InvoiceStatus } from "../types/dashboard";

const ChevronDown = ({ open, color }: { open: boolean; color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="8"
    viewBox="7 10 10 5"
    className={`transition-transform duration-200 ${
      open ? "rotate-0" : "rotate-180"
    }`}
    fill={color}
  >
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

interface StatusDropdownProps {
  value: InvoiceStatus;
  options: InvoiceStatus[];
  onChange: (status: InvoiceStatus) => void;
}

const StatusDropdown = ({ value, options, onChange }: StatusDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-max">
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 justify-between px-[15px] py-[9px] rounded-3xl text-xs font-roboto font-medium cursor-pointer text-white bg-primary"
      >
        <span>{value}</span>
        <ChevronDown open={open} color="#FFFFFF" />
      </button>

      {/* Dropdown Options */}
      {open && (
        <ul className="absolute top-full text-primary mt-1 w-full bg-pink_light border text-xs font-roboto font-medium border-light_gray rounded-2xl z-10">
          {options.map((status) => (
            <li
              key={status}
              onClick={() => {
                onChange(status);
                setOpen(false);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-light_gray"
            >
              {status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusDropdown;
