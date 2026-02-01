import { and, eq, ilike, inArray, or } from "drizzle-orm";

import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";

type SearchProductsParams = {
  query?: string;
  page?: number;
};

const LIMIT = 8;

export async function searchProducts({
  query,
  page = 1,
}: SearchProductsParams) {
  const offset = (page - 1) * LIMIT;

  const conditions = [];

  if (query) {
    conditions.push(
      or(
        ilike(productTable.name, `%${query}%`),
        ilike(productTable.description, `%${query}%`),
        ilike(productVariantTable.color, `%${query}%`),
      ),
    );
  }

  const matched = await db
    .selectDistinct({ id: productTable.id })
    .from(productTable)
    .leftJoin(
      productVariantTable,
      eq(productVariantTable.productId, productTable.id),
    )
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(productTable.id)
    .limit(LIMIT + 1)
    .offset(offset);

  const hasNextPage = matched.length > LIMIT;
  const pageIds = matched.slice(0, LIMIT).map((x) => x.id);

  if (pageIds.length === 0) {
    return { products: [], hasNextPage: false };
  }

  const productsFromDB = await db.query.productTable.findMany({
    where: inArray(productTable.id, pageIds),
    with: { Variants: true },
  });

  const orderMap = new Map(pageIds.map((id, idx) => [id, idx]));
  productsFromDB.sort(
    (a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0),
  );

  const products = productsFromDB.map((p) => ({
    ...p,
    variants: p.Variants ?? [],
  }));

  return { products, hasNextPage };
}

export async function getProductBySlug(slug: string) {
  const product = await db.query.productTable.findFirst({
    where: eq(productTable.slug, slug),
    with: { Variants: true },
  });

  if (!product) return null;

  return {
    ...product,
    variants: product.Variants ?? [],
  };
}
