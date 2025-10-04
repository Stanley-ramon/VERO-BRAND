// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import * as schema from "@/db/schema";

// Configura o Auth com email/senha + Google
export const auth = betterAuth({
  emailAndPassword: { enabled: true },

  // 👇 Login social (Google)
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  database: drizzleAdapter(db, { provider: "pg", schema }),
  user: { modelName: "userTable" },
  session: { modelName: "sessionTable" },
  account: { modelName: "accountTable" },
});

// tipo opcional
export type Auth = typeof auth;
