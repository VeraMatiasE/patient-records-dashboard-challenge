import { useState } from "react";
import { patientSchema, type PatientFormData } from "../schemas/patient.schema";

type FormErrors = Partial<Record<keyof PatientFormData, string>>;

interface UsePatientFormParams {
  initialValues?: PatientFormData;
  onSubmit: (data: PatientFormData) => void;
}

export function usePatientForm({
  initialValues,
  onSubmit,
}: UsePatientFormParams) {
  const [form, setForm] = useState<PatientFormData>(
    initialValues ?? {
      name: "",
      description: "",
      website: "",
      avatar: "",
    },
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  function setField(key: keyof PatientFormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function validate(): boolean {
    const result = patientSchema.safeParse(form);

    if (result.success) {
      setErrors({});
      return true;
    }

    const formatted: FormErrors = {};

    result.error.issues.forEach((issue) => {
      const key = issue.path[0] as keyof PatientFormData;
      formatted[key] = issue.message;
    });

    setErrors(formatted);
    return false;
  }

  async function handleSubmit() {
    if (!validate()) return;

    setSaving(true);

    try {
      onSubmit(form);
    } finally {
      setSaving(false);
    }
  }

  function reset() {
    setForm(
      initialValues ?? {
        name: "",
        description: "",
        website: "",
        avatar: "",
      },
    );
    setErrors({});
  }

  return {
    form,
    errors,
    saving,
    setField,
    handleSubmit,
    reset,
  };
}
