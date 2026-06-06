import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="font-sans text-xs font-medium text-brand-text/90 px-0.5 select-none"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={`w-full min-h-[96px] p-3.5 bg-white border border-brand-border rounded-md font-sans text-sm text-brand-text placeholder-brand-text-muted resize-y transition-all duration-150
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

Textarea.displayName = "Textarea";
export default Textarea;
