import { and, eq, ilike, or } from "drizzle-orm";

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

  const rows = await db
    .selectDistinct({
      id: productTable.id,
      name: productTable.name,
      description: productTable.description,
    })
    .from(productTable)
    .leftJoin(
      productVariantTable,
      eq(productVariantTable.productId, productTable.id),
    )
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(productTable.id) // 🔑 MUITO IMPORTANTE
    .limit(LIMIT + 1)
    .offset(offset);

  const hasNextPage = rows.length > LIMIT;

  return {
    products: rows.slice(0, LIMIT),
    hasNextPage,
  };
}
