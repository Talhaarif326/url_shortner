import { tokenVerification } from "../utils/token.js";

/**@param */
/**@param {import('express').Response} res */
/**@param {import('express').NextFunction} next */

export const authenticationMiddleWare = async function (req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
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
