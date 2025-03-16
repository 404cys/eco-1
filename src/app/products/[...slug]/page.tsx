'use client';
import { useEffect, useState } from 'react';
import ProductDetail from '@/app/components/Product/ProductDetail';
import ProductList from '@/app/components/Product/ProductList';
import axiosInstance from '@/app/api/axiosConfig';
import { useParams } from 'next/navigation';
import CartDetail from '@/app/components/Product/CartDetail';

type Props = {};

export default function ProductPage({}: Props) {
  const [product, setProduct] = useState<any>(null);
  const [products, setProducts] = useState<any>(null);
  const [cart, setCart] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { slug } = params;
      console.log('Slug:', slug);

       if (Array.isArray(slug) && slug[0] === 'carts') {
        try {
          const res = await axiosInstance.get(`/carts/1`);  
          setCart(res.data);
        } catch (err) {
          console.error('Error loading cart:', err);
          setError("Error loading cart");
        }
        return;  
      }

       if (slug) {
        try {
          if (slug.length === 1) {
            const res = await axiosInstance.get(`/products/${slug[0]}`);
            setProduct(res.data);
          } else if (slug.length === 2) {
            const category = slug[1];
            const res = await axiosInstance.get(`/products/category/${category}`);
            setProducts({ category, products: res.data });
          } else {
            setError("Error Route");
          }
        } catch (err) {
          console.error('Error loading data:', err);
          setError("Error");
        }
      }
    };

    fetchData();
  }, [params]);

  if (error) {
    return <p className="text-red-500 p-6">{error}</p>;
  }

  if (cart) {
    return <CartDetail cart={cart} />;
  }

  if (product) {
    return <ProductDetail productId={product.id} />;
  }

  if (products) {
    return <ProductList category={products.category} products={products.products} />;
  }

  return <p className="text-red-500 p-6">Loading...</p>;
}
