'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/app/api/axiosConfig';
import Image from 'next/image';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface Product {
 id: number;
 title: string;
 description: string;
 image: string;
 price: number;
 rating: {
   rate: number;
   count: number;
 };
}

const ProductDetail = ({ productId }: { productId: string }) => {
 const [data, setData] = useState<Product | null>(null);
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<string>('');
 const [quantity, setQuantity] = useState<number>(1);

 useEffect(() => {
   const fetchProductData = async () => {
     try {
       const res = await axiosInstance.get(`/products/${productId}`);
       setData(res.data);
     } catch (error) {
       setError("Error");
     } finally {
       setLoading(false);
     }
   };

   fetchProductData();
 }, [productId]);

 if (loading) return <p>Loading....</p>;
 if (error) return <p className="text-red-500 p-6">{error}</p>;
 if (!data) return <p className="text-red-500 p-6">Details not found</p>;

 return (
  <section className="max-w-4xl mx-auto p-12  shadow-lg rounded-lg">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 dark:bg-gray-900 dark:text-slate-400">
      <div className="md:w-1/2">
        <Image
          src={data.image}
          alt={data.title}
          width={300}
          height={350}
          className="object-cover rounded-lg"
        />
      </div>
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <p className="text-xl text-gray-800">${data.price}</p>
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 ${index < Math.floor(data.rating.rate) ? 'fill-current' : 'text-gray-300'}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-600">({data.rating.count} reviews)</span>
        </div>
        <p className="text-gray-700">{data.description}</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-950 "
          >
            <AiOutlineMinus />
          </button>
          <span className="text-lg font-semibold ">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-950 "
          >
            <AiOutlinePlus />
          </button>
        </div>
        <button className="dark:bg-gray-950  bg-gray-800 font-bold text-sm py-2 px-4 text-white flex items-center gap-2 rounded-md shadow-md hover:bg-gray-600 transition w-[170px]">
          Add To Cart <MdOutlineShoppingCart className="text-lg" />
        </button>
      </div>
    </div>
    <br />
    <br />
  </section>
 );
};

export default ProductDetail;
