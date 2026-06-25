import type { Patient } from "../../types/patient";

export function PatientCardDetails({ patient }: { patient: Patient }) {
  const websiteHref = patient.website?.trim()
    ? patient.website.startsWith("http")
      ? patient.website
      : `https://${patient.website}`
    : null;

  return (
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
  );
}
