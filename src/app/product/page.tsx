import { CategoryFilter } from "@/components/product/category-filter";
import ProductItem from "@/components/product/product-item";
import { InfiniteScroll } from "@/components/search/infinite-scroll";
import { SearchInput } from "@/components/search/search-input";
import { db } from "@/db";
import { searchProducts } from "@/db/queries/product";
import { categoryTable } from "@/db/schema";

type SearchParams = {
  q?: string;
  page?: string;
};

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // ✅ OBRIGATÓRIO NO NEXT 15
  const params = await searchParams;

  const query = typeof params.q === "string" ? params.q : undefined;
  const page = typeof params.page === "string" ? Number(params.page) : 1;

  const { products, hasNextPage } = await searchProducts({
    query,
    page,
  });

  console.log(products.map((p) => ({ name: p.name, slug: p.slug })));

  const categories = await db.select().from(categoryTable);

  return (
    <div className="px-6 py-6">
      {/* Título */}
      <h1 className="mb-6 text-center text-2xl font-bold">
        {query ? `Resultados para "${query}"` : "Camisetas para você"}
      </h1>

      {/* 🔍 Busca */}
      <div className="mx-auto mb-6 max-w-md">
        <SearchInput />
      </div>

      {/* 🏷️ Categorias */}
      {/*<div className="mb-6">
          <CategoryFilter categories={categories} />
        </div>*/}

      {/* Listagem */}
      {products.length === 0 ? (
        <p className="text-center text-sm text-gray-500">
          Nenhum produto encontrado.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Infinite Scroll */}
      <InfiniteScroll hasNextPage={hasNextPage} />
    </div>
  );
}
