import { useEffect, useState } from "react";
import { IconButton } from "./buttons/IconButton";
import { Icon } from "./icons/Icon";

interface SearchInputProps {
  value: string;
  placeholder?: string;
  onSearch: (value: string) => void;
}

export function SearchInput({
  value,
  placeholder = "",
  onSearch,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onSearch(inputValue.trim());
    }
  }

  function handleClear() {
    setInputValue("");
    onSearch("");
  }

  return (
    <div className="relative flex-1 min-w-40">
      <label htmlFor="patient-search" className="sr-only">
        Search patients
      </label>

      <Icon
        name="search"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
        aria-hidden="true"
      />

      <input
        id="patient-search"
        type="search"
        value={inputValue}
        placeholder={placeholder}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full rounded-[var(--radius-button)] border border-border bg-surface py-2.5 pl-8 pr-10 text-sm text-text outline-none transition hover:border-border-hover placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
      />

      {inputValue && (
        <IconButton
          icon={<Icon name="x" className="w-4 h-4" />}
          ariaLabel="Clear search"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text"
        />
      )}
    </div>
  );
}
