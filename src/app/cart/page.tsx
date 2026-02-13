"use client";

import Image from "next/image";

import { useCart } from "@/context/cart-context";

function formatBRL(value: number) {
  return (value / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function CartPage() {
  const { items, removeItem, clearCart, updateQuantity } = useCart();

  const total = items.reduce(
    (acc, item) => acc + item.priceInCents * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>Sua sacola está vazia.</p>
        <h1 className="text-3xl font-bold text-emerald-900">Today</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Sacola</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.variantId} className="flex gap-4 border-b pb-4">
            <Image
              src={item.imageUrl}
              alt={item.productName}
              width={80}
              height={80}
              className="rounded-lg"
            />

            <div className="flex-1">
              <p className="font-medium">{item.productName}</p>
              <p className="text-sm text-gray-500">{item.color}</p>
              <p className="text-sm">{formatBRL(item.priceInCents)}</p>

              <div className="mt-2 flex items-center gap-3">
                <button
                  onClick={() =>
                    updateQuantity(item.variantId, item.quantity - 1)
                  }
                  className="h-8 w-8 rounded border"
                >
                  −
                </button>

                <span className="text-sm font-medium">{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.variantId, item.quantity + 1)
                  }
                  className="h-8 w-8 rounded border"
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item.variantId)}
                  className="ml-auto text-sm text-red-500"
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>{formatBRL(total)}</span>
      </div>

      <button onClick={clearCart} className="w-full rounded-full border py-3">
        Limpar Sacola
      </button>
    </div>
  );
}
