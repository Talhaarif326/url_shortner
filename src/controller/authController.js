import { db } from "../config/db.js";
import { usersTable } from "../models/schema.js";
import { createHmac, randomBytes } from "node:crypto";
import { signupPostRequestBodySchema } from "../validations/request.validation.js";
import { eq } from "drizzle-orm";

export const signup = async function (req, res) {
  const validationResult = await signupPostRequestBodySchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({ errors: validationResult.error.issues });
  }

  const { firstName, lastName, email, password } = validationResult.data;

  const [existingUser] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = randomBytes(64).toString("hex");
  const hashedPasword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  const [user] = await db
    .insert(usersTable)
    .values({ firstName, lastName, email, password: hashedPasword, salt })
    .returning({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
    });
  return res.status(201).json({ message: "User created successfully", user });
};
