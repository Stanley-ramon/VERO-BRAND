import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"; // ✅ Corrigido import
// import { Variable } from "lucide-react"; // ❌ Removido pois não era usado
// import product from "@/app/product/page"; // ❌ Removido pois não era usado

// ------------------
// USER TABLE
// ------------------
export const userTable = pgTable("user", {
  id: uuid().primaryKey().defaultRandom(), // ✅ Já estava correto
});

// ------------------
// CATEGORY TABLE
// ------------------
export const categoryTable = pgTable("category", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const categoryRelations = relations(categoryTable, ({ many }) => ({
  product: many(productTable), // ✅ Usando "many" do relations
}));

// ------------------
// PRODUCT TABLE
// ------------------
export const productTable = pgTable("product", {
  id: uuid().primaryKey().defaultRandom(), // ✅ Corrigido de defaultRandon() → defaultRandom()
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categoryTable.id),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text().notNull(),
  //priceInCents: integer("price_in_cents").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productRelations = relations(productTable, ({ one, many }) => ({
  category: one(categoryTable, {
    fields: [productTable.categoryId],
    references: [categoryTable.id],
  }),
  Variants: many(productVariantTable), // ✅ Corrigido de "Many" → "many"
}));

// ------------------
// PRODUCT VARIANT TABLE
// ------------------
export const productVariantTable = pgTable("product_variant", {
  id: uuid().primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => productTable.id),
  name: text().notNull(),
  slug: text().notNull().unique(),
  color: text().notNull(),
  priceInCents: integer("price_in_cents").notNull(), // ✅ Corrigido o nome da coluna (estava "price-in-cents")
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productVariantRelations = relations(
  productVariantTable,
  ({ one }) => ({
    product: one(productTable, {
      fields: [productVariantTable.productId],
      references: [productTable.id],
    }),
  }),
);
