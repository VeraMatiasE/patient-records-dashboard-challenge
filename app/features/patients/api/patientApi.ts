import type { Patient } from "~/features/patients/types/patient";

const API_URL = "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users";

export async function getPatients(): Promise<Patient[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch patients (${response.status})`);
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch {
    throw new Error("Invalid response from server");
  }

  if (!Array.isArray(json)) {
    throw new Error("Unexpected response format");
  }
  return json as Patient[];
}
