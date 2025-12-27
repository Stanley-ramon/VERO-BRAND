type Product = {
  id: string;
  name: string;
  description: string | null;
};

type ProductListProps = {
  products: Product[];
};

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <p className="text-center text-sm text-gray-500">
        Nenhum produto encontrado.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {products.map((product) => (
        <div key={product.id} className="rounded-lg border p-4">
          <h2 className="font-semibold">{product.name}</h2>
          <p className="text-sm text-gray-500">{product.description}</p>
        </div>
      ))}
    </div>
  );
}
