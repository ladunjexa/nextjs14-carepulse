export const url: string = process.env.NEXT_PUBLIC_APPWRITE_URL || "https://cloud.appwrite.io/v1";

export const projectId: string = assertValue(
  process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  "NEXT_PUBLIC_APPWRITE_PROJECT_ID"
);

export const apiKey: string = assertValue(
  process.env.NEXT_PUBLIC_APPWRITE_API_KEY,
  "NEXT_PUBLIC_APPWRITE_API_KEY"
);

export const databaseId: string = assertValue(
  process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  "NEXT_PUBLIC_APPWRITE_DATABASE_ID"
);

export const storageId: string = assertValue(
  process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID,
  "NEXT_PUBLIC_APPWRITE_STORAGE_ID"
);

export const patientCollectionId: string = assertValue(
  process.env.NEXT_PUBLIC_APPWRITE_PATIENT_COLLECTION_ID,
  "NEXT_PUBLIC_APPWRITE_PATIENT_COLLECTION_ID"
);

export const doctorCollectionId: string = assertValue(
  process.env.NEXT_PUBLIC_APPWRITE_DOCTOR_COLLECTION_ID,
  "NEXT_PUBLIC_APPWRITE_DOCTOR_COLLECTION_ID"
);

export const appointmentCollectionId: string = assertValue(
  process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENT_COLLECTION_ID,
  "NEXT_PUBLIC_APPWRITE_APPOINTMENT_COLLECTION_ID"
);

function assertValue<T>(v: T | undefined, envVarName: string): T {
  if (v === undefined) {
    throw new Error(`Missing environment variable: ${envVarName}`);
  }

  return v;
}
