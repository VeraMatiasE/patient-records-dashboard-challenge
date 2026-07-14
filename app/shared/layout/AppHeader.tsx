import { Icon } from "../ui/icons/Icon";

interface AppHeaderProps {
  onAddPatient: () => void;
  favoriteCount: number;
  onOpenFavorites: () => void;
}

export function AppHeader({
  onAddPatient,
  favoriteCount,
  onOpenFavorites,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-14 flex-shrink-0 items-center justify-between border-b border-white/10 bg-primary px-6">
      <div className="flex items-center gap-2">
        <img
          src="/Logo.svg"
          alt="HealthRecords logo"
          className="h-7 w-7 object-contain"
        />
        <span className="select-none text-base font-semibold text-text-inverse">
          HealthRecords
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenFavorites}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm text-text-inverse/90 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Icon name="starFilled" className="h-4 w-4" aria-hidden="true" />
          Favorites
          {favoriteCount > 0 && (
            <span className="text-xs text-text-inverse/70">
              ({favoriteCount})
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={onAddPatient}
          className="inline-flex h-9 cursor-pointer items-center rounded-lg bg-accent-strong px-4 text-sm font-medium text-text-inverse transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          + Add patient
        </button>
      </div>
    </header>
  );
}
