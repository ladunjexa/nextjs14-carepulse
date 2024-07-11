import * as SDK from "node-appwrite";

import appwriteConfig from "./conf";

const client = new SDK.Client();

client
  .setEndpoint(appwriteConfig.url!)
  .setProject(appwriteConfig.projectId!)
  .setKey(appwriteConfig.apiKey!);

export const database = new SDK.Databases(client);
export const storage = new SDK.Storage(client);
export const messaging = new SDK.Messaging(client);
export const users = new SDK.Users(client);

export { ID } from "node-appwrite";
