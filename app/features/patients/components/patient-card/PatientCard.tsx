import { forwardRef, useState } from "react";
import { PatientCardHeader } from "./PatientCardHeader";
import { PatientCardDetails } from "./PatientCardDetails";
import type { Patient } from "../../types/patient";
import { Icon } from "~/shared/ui/icons/Icon";

interface PatientCardProps {
  patient: Patient;
  isFavorite: boolean;
  highlighted: boolean;
  onToggleFavorite: (id: string) => void;
  onEdit: (patient: Patient) => void;
}

export const PatientCard = forwardRef<HTMLElement, PatientCardProps>(
  ({ patient, isFavorite, highlighted, onToggleFavorite, onEdit }, ref) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <article
        ref={ref}
        className={`bg-surface border border-border rounded-xl overflow-hidden transition-colors hover:border-border-hover shadow-card hover:shadow-card-hover ${
          highlighted ? "ring-2 ring-primary shadow-lg shadow-primary/20" : ""
        }`}
      >
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
          inert={!expanded}
        >
          <div className="overflow-hidden">
            <PatientCardDetails patient={patient} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="w-full flex items-center justify-center gap-1 py-2 bg-background text-xs text-text-secondary border-t border-border hover:bg-surface-hover hover:text-accent transition-colors cursor-pointer"
          aria-expanded={expanded}
        >
          {expanded ? "Hide details" : "Show details"}
          <Icon
            name="chevronDown"
            aria-hidden="true"
            className={`h-4 w-4 transition-transform duration-300 ${
              expanded ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </article>
    );
  },
);

PatientCard.displayName = "PatientCard";
