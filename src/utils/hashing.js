import { createHmac, randomBytes } from "node:crypto";

export const hashPassword = (password) => {
  const salt = randomBytes(64).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  return { salt, password: hashedPassword };
};

export const verifyPassword = (password, storedSalt, storedHash) => {
  const hashedPassword = createHmac("sha256", storedSalt)
    .update(password)
    .digest("hex");
  return hashedPassword === storedHash;
};
