"use server";

import { ID, database } from "@/appwrite/client";
import type { CreateAppointmentParams } from "@/types";
import { parseStringify } from "@/lib/utils";

import { databaseId, appointmentCollectionId } from "../env";

export async function createAppointment(appointment: CreateAppointmentParams) {
  try {
    const newAppointment = await database.createDocument(
      databaseId!,
      appointmentCollectionId!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.error(error);
  }
}
