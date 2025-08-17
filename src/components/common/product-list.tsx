"use client";

import { productTable, productVariantTable } from "@/db/schema";

interface ProductListProps {
  title: string;
  products: ((typeof productTable.$inferSelect)[] & {
    variant: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const productList = ({ title, products }: ProductListProps) => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold">{title}</h3>
      {products.map((product) => (
        <productItem key={product.id}></productItem>
      ))}
    </div>
  );
};

export default productList;
