// components/ProductList.tsx
'use client'
import Link from 'next/link';
import ProductCard from './ProductCard'; 
interface Rating {
  rate: number;
  count: number;
}
interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category : string ; 
  rating :Rating ;
}

interface ProductListProps {
  category: string;
  products: Product[];
}

const ProductList = ({ category, products }: ProductListProps) => {
  return (
    
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-black p-2 mb-4">Introducing Our Latest Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product: Product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                image={product.image}
                price={product.price}
                category={product.category}
                rating={product.rating}
              />
            ))
          ) : (
            <p className="text-red-500 p-6">Error</p>
          )}
        </div>
      </div>
 
  );
};

export default ProductList;
