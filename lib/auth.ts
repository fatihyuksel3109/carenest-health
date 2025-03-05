// app/lib/auth.ts
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import clientPromise from "./mongodb";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("Authorize called with credentials:", credentials);
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials: email or password is undefined");
            return null;
          }

          console.log("Attempting to connect to MongoDB...");
          const client = await clientPromise;
          const db = client.db();
          console.log("Connected to MongoDB, querying admin...");

          const admin = await db.collection("admin").findOne({ email: credentials.email }); // Changed from "admins" to "admin"
          if (!admin) {
            console.log("Admin not found for email:", credentials.email);
            return null;
          }

          console.log("Admin found:", {
            email: admin.email,
            storedPassword: admin.password,
            providedPassword: credentials.password,
          });

          // Compare the provided password with the stored hashed password
          const isPasswordValid = await bcrypt.compare(credentials.password, admin.password);
          console.log("Password comparison result:", isPasswordValid);
          console.log("Provided password:", credentials.password);
          console.log("Stored hash:", admin.password);

          if (!isPasswordValid) {
            console.log("Invalid password for email:", credentials.email);
            return null;
          }

          console.log("Credentials valid, returning admin:", admin.email);
          return {
            id: admin._id.toString(),
            name: admin.name,
            email: admin.email,
            role: admin.role,
          } as User;
        } catch (error) {
          console.error("Error in authorize:", error);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      console.log("JWT callback:", { token, user });
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("Session callback:", { session, token });
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-here",
};