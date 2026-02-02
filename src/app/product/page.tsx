import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

const ProductItem = ({ product }: ProductItemProps) => {
  const firstVariant = product.variants?.[0];

  return (
    <Link href={`/product/${product.slug}`} className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-neutral-100">
        {firstVariant?.imageUrl ? (
          <Image
            src={firstVariant.imageUrl}
            alt={firstVariant.name ?? product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-500">
            Sem imagem
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="truncate text-sm font-semibold">{product.name}</p>

        {firstVariant?.priceInCents ? (
          <p className="text-sm font-semibold">
            {(firstVariant.priceInCents / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        ) : null}

        <p className="truncate text-xs text-neutral-500">
          {product.description}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
