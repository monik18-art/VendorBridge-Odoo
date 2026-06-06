import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", options, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 relative">
        <div className="relative w-full">
          <select
            ref={ref}
            className={`w-full h-11 pl-3.5 pr-10 bg-white border border-brand-border rounded-md font-sans text-sm text-brand-text transition-all duration-150 appearance-none cursor-pointer
              focus:border-brand-blue-start focus:ring-4 focus:ring-brand-focus-ring/25 focus:outline-none
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200
              ${error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""}
              ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom Down Arrow Chevron */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-4.5 w-4.5 text-brand-text-muted"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && (
          <span className="text-xs text-red-500 font-medium px-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
