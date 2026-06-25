interface AppHeaderProps {
  onAddPatient: () => void;
}

export function AppHeader({ onAddPatient }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-primary h-14 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-text-inverse font-semibold text-sm select-none">
          HealthRecords
        </span>
      </div>
      <button
        type="button"
        onClick={onAddPatient}
        className="bg-accent hover:bg-accent-hover text-text-inverse text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
      >
        + Add patient
      </button>
    </header>
  );
}
