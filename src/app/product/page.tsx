import { searchProducts } from "@/db/queries/product";

type SearchParams = {
  q?: string;
  page?: string;
};

export default async function ProductPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;

  const query =
    typeof resolvedSearchParams?.q === "string"
      ? resolvedSearchParams.q
      : undefined;

  const page =
    typeof resolvedSearchParams?.page === "string"
      ? Number(resolvedSearchParams.page)
      : 1;

  const { products, hasNextPage } = await searchProducts({
    query,
    page,
  });

  return (
    <div className="px-6 py-6">
      <h1 className="mb-6 text-center text-2xl font-bold">
        {query
          ? `Resultados para "${query}"`
          : "Camisetas para treinos extremos"}
      </h1>

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

      {hasNextPage && (
        <div className="mt-6 flex justify-center">
          <a
            href={`?q=${query ?? ""}&page=${page + 1}`}
            className="rounded-md border px-4 py-2 text-sm"
          >
            Load more
          </a>
        </div>
      )}
    </div>
  );
}
