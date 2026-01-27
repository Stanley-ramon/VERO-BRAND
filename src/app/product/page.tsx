import { CategoryFilter } from "@/components/common/category-filter";
import { InfiniteScroll } from "@/components/common/infinite-scroll";
import { SearchInput } from "@/components/common/search-input";
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

  const categories = await db.select().from(categoryTable);

  return (
    <div className="px-6 py-6">
      {/* 🔍 Busca */}
      <div className="mx-auto mb-6 max-w-md">
        <SearchInput />
      </div>

      {/* 🏷️ Categorias */}
      <div className="mb-6">
        <CategoryFilter categories={categories} />
      </div>

      {/* Título */}
      <h1 className="mb-6 text-center text-2xl font-bold">
        {query
          ? `Resultados para "${query}"`
          : "Camisetas para você"}
      </h1>

      {/* Listagem */}
      {products.length === 0 ? (
        <p className="text-center text-sm text-gray-500">
          Nenhum produto encontrado.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {products.map((product) => (
            <div key={product.id} className="rounded-lg border p-4">
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Infinite Scroll */}
      <InfiniteScroll hasNextPage={hasNextPage} />
    </div>
  );
}
