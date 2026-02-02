import { notFound } from "next/navigation";

import ProductDetails from "@/components/product/product-details";
import {
  getProductBySlug,
  getRelatedProductsByCategory,
} from "@/db/queries/product";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = await getRelatedProductsByCategory({
    categoryId: product.categoryId,
    excludeProductId: product.id,
    limit: 4,
  });

  return (
    <div className="px-5 py-6">
      <ProductDetails product={product} relatedProducts={relatedProducts} />
    </div>
  );
}
