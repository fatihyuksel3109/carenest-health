import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Log initialization to confirm the file is loaded
console.log("Initializing NextAuth handler");

const handler = NextAuth({
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
          if (
            credentials?.email === "admin@carenest.com" &&
            credentials?.password === "admin123"
          ) {
            console.log("Credentials valid, returning user");
            return {
              id: "1",
              name: "Admin User",
              email: "admin@carenest.com",
              role: "admin",
            };
          }
          console.log("Credentials invalid, returning null");
          return null;
        } catch (error) {
          console.error("Error in authorize:", error);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback:", { token, user });
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback:", { session, token });
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-here", // Fallback for dev
});

// Export handlers
export { handler as GET, handler as POST };