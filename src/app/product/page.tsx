import { Pagination } from "@/components/common/pagination";
import { searchProducts } from "@/db/queries/product";

type ProductPageProps = {
  searchParams: {
    q?: string;
    page?: string;
  };
};

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const page = Number(searchParams.page ?? 1);

  const { products, hasNextPage } = await searchProducts({
    query: searchParams.q,
    page,
  });

  return (
    <div className="px-6 py-6">
      <h1 className="mb-6 text-center text-2xl font-bold">
        {searchParams.q
          ? `Resultados para "${searchParams.q}"`
          : "Camisetas para treinos extremos"}
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-sm text-gray-500">
          Nenhum produto encontrado.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {products.map((product) => (
              <div key={product.id} className="rounded-lg border p-4">
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
            ))}
          </div>

          <Pagination
            page={page}
            hasNextPage={hasNextPage}
            query={searchParams.q}
          />
        </>
      )}
    </div>
  );
}
