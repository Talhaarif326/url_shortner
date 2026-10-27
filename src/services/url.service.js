import { db } from "../config/db.js";
import { urlsTable } from "../models/index.js";

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
