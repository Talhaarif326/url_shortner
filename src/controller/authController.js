import {
  signupPostRequestBodySchema,
  loginPostRequestBodySchema,
} from "../validations/request.validation.js";
import { getUserByEmail, insertUserInDb } from "../services/user.service.js";
import { hashPassword, verifyPassword } from "../utils/hashing.js";
import { createToken } from "../utils/token.js";

export const signup = async function (req, res) {
  const validationResult = await signupPostRequestBodySchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({ errors: validationResult.error.issues });
  }

  const { firstName, lastName, email, password } = validationResult.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const { salt, password: hashedPassword } = hashPassword(password);

  const user = await insertUserInDb(
    firstName,
    lastName,
    email,
    hashedPassword,
    salt,
  );

  return res.status(201).json({ message: "User created successfully", user });
};

export const login = async function (req, res) {
  const validationResult = await loginPostRequestBodySchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({ errors: validationResult.error.issues });
  }
  const { email, password } = validationResult.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordCorrect = verifyPassword(
    password,
    existingUser.salt,
    existingUser.password,
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "password is wrong" });
  }
  const payload = {
    id: existingUser.id,
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    email: existingUser.email,
  };
  const token = await createToken(payload);
  return res.status(200).json({ message: "Login successful", token });
};
