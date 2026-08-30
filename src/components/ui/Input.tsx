import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-mono tracking-wider uppercase text-cinema-300">
            {label} {props.required && <span className="text-brand-orange">*</span>}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full bg-cinema-850 border border-white/10 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-cinema-500",
            "focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all duration-200",
            "disabled:opacity-50 disabled:bg-cinema-900",
            error && "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500",
            className
          )}
          {...props}
        />
        {hint && !error && <p className="text-[11px] text-cinema-400">{hint}</p>}
        {error && <p className="text-[11px] text-rose-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-mono tracking-wider uppercase text-cinema-300">
            {label} {props.required && <span className="text-brand-orange">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            "w-full bg-cinema-850 border border-white/10 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-cinema-500",
            "focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all duration-200 resize-y",
            "disabled:opacity-50 disabled:bg-cinema-900",
            error && "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500",
            className
          )}
          {...props}
        />
        {hint && !error && <p className="text-[11px] text-cinema-400">{hint}</p>}
        {error && <p className="text-[11px] text-rose-400">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, className, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-mono tracking-wider uppercase text-cinema-300">
            {label} {props.required && <span className="text-brand-orange">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "w-full bg-cinema-850 border border-white/10 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-cinema-500 appearance-none",
              "focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all duration-200 cursor-pointer",
              "disabled:opacity-50 disabled:bg-cinema-900",
              error && "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-cinema-900 text-white py-2">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-cinema-400">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        {hint && !error && <p className="text-[11px] text-cinema-400">{hint}</p>}
        {error && <p className="text-[11px] text-rose-400">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
