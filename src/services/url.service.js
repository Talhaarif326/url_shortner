import { db } from "../config/db.js";
import { urlsTable } from "../models/index.js";
import { eq } from "drizzle-orm";
export const insertUrlInDb = async function (orignalUrl, shortCode, userId) {
  const [result] = await db
    .insert(urlsTable)
    .values({
      originalUrl: orignalUrl,
      shortCode: shortCode,
      userId: userId,
    })
    .returning({
      userId: urlsTable.userId,
      targetUrl: urlsTable.originalUrl,
      shortCode: urlsTable.shortCode,
    });
  return result;
};

export const getAllTheUrls = async function (userID) {
  const urls = await db
    .select()
    .from(urlsTable)
    .where(eq(urlsTable.userId, userID));

  return urls;
};
