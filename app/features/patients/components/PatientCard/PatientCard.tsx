import { useState } from "react";
import { PatientCardHeader } from "./PatientCardHeader";
import { PatientCardDetails } from "./PatientCardDetails";
import type { Patient } from "../../types/patient";

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

  return (
    <article className="bg-surface border border-border rounded-xl overflow-hidden transition-colors hover:border-border-hover shadow-card hover:shadow-card-hover">
      <PatientCardHeader
        patient={patient}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
        onEdit={onEdit}
      />

      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        aria-hidden={!expanded}
      >
        <div className="overflow-hidden">
          <PatientCardDetails patient={patient} />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-center gap-1 py-2 text-xs text-text-muted border-t border-border hover:bg-surface-hover hover:text-accent transition-colors cursor-pointer"
        aria-expanded={expanded}
      >
        {expanded ? "Hide details" : "Show details"}
        <span
          className="transition-transform duration-300"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▾
        </span>
      </button>
    </article>
  );
}
