"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogInIcon, LogOutIcon, MenuIcon, ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import CartDrawer from "@/components/cart/cart-drawer";
import { useCart } from "@/context/cart-context";
import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export const Header = () => {
  const { data: session } = authClient.useSession();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const router = useRouter();

  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const { totalItems, isCartOpen, openCart, closeCart } = useCart();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isSearchOpen &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) inputRef.current?.focus();
  }, [isSearchOpen]);

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    router.push(`/product?q=${encodeURIComponent(searchValue)}`);
    setIsSearchOpen(false);
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex-shrink-0"
        >
          <Image
            src="/vero-marca-registrada.svg"
            alt="VERØ"
            width={100}
            height={26.14}
          />
        </Link>

        <div
          ref={searchContainerRef}
          className="relative ml-auto flex items-center gap-2"
        >
          {/* SEARCH */}
          <div
            className={`flex items-center overflow-hidden rounded-md border transition-all duration-300 ease-in-out ${
              isSearchOpen
                ? "max-w-[600px] min-w-[160px] flex-1 px-2"
                : "w-[35px]"
            }`}
          >
            <button
              type="button"
              onClick={() => {
                if (isSearchOpen && searchValue) handleSearch();
                else setIsSearchOpen(true);
              }}
              className="flex h-[35px] w-[35px] items-center justify-center text-center"
            >
              <Image
                src="/icon-search (1).svg"
                alt="search"
                width={18}
                height={18}
              />
            </button>

            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className={`bg-transparent text-sm transition-all duration-300 outline-none ${
                isSearchOpen ? "ml-1 w-full opacity-100" : "w-0 opacity-0"
              }`}
            />

            {isSearchOpen && searchValue && (
              <button
                type="button"
                onClick={() => setSearchValue("")}
                className="ml-2 text-xs text-gray-500 hover:text-gray-800"
              >
                Limpar
              </button>
            )}

            {isSearchOpen && (
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="ml-1 flex h-6 w-6 items-center justify-center"
              >
                X
              </button>
            )}
          </div>

          {/* SACOLA */}
          <button
            type="button"
            onClick={openCart}
            className={`bg-primary relative rounded p-2 transition ${
              isSearchOpen ? "hidden md:flex" : "flex"
            }`}
          >
            <ShoppingBagIcon size={18} className="text-white" />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                {totalItems}
              </span>
            )}
          </button>

          <CartDrawer open={isCartOpen} onClose={closeCart} />

          {/* MENU */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={`transition ${
                  isSearchOpen ? "hidden md:inline-flex" : "inline-flex"
                }`}
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent className="rounded-l-2xl">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="px-5">
                {session?.user ? (
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 overflow-hidden rounded-full">
                        <AvatarImage src={session.user.image ?? ""} />
                        <AvatarFallback>
                          {session.user.name?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">{session.user.name}</h3>
                        <span className="text-muted-foreground block text-xs">
                          {session.user.email}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setMenuOpen(false);
                        authClient.signOut();
                      }}
                    >
                      <LogOutIcon />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <h2 className="text-[17px] font-semibold">
                      Olá. Faça seu login!
                    </h2>
                    <SheetClose asChild>
                      <Link href="/authentication">
                        <Button
                          variant="outline"
                          className="w-22 justify-center rounded-full bg-[#a5a1a1]"
                        >
                          Login <LogInIcon />
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                )}

                <div className="my-4 flex items-center justify-center">
                  <div className="w-[75%] border-t border-gray-300 bg-[#a5a1a1]" />
                </div>
              </div>

              <div className="flex flex-col justify-start px-5">
                <SheetClose asChild>
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="m-2 ml-3 flex gap-3 transition-all hover:scale-105 hover:text-gray-300"
                  >
                    <Image
                      src="/house.svg"
                      alt="home"
                      width={20}
                      height={20}
                      className="size-5"
                    />
                    Inicio
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <button
                    type="button"
                    className="m-2 ml-3 flex gap-3 transition-all hover:scale-105 hover:text-gray-300"
                  >
                    <Image
                      src="/truck.svg"
                      alt="truck"
                      width={20}
                      height={20}
                      className="size-5"
                    />
                    Meus pedidos
                  </button>
                </SheetClose>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openCart();
                  }}
                  className="m-2 ml-3 flex gap-3 transition-all hover:scale-105 hover:text-gray-300"
                >
                  <Image
                    src="/shopping-bag.svg"
                    alt="bag"
                    width={20}
                    height={20}
                    className="size-5"
                  />
                  Sacola
                </button>
              </div>

              <div className="my-4 flex items-center justify-center">
                <div className="w-[75%] border-t border-gray-300" />
              </div>

              <div className="flex justify-start px-5">
                <SheetClose asChild>
                  <Link
                    href="/product"
                    className="align-start ml-3 font-medium transition-all hover:scale-105 hover:text-gray-300"
                  >
                    Camisetas
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
};
