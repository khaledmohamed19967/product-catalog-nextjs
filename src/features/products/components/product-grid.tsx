import type { Product } from "../types/product";
import { ProductCard } from "./product-card";

export interface ProductGridProps {
  products: Product[];
  onDeleted?: (productId: number) => void;
}

export function ProductGrid({ products, onDeleted }: ProductGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <li key={product.id} className="min-w-0">
          <ProductCard product={product} onDeleted={onDeleted} />
        </li>
      ))}
    </ul>
  );
}
