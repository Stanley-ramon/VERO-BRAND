import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants?: (typeof productVariantTable.$inferSelect)[];
  };
}

const ProductItem = ({ product }: ProductItemProps) => {
  const firstVariant = product.variants?.[0];

  // ✅ se não tiver variante, não deixa quebrar o build
  if (!firstVariant) {
    return (
      <Link href={`/product/${product.slug}`} className="flex flex-col gap-4">
        <div className="flex h-[100px] w-[100px] items-center justify-center rounded-3xl bg-neutral-100 text-xs text-neutral-500">
          sem foto
        </div>

        <div className="flex flex-col gap-1">
          <p className="truncate text-sm font-medium">{product.name}</p>
          <p className="text-muted-foreground truncate text-xs font-medium">
            {product.description}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/product/${product.slug}`} className="flex flex-col gap-4">
      <Image
        src={firstVariant.imageUrl}
        alt={firstVariant.name}
        width={100}
        height={100}
        className="rounded-3xl"
      />

      <div className="flex flex-col gap-1">
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product.description}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
