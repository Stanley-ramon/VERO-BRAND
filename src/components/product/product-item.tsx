import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";

interface productItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

const ProductItem = ({ product }: productItemProps) => {
  const firstVariant = product.variants[0];
  return (
    <Link href={`/product/${product.slug}`} className="flex flex-col gap-4">
      <Image
        src={firstVariant.imageUrl}
        alt={firstVariant.name}
        width={100}
        height={100}
        className="rounded-3xl"
      ></Image>
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
