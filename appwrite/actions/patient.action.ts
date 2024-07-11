import { Query } from "node-appwrite";

import { users, ID } from "@/appwrite/client";
import type { CreateUserParams } from "@/types";

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
