import { tokenVerification } from "../utils/token.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

export const authenticationMiddleWare = async function (req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const [_, token] = authHeader.split(" ");

  try {
    const payload = await tokenVerification(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const ensuredAuthentication = async function (req, res, next) {
  try {
    const userID = req.user.id;
    if (!userID) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error: error });
  }
};
