"use client";

import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/context/cart-context";

function formatBRL(value: number) {
  return (value / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, totalItems, removeItem, updateQuantity, clearCart } =
    useCart();

  const total = items.reduce(
    (acc, item) => acc + Number(item.priceInCents) * Number(item.quantity),
    0,
  );

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`absolute top-4 right-3 bottom-4 flex w-[calc(100%-24px)] max-w-sm flex-col rounded-2xl bg-white p-4 shadow-xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-[110%]"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Sacola ({totalItems})</h2>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="rounded p-2 hover:bg-neutral-100"
          >
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-gray-500">Sua sacola está vazia.</p>
        ) : (
          <div className="flex-1 space-y-4 overflow-auto pr-1">
            {items.map((item) => (
              <div key={item.variantId} className="flex gap-3">
                <Image
                  src={item.imageUrl}
                  alt={item.productName}
                  width={64}
                  height={64}
                  className="rounded"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">{item.productName}</p>
                  <p className="text-xs text-gray-500">{item.color}</p>
                  <p className="text-sm">
                    {formatBRL(Number(item.priceInCents))}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(item.variantId, item.quantity - 1);
                      }}
                      className="h-7 w-7 rounded border"
                    >
                      −
                    </button>

                    <span className="text-sm">{item.quantity}</span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(item.variantId, item.quantity + 1);
                      }}
                      className="h-7 w-7 rounded border"
                    >
                      +
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item.variantId);
                      }}
                      className="ml-auto text-xs text-red-500"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 space-y-3 border-t pt-4">
          <div className="text-1xl flex justify-between font-bold">
            <span>Total</span>
            <span>{formatBRL(total)}</span>
          </div>

          <div className="grid gap-2">
            {/*<Link
              href="/cart"
              onClick={onClose}
              className="w-full rounded-full border py-3 text-center"
            >
              Ver sacola
            </Link>*/}

            <Link
              href="/checkout"
              onClick={onClose}
              className="w-full rounded-full bg-black py-3 text-center text-white"
            >
              Finalizar compra
            </Link>

            <Link
              href="#"
              onClick={onClose}
              className="w-full rounded-full border-1 py-3 text-center text-black"
            >
              Continuar comprando
            </Link>

            {/*{items.length > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearCart();
                }}
                className="w-full rounded-full py-3 text-sm text-gray-500 hover:bg-neutral-50"
              >
                Limpar
              </button>
            )}*/}
          </div>
        </div>
      </aside>
    </div>
  );
}
