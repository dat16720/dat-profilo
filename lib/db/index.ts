import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { UserModel } from "./models/User";
import { dbConnect } from "./mongodb";

import type { UserRole } from "./models/User";

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  name: string | null;
  avatarUrl: string | null;
  vipUntil: string | null;
  role: UserRole;
};

type UserLean = {
  _id: mongoose.Types.ObjectId;
  email: string;
  passwordHash: string;
  name?: string | null;
  avatarUrl?: string | null;
  vipUntil?: Date | null;
  role?: UserRole;
};

function docToUser(doc: UserLean): User {
  return {
    id: doc._id.toString(),
    email: doc.email,
    passwordHash: doc.passwordHash,
    name: doc.name ?? null,
    avatarUrl: doc.avatarUrl ?? null,
    vipUntil: doc.vipUntil
      ? doc.vipUntil instanceof Date
        ? doc.vipUntil.toISOString()
        : String(doc.vipUntil)
      : null,
    role: doc.role === "admin" ? "admin" : "user",
  };
}

export async function createUser(data: {
  email: string;
  password: string;
  name?: string;
}): Promise<User> {
  await dbConnect();
  const passwordHash = await bcrypt.hash(data.password, 10);
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const role =
    adminEmail && data.email.toLowerCase() === adminEmail ? "admin" : "user";
  const doc = await UserModel.create({
    email: data.email.toLowerCase(),
    passwordHash,
    name: data.name ?? null,
    vipUntil: null,
    role,
  });
  return docToUser(doc.toObject() as UserLean);
}

export async function findUserByEmail(email: string): Promise<User | null> {
  await dbConnect();
  const doc = (await UserModel.findOne({
    email: email.toLowerCase(),
  }).lean()) as UserLean | null;
  if (!doc) return null;
  return docToUser(doc);
}

export async function findUserById(id: string): Promise<User | null> {
  await dbConnect();
  const doc = (await UserModel.findById(id).lean()) as UserLean | null;
  if (!doc) return null;
  return docToUser(doc);
}

export async function verifyPassword(
  user: User,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, user.passwordHash);
}

export async function setVipUntil(
  userId: string,
  until: string
): Promise<void> {
  await dbConnect();
  await UserModel.updateOne(
    { _id: userId },
    { $set: { vipUntil: new Date(until) } }
  );
}

export async function setUserRole(
  userId: string,
  role: UserRole
): Promise<void> {
  await dbConnect();
  await UserModel.updateOne({ _id: userId }, { $set: { role } });
}

export async function updateUserProfile(
  userId: string,
  data: { name?: string | null; avatarUrl?: string | null }
): Promise<void> {
  await dbConnect();
  const update: Record<string, unknown> = {};
  if (data.name !== undefined) update.name = data.name;
  if (data.avatarUrl !== undefined) update.avatarUrl = data.avatarUrl;
  if (Object.keys(update).length === 0) return;
  await UserModel.updateOne({ _id: userId }, { $set: update });
}
