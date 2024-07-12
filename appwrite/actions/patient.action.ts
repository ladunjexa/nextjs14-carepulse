"use server";

import { Query } from "node-appwrite";

import { users, ID, storage, database } from "@/appwrite/client";
import type { CreateUserParams, RegisterUserParams } from "@/types";
import { parseStringify } from "@/lib/utils";

import { InputFile } from "node-appwrite/file";
import { databaseId, url, patientCollectionId, projectId, storageId } from "../env";

export async function createUser(user: CreateUserParams) {
  try {
    const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name);

    if (!newUser) {
      throw new Error("Failed to create user");
    }

    return newUser;
  } catch (error) {
    if (error && (error as { code?: number }).code === 409) {
      const existingUser = await users.list([Query.equal("email", [user.email])]);

      return existingUser?.users[0];
    } else console.error(error);
  }
}

export async function getUser(userId: string) {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(error);
  }
}

export async function registerPatient({ identificationDocument, ...patient }: RegisterUserParams) {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );

      file = await storage.createFile(storageId, ID.unique(), inputFile);
    }

    const newPatient = await database.createDocument(databaseId, patientCollectionId, ID.unique(), {
      identificationDocumentId: file?.$id || null,
      identificationDocumentUrl: `${url}/storage/buckets/${storageId}/files/${file?.$id}/view?project=${projectId}`,
      ...patient,
    });

    return parseStringify(newPatient);
  } catch (error) {
    console.error(error);
  }
}
