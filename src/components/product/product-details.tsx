"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

function formatBRL(priceInCents: number) {
  return (priceInCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

type Variant = {
  id: string;
  name: string;
  slug: string;
  color: string;
  priceInCents: number;
  imageUrl: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  slug: string;
  variants: Variant[];
};

export default function ProductDetails({ product }: { product: Product }) {
  const colors = useMemo(() => {
    const unique = new Map<string, Variant>();
    for (const v of product.variants) {
      if (!unique.has(v.color)) unique.set(v.color, v);
    }
    return Array.from(unique.keys());
  }, [product.variants]);

  const [selectedColor, setSelectedColor] = useState(colors[0] ?? "");
  const selectedVariant = useMemo(() => {
    return (
      product.variants.find((v) => v.color === selectedColor) ??
      product.variants[0]
    );
  }, [product.variants, selectedColor]);

  if (!selectedVariant) {
    return (
      <div className="rounded-xl border p-4">
        <p className="font-medium">Produto sem variantes cadastradas.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* imagem */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border">
        <Image
          src={selectedVariant.imageUrl}
          alt={selectedVariant.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* infos */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-1 text-lg font-semibold">
            {formatBRL(selectedVariant.priceInCents)}
          </p>
        </div>

        <p className="text-muted-foreground text-sm">{product.description}</p>

        {/* cor */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Cor</p>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={[
                  "rounded-full border px-4 py-2 text-sm transition",
                  color === selectedColor
                    ? "border-black bg-black text-white"
                    : "bg-white hover:bg-neutral-100",
                ].join(" ")}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* ação */}
        <button
          className="mt-4 w-full rounded-full bg-black px-4 py-3 font-semibold text-white hover:opacity-90"
          onClick={() => {
            // aqui depois você liga no carrinho (localStorage ou API)
            alert(`Adicionar variante: ${selectedVariant.id}`);
          }}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
