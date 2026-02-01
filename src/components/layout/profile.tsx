"use client";

import Image from "next/image";

import { signOut, useSession } from "@/lib/auth-client";

export default function Profile() {
  const { data: session, isPending, error } = useSession();

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!session) return <div>Not logged in</div>;

  return (
    <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4 shadow-md md:p-6">
      {/* Foto do usuário */}
      {session.user.image && (
        <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-gray-300 md:h-20 md:w-20">
          <Image
            src={session.user.image}
            alt="User Profile"
            width={80} // maior resolução
            height={80}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Nome/email */}
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-800 md:text-base">
          Bem vindo,
        </span>
        <span className="text-xs text-gray-600 md:text-sm">
          {session.user.email}
        </span>
      </div>

      {/* Botão de logout */}
      <button
        onClick={() => signOut()}
        className="ml-auto rounded-md bg-gray-200 px-4 py-2 text-sm transition-colors hover:bg-gray-300 md:text-base"
      >
        Sign out
      </button>
    </div>
  );
}
