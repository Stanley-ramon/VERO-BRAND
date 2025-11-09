"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogInIcon, LogOutIcon, MenuIcon, ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export const Header = () => {
  const { data: session } = authClient.useSession();
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <Link href="/">
        <Image
          src="/vero-marca-registrada.svg"
          alt="VERØ"
          width={100}
          height={26.14}
        ></Image>
      </Link>

      <div className="flex items-center gap-4">
        <button className="bg-primary text-primary-foreground flex items-center gap-2 rounded p-2">
          <ShoppingBagIcon size={18} className="text-white" />
        </button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon></MenuIcon>
            </Button>
          </SheetTrigger>
          <SheetContent className="rounded-l-2xl">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-5">
              {session?.user ? (
                <>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 overflow-hidden rounded-full">
                        <AvatarImage
                          src={session?.user?.image as string | undefined}
                          alt={session?.user?.name || "User"}
                          className="h-full w-full object-cover"
                        />
                        <AvatarFallback>
                          {session?.user?.name
                            ?.split(" ")
                            ?.map((n) => n[0])
                            ?.join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">
                          {" "}
                          {session?.user?.name}
                        </h3>
                        <span className="text-muted-foreground block text-xs">
                          {session?.user?.email}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => authClient.signOut()}
                    >
                      <LogOutIcon></LogOutIcon>
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <h2 className="text-[17px] font-semibold">
                    Olá. Faça seu login!
                  </h2>
                  <Button
                    className="w-22 justify-center rounded-full bg-[#a5a1a1]"
                    asChild
                    variant="outline"
                  >
                    <Link href="/authentication">
                      <span>Login</span>
                      <LogInIcon></LogInIcon>
                    </Link>
                  </Button>
                </div>
              )}
              <div className="my-4 flex items-center justify-center">
                <div className="w-[75%] border-t border-gray-300"></div>
              </div>
            </div>
            <div className="flex flex-col justify-start px-5">
              <button className="align-center m-2 ml-3 flex gap-3 text-center transition-all duration-200 hover:scale-105 hover:text-gray-300">
                <Image
                  src="/house.svg"
                  alt="home"
                  width={20}
                  height={20}
                  className="size-5"
                />{" "}
                Inicio
              </button>

              <button className="align-center m-2 ml-3 flex gap-3 text-center transition-all duration-200 hover:scale-105 hover:text-gray-300">
                <Image
                  src="/truck.svg"
                  alt="home"
                  width={20}
                  height={20}
                  className="size-5"
                />{" "}
                Meus pedidos
              </button>

              <button className="align-center m-2 ml-3 flex gap-3 text-center transition-all duration-200 hover:scale-105 hover:text-gray-300">
                <Image
                  src="/shopping-bag.svg"
                  alt="home"
                  width={20}
                  height={20}
                  className="size-5"
                />{" "}
                Sacola
              </button>
            </div>

            <div className="my-4 flex items-center justify-center">
              <div className="w-[75%] border-t border-gray-300"></div>
            </div>

            <div className="flex flex-col justify-start px-5">
              <button className="align-center ml-3 flex text-center font-medium transition-all duration-200 hover:scale-105 hover:text-gray-300">
                Camisetas
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
