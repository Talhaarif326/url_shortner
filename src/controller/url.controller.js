import { shortenPostRequestBodySchema } from "../validations/request.validation.js";
import { nanoid } from "nanoid";
import { db } from "../config/db.js";
import { urlsTable } from "../models/index.js";

import { insertUrlInDb } from "../services/url.service.js";

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
