// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

import type { Auth } from "./auth";

// ✅ Cria o client baseado na config do servidor
export const authClient = createAuthClient();

// ✅ Já exporta hooks e métodos
export const { useSession, signIn, signOut } = authClient;
