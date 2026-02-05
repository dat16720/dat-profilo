import { findUserByEmail, findUserById, verifyPassword } from "@/lib/db";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null;
      name: string | null;
      vipUntil: string | null;
      role: "user" | "admin";
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await findUserByEmail(credentials.email as string);
        if (
          !user ||
          !(await verifyPassword(user, credentials.password as string))
        )
          return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          vipUntil: user.vipUntil,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      const u = user as
        | {
            id?: string;
            vipUntil?: string | null;
            role?: "user" | "admin";
          }
        | undefined;
      if (u?.id) {
        token.id = u.id;
        token.vipUntil = typeof u.vipUntil === "string" ? u.vipUntil : null;
        token.role = u.role ?? "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.id === "string" ? token.id : "";
        const uid = session.user.id;
        const user = uid ? await findUserById(uid) : null;
        session.user.vipUntil =
          user?.vipUntil ??
          (typeof token.vipUntil === "string" ? token.vipUntil : null);
        session.user.role =
          user?.role ?? (token.role === "admin" ? "admin" : "user");
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
});
