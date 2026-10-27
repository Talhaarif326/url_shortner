import { shortenPostRequestBodySchema } from "../validations/request.validation.js";
import { nanoid } from "nanoid";
import { db } from "../config/db.js";
import { urlsTable } from "../models/index.js";
import { eq } from "drizzle-orm";
import { insertUrlInDb, getAllTheUrls } from "../services/url.service.js";
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

export const createShortUrl = async function (req, res) {
  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({
      error: validationResult.error.issues,
    });
  }
  const { url, shortCode } = validationResult.data;

  const generatedShortCode = shortCode || nanoid(8);

  const result = await insertUrlInDb(url, generatedShortCode, req.user.id);

  return res.status(201).json({ result });
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const getShortUrl = async function (req, res) {
  const shortCode = req.params.shortCode;

  if (!shortCode) {
    return res.status(400).json({
      error: "Short code is required",
    });
  }

  const [result] = await db
    .select({
      originalUrl: urlsTable.originalUrl,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, shortCode));
  if (!result) {
    return res.status(404).json({
      error: "URL not found",
    });
  }

  return res.redirect(result.originalUrl);
};

export const getUserUrls = async function (req, res) {
  const userId = req.user.id;

  const userUrls = await getAllTheUrls(userId);
  if (!userUrls.length) {
    return res.status(404).json({
      error: "No URLs found for this user",
    });
  }
  return res.status(200).json({ urls: userUrls });
};
