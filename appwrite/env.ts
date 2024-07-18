export const endpoint: string = process.env.ENDPOINT || "http://localhost:3000";
export const url: string = process.env.APPWRITE_URL || "https://cloud.appwrite.io/v1";

export const projectId: string = assertValue(
  process.env.APPWRITE_PROJECT_ID,
  "APPWRITE_PROJECT_ID"
);

export const apiKey: string = assertValue(process.env.APPWRITE_API_KEY, "APPWRITE_API_KEY");

export const databaseId: string = assertValue(
  process.env.APPWRITE_DATABASE_ID,
  "APPWRITE_DATABASE_ID"
);

export const storageId: string = assertValue(
  process.env.APPWRITE_STORAGE_ID,
  "APPWRITE_STORAGE_ID"
);

export const patientCollectionId: string = assertValue(
  process.env.APPWRITE_PATIENT_COLLECTION_ID,
  "APPWRITE_PATIENT_COLLECTION_ID"
);

export const doctorCollectionId: string = assertValue(
  process.env.APPWRITE_DOCTOR_COLLECTION_ID,
  "APPWRITE_DOCTOR_COLLECTION_ID"
);

export const appointmentCollectionId: string = assertValue(
  process.env.APPWRITE_APPOINTMENT_COLLECTION_ID,
  "APPWRITE_APPOINTMENT_COLLECTION_ID"
);

function assertValue<T>(v: T | undefined, envVarName: string): T {
  if (v === undefined) {
    throw new Error(`Missing environment variable: ${envVarName}`);
  }

  return v;
}
