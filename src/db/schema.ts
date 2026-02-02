import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

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
  product: many(productTable),
}));

// ------------------
// PRODUCT TABLE
// ------------------
export const productTable = pgTable("product", {
  id: uuid().primaryKey().defaultRandom(),

  // ✅ IMPORTANT: não use set null com notNull.
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categoryTable.id, { onDelete: "restrict" }),

  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productRelations = relations(productTable, ({ one, many }) => ({
  category: one(categoryTable, {
    fields: [productTable.categoryId],
    references: [categoryTable.id],
  }),
  Variants: many(productVariantTable),
}));

// ------------------
// PRODUCT VARIANT TABLE
// ------------------
export const productVariantTable = pgTable(
  "product_variant",
  {
    id: uuid().primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .notNull()
      .references(() => productTable.id, { onDelete: "cascade" }),

    name: text().notNull(),
    slug: text().notNull().unique(),
    color: text().notNull(),

    // ✅ novo:
    size: text("size").notNull(), // P, M, G, GG

    priceInCents: integer("price_in_cents").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => ({
    uniqProductColorSize: uniqueIndex("uniq_product_color_size").on(
      t.productId,
      t.color,
      t.size,
    ),
  }),
);

export const productVariantRelations = relations(
  productVariantTable,
  ({ one }) => ({
    product: one(productTable, {
      fields: [productVariantTable.productId],
      references: [productTable.id],
    }),
  }),
);
