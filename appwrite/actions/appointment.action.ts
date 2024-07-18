"use server";

import { Query } from "node-appwrite";

import { ID, database, messaging } from "@/appwrite/client";
import type { CreateAppointmentParams, UpdateAppointmentParams } from "@/types";
import { formatDateTime, parseStringify } from "@/lib/utils";

import { databaseId, appointmentCollectionId } from "../env";
import { Appointment } from "../types";
import { revalidatePath } from "next/cache";

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

export async function getAppointment(appointmentId: string) {
  try {
    const appointment = await database.getDocument(
      databaseId!,
      appointmentCollectionId!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error(error);
  }
}

export async function getRecentAppointments() {
  try {
    const appointments = await database.listDocuments(databaseId!, appointmentCollectionId!, [
      Query.orderDesc("$createdAt"),
    ]);

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
      if (appointment.status === "scheduled") {
        acc.scheduledCount++;
      } else if (appointment.status === "pending") {
        acc.pendingCount++;
      } else if (appointment.status === "cancelled") {
        acc.cancelledCount++;
      }

      return acc;
    }, initialCounts);

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(error);
  }
}

export async function updateAppointment(params: UpdateAppointmentParams) {
  const { userId, appointmentId, appointment, type } = params;

  try {
    const updatedAppointment = await database.updateDocument(
      databaseId!,
      appointmentCollectionId!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) {
      throw new Error("Failed to update appointment");
    }

    const smsMessage = `
    Hi, It's CarePulse!
    ${
      type === "schedule"
        ? `Your appointment has been scheduled for ${formatDateTime(appointment.schedule!).dateTime} with Dr. ${appointment.primaryPhysician!}.`
        : `We regret to inform you that your appointment has been cancelled. Reason: ${appointment.cancellationReason}`
    }
    `;

    await sendSMSNotification(userId, smsMessage);

    revalidatePath("/admin");

    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error(error);
  }
}

export async function sendSMSNotification(userId: string, content: string) {
  try {
    const message = await messaging.createSms(ID.unique(), content, [], [userId]);

    return parseStringify(message);
  } catch (error) {
    console.error(error);
  }
}
