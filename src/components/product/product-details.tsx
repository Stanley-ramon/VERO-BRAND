"use client";

import Image from "next/image";
import Link from "next/link";
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
  size: string; // ✅ agora existe
  priceInCents: number;
  imageUrl: string;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  variants: Variant[];
  subtitle?: string;
  categoryId?: string;
};

type Props = {
  product: Product;
  relatedProducts?: Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    priceInCents: number;
  }>;
};

export default function ProductDetails({ product, relatedProducts }: Props) {
  const variants = product.variants ?? [];
  const initial = variants[0];

  const colors = useMemo(() => {
    return Array.from(new Set(variants.map((v) => v.color)));
  }, [variants]);

  const sizes = useMemo(() => {
    // se quiser ordenar: P, M, G, GG
    const order = new Map([
      ["P", 1],
      ["M", 2],
      ["G", 3],
      ["GG", 4],
    ]);
    const unique = Array.from(new Set(variants.map((v) => v.size)));
    unique.sort((a, b) => (order.get(a) ?? 99) - (order.get(b) ?? 99));
    return unique;
  }, [variants]);

  const [selectedColor, setSelectedColor] = useState(colors[0] ?? "");
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "");
  const [qty, setQty] = useState(1);

  const selectedVariant = useMemo(() => {
    return (
      variants.find(
        (v) => v.color === selectedColor && v.size === selectedSize,
      ) ?? initial
    );
  }, [variants, selectedColor, selectedSize, initial]);

  const decQty = () => setQty((q) => Math.max(1, q - 1));
  const incQty = () => setQty((q) => Math.min(99, q + 1));

  if (!selectedVariant) {
    return (
      <div className="rounded-xl border p-4">
        <p className="font-medium">Produto sem variantes cadastradas.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Galeria */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-neutral-50">
            <Image
              src={selectedVariant.imageUrl}
              alt={selectedVariant.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* miniaturas por cor */}
          <div className="flex gap-3">
            {colors.slice(0, 3).map((color) => {
              const thumb =
                variants.find((v) => v.color === color)?.imageUrl ??
                selectedVariant.imageUrl;

              const active = color === selectedColor;

              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={[
                    "relative h-16 w-16 overflow-hidden rounded-2xl border transition",
                    active
                      ? "border-black"
                      : "border-transparent hover:border-neutral-300",
                  ].join(" ")}
                  aria-label={`Selecionar cor ${color}`}
                >
                  <Image
                    src={thumb}
                    alt={color}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Infos */}
        <div className="space-y-5">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{product.name}</h1>

            {product.subtitle ? (
              <p className="text-sm text-neutral-500">{product.subtitle}</p>
            ) : (
              <p className="text-sm text-neutral-500">Coleção BEWEAR</p>
            )}

            <p className="pt-2 text-xl font-semibold">
              {formatBRL(selectedVariant.priceInCents)}
            </p>
          </div>

          {/* Cor */}
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Cor: <span className="font-semibold">{selectedColor}</span>
            </p>

            <div className="flex flex-wrap gap-2">
              {colors.map((color) => {
                const active = color === selectedColor;
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={[
                      "rounded-full border px-4 py-2 text-sm transition",
                      active
                        ? "border-black bg-black text-white"
                        : "bg-white hover:bg-neutral-100",
                    ].join(" ")}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tamanho */}
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Tamanho: <span className="font-semibold">{selectedSize}</span>
            </p>

            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => {
                const active = size === selectedSize;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={[
                      "rounded-full border px-4 py-2 text-sm transition",
                      active
                        ? "border-black bg-black text-white"
                        : "bg-white hover:bg-neutral-100",
                    ].join(" ")}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantidade */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Quantidade</p>

            <div className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2">
              <button
                type="button"
                onClick={decQty}
                className="h-9 w-9 rounded-xl border bg-white text-lg hover:bg-neutral-100"
              >
                –
              </button>

              <span className="w-10 text-center text-sm font-semibold">
                {qty}
              </span>

              <button
                type="button"
                onClick={incQty}
                className="h-9 w-9 rounded-xl border bg-white text-lg hover:bg-neutral-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Botões */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              className="w-full rounded-full border px-4 py-3 text-sm font-semibold hover:bg-neutral-50"
              onClick={() => {
                alert(
                  `Adicionar à sacola: variant=${selectedVariant.id} color=${selectedColor} size=${selectedSize} qty=${qty}`,
                );
              }}
            >
              Adicionar à sacola
            </button>

            <button
              type="button"
              className="w-full rounded-full bg-black px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
              onClick={() => {
                alert(
                  `Comprar agora: variant=${selectedVariant.id} color=${selectedColor} size=${selectedSize} qty=${qty}`,
                );
              }}
            >
              Comprar agora
            </button>
          </div>

          {/* Descrição */}
          <div className="pt-2">
            <p className="text-sm leading-relaxed text-neutral-600">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Relacionados */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-sm font-semibold text-neutral-700">
            Você também pode gostar:
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} className="block">
                <div className="overflow-hidden rounded-3xl bg-neutral-50">
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    width={600}
                    height={750}
                    className="h-auto w-full object-cover"
                  />
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="line-clamp-1 text-xs text-neutral-500">
                    {p.description}
                  </p>
                  <p className="text-sm font-semibold">
                    {formatBRL(p.priceInCents)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
