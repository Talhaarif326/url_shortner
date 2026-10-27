import jwt from "jsonwebtoken";
import { tokenValidationSchema } from "../validations/token.validation.js";
const JWT_SECRET = process.env.JWT_SECRET;

export const createToken = async function (payload) {
  const validationResult = await tokenValidationSchema.safeParseAsync(payload);
  if (validationResult.error) {
    throw new Error({ message: validationResult.error.message });
  }
  const validatedPayload = validationResult.data;
  const token = jwt.sign(validatedPayload, JWT_SECRET, { expiresIn: "1h" });

  return token;
};

export const tokenVerification = async function (token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error({ message: "Invalid token" });
  }
};
