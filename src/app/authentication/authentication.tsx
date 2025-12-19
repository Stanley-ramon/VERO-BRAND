"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { signIn } from "@/lib/auth-client";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const Authentication = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "sign-in";

  return (
    <div className="mt-12 flex w-full flex-col gap-6 p-5">
      {/* Logo */}
      <Link href="/" className="flex place-self-center">
        <Image
          src="/vero-marca-registrada.svg"
          alt="VERØ"
          width={150}
          height={26.14}
        />
      </Link>

      {/* Título dinâmico */}
      <div>
        <p className="text-lg font-bold">
          {tab === "sign-in" ? "Fazer login" : "Criar conta"}
        </p>
        <p className="text-gray-600">
          {tab === "sign-in"
            ? "Escolha como você quer fazer o login"
            : "Escolha como você quer criar a conta"}
        </p>
      </div>

      {/* Botão Google */}
      <Button
        className="w-full gap-5"
        onClick={() => signIn.social({ provider: "google" })}
      >
        <Image
          src="/google-icon.svg"
          alt="Google logo"
          width={18}
          height={18}
        />
        CONTINUAR COM O GOOGLE
      </Button>

      {/* Divisor */}
      <div className="my-4 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-3 text-sm text-gray-500">ou</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Tabs controladas pelo query param */}
      <Tabs value={tab} className="w-full">
        <TabsContent value="sign-in" className="w-full">
          <SignInForm />
        </TabsContent>

        <TabsContent value="sign-up">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Authentication;
