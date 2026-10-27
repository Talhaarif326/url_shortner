import { db } from "../config/db.js";
import { usersTable } from "../models/index.js";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email) => {
  const [user] = await db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      password: usersTable.password,
      salt: usersTable.salt,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));
  return user;
};

export const insertUserInDb = async (
  firstName,
  lastName,
  email,
  password,
  salt,
) => {
  const [user] = await db
    .insert(usersTable)
    .values({ firstName, lastName, email, password, salt })
    .returning({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
    });
  return user;
};
