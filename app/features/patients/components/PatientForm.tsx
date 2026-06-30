import { Field } from "~/shared/ui/Field";
import type { PatientFormData } from "../schemas/patient.schema";
import { usePatientForm } from "../hooks/usePatientForm";

interface PatientFormProps {
  initialValues?: PatientFormData;
  onSubmit: (data: PatientFormData) => void;
  onCancel: () => void;
}

export function PatientForm({
  initialValues,
  onSubmit,
  onCancel,
}: PatientFormProps) {
  const { form, errors, saving, setField, handleSubmit } = usePatientForm({
    initialValues,
    onSubmit,
  });

  return (
    <div className="px-5 py-4 space-y-4">
      <Field
        label="Full name"
        required
        value={form.name}
        onChange={(v) => setField("name", v)}
        error={errors.name}
      />

      <Field
        label="Description"
        required
        multiline
        value={form.description}
        onChange={(v) => setField("description", v)}
        error={errors.description}
      />

      <Field
        label="Website"
        value={form.website}
        onChange={(v) => setField("website", v)}
        error={errors.website}
        placeholder="https://example.com"
      />

      <Field
        label="Avatar URL"
        value={form.avatar}
        onChange={(v) => setField("avatar", v)}
        error={errors.avatar}
        placeholder="https://..."
      />

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="px-4 py-2 rounded-[var(--radius-button)] border border-border text-sm cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="px-4 py-2 rounded-[var(--radius-button)] bg-accent text-white text-sm font-medium cursor-pointer"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
