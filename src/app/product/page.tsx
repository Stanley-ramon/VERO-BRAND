import ProductItem from "@/components/product/product-item";
import { InfiniteScroll } from "@/components/search/infinite-scroll";
import { SearchInput } from "@/components/search/search-input";
import { searchProducts } from "@/db/queries/product";

type SearchParams = {
  q?: string;
  page?: string;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const query = typeof params.q === "string" ? params.q : undefined;
  const page = typeof params.page === "string" ? Number(params.page) : 1;

  const { products, hasNextPage } = await searchProducts({ query, page });

  return (
    <div className="px-6 py-6">
      <h1 className="mb-6 text-center text-2xl font-bold">
        {query ? `Resultados para "${query}"` : "Produtos"}
      </h1>

      <div className="mx-auto mb-6 max-w-md">
        <SearchInput />
      </div>

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

      <InfiniteScroll hasNextPage={hasNextPage} />
    </div>
  );
}
