import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, type = "text", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        <input
          ref={ref}
          type={type}
          className={`w-full h-11 px-3.5 bg-white border border-brand-border rounded-md font-sans text-sm text-brand-text placeholder-brand-text-muted transition-all duration-150
            focus:border-brand-blue-start focus:ring-4 focus:ring-brand-focus-ring/25 focus:outline-none
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""}
            ${className}`}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500 font-medium px-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
