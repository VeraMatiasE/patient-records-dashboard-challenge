import { useId } from "react";

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  multiline?: boolean;
  type?: string;
}

export function Field({
  label,
  value,
  onChange,
  required,
  error,
  placeholder,
  multiline,
  type = "text",
}: FieldProps) {
  const inputId = useId();

  const baseClass =
    "w-full px-3 py-2 border rounded-[var(--radius-button)] text-sm text-text bg-surface outline-none transition placeholder:text-text-muted";
  const stateClass = error
    ? "border-danger focus:ring-1 focus:ring-danger"
    : "border-border focus:border-accent focus:ring-1 focus:ring-accent";

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-xs font-medium text-text-secondary mb-1.5"
      >
        {label}
        {required && <span className="text-danger ml-0.5">*</span>}
      </label>

      {multiline ? (
        <textarea
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={`${baseClass} ${stateClass} resize-none`}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${baseClass} ${stateClass}`}
        />
      )}

      {error && (
        <p className="text-xs text-danger mt-1 flex items-center gap-1">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  );
}
