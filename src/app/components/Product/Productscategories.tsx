'use client';
import React, { useState, useEffect } from 'react';
import { fetchData } from '../../api/apiService';
import ProductCard from './ProductCard';

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: Rating;
}

interface CategoryProducts {
  category: string;
  products: Product[];
}

function ProductMens() {
  const [categoryProducts, setCategoryProducts] = useState<CategoryProducts[]>([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);  
  const [categories, setCategories] = useState<string[]>([]);  

  const getCategory = async () => {
    try {
      const result = await fetchData({
        route: '/products/categories',
      });

      if (result && Array.isArray(result)) {
        setCategories(['All', ...result]);  
      } else {
        setError('Error fetching category list');
      }
    } catch (e) {
      console.log(`Error: ${e}`);
      setError('Error fetching categories');
    }
  };

  const getProduct = async () => {
    if (!categories.length) return;  
    try {
      const result = await Promise.all(
        categories.map(async (category) => {
          const res = await fetchData({
            route: `/products/category/${category}`,
          });
          return { category, products: res };   
        })
      );

      setCategoryProducts(result);   
    } catch (e) {
      console.error('Error fetching data:', e);
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      getProduct();
    }
  }, [categories]);

  return (
    <section>
      <div className="pl-6 text-left text-lg font-semibold text-gray-700">
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {categoryProducts.length > 0 ? (
          categoryProducts.map((categoryData) => (
            <div key={categoryData.category}>
              <h2 className="text-xl font-bold pl-6">{categoryData.category}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {categoryData.products.map((item) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    category={item.category}
                    description={item.description}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </section>
  );
}

export default ProductMens;
