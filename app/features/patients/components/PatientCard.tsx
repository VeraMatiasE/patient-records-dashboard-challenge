import { useState } from "react";
import type { Patient } from "~/features/patients/types/patient";
import { Avatar } from "./Avatar";

interface PatientCardProps {
  patient: Patient;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onEdit: (patient: Patient) => void;
}

export function PatientCard({
  patient,
  isFavorite,
  onToggleFavorite,
  onEdit,
}: PatientCardProps) {
  const [expanded, setExpanded] = useState(false);

  const websiteHref = patient.website?.trim()
    ? patient.website.startsWith("http")
      ? patient.website
      : `https://${patient.website}`
    : null;

  return (
    <article className="bg-surface border border-border rounded-xl overflow-hidden transition-colors hover:border-border-hover shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]">
      <header className="flex items-start gap-3 p-4">
        <Avatar src={patient.avatar} name={patient.name} size="md" />

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-text truncate">
            {patient.name}
          </h3>
          <p className="text-xs text-text-muted mt-0.5">ID #{patient.id}</p>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={() => onToggleFavorite(patient.id)}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-surface-hover cursor-pointer ${
              isFavorite ? "text-warning" : "text-text-muted hover:text-warning"
            }`}
          >
            {isFavorite ? "★" : "☆"}
          </button>
          <button
            type="button"
            onClick={() => onEdit(patient)}
            aria-label="Edit patient"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-accent hover:bg-surface-hover transition-colors cursor-pointer"
          >
            ✎
          </button>
        </div>
      </header>

      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        aria-hidden={!expanded}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 border-t border-border pt-3 space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
                Description
              </p>
              <p className="text-xs text-text-secondary leading-relaxed">
                {patient.description || "No description available."}
              </p>
            </div>
            {websiteHref && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
                  Webpage
                </p>
                <a
                  href={websiteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent hover:underline"
                >
                  {patient.website}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-center gap-1 py-2 text-xs text-text-muted border-t border-border hover:bg-surface-hover hover:text-accent transition-colors cursor-pointer"
        aria-expanded={!expanded}
      >
        {expanded ? "Hide details" : "Show details"}
        <span
          className="inline-block transition-transform duration-300"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▾
        </span>
      </button>
    </article>
  );
}
