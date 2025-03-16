'use client'
import { FC, useState } from 'react';
import { MdOutlineShoppingCart } from "react-icons/md";
import Image from 'next/image';
import Link from 'next/link';
import { IoHeartOutline, IoHeartSharp, IoStar, IoStarOutline } from "react-icons/io5";

interface Rating {
  rate: number;
  count: number;
}

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  rating: Rating;
}

const ProductCard: FC<ProductCardProps> = ({ id, title, description, image, price, category, rating }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

   const renderStars = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= Math.floor(rate) ? (
          <IoStar key={i} className="text-yellow-500 text-lg" />
        ) : (
          <IoStarOutline key={i} className="text-gray-300 text-lg" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="relative bg-white p-4 rounded-xl dark:bg-gray-950  shadow-lg border border-gray-200 hover:shadow-xl transition-transform transform hover:-translate-y-1 flex flex-col justify-between h-[400px] cursor-pointer">
      
       <button
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl z-20"
        onClick={(e) => toggleFavorite(e, id)}
      >
        {favorites.includes(id) ? <IoHeartSharp className="text-red-600" /> : <IoHeartOutline />}
      </button>

      <Link href={`/products/${id}`} passHref>
        <div className="flex flex-col h-full">
           <div className="w-full flex justify-center">
            <Image
              src={image}
              alt={title}
              width={180}
              height={180}
              className="object-cover bg-gray-100 rounded-lg h-[180px]"
            />
          </div>

           <div className="flex flex-col justify-between flex-grow mt-4">
            <div>
              <h2 className="text-lg font-semibold dark:text-gray-600 text-gray-800 line-clamp-1 h-[28px]">{title}</h2>
              <p className="text-sm text-gray-500 h-[20px]">{category}</p>
              <p className="text-sm text-gray-500 line-clamp-2 h-[40px]">{description}</p>
            </div>

             <div className="flex items-center mt-2">
              {renderStars(rating.rate)}
              <span className="ml-2 text-gray-600 text-sm">({rating.count})</span>
            </div>
          </div>

           <div className="flex justify-between items-center mt-4">
            <h3 className="text-green-600 font-bold text-lg">{price} $</h3>
            <button className="bg-gray-800 font-bold text-sm text-white px-4 py-2 flex items-center gap-2 rounded-md shadow-md hover:bg-gray-600 transition w-[90px]">
              Add <MdOutlineShoppingCart className="text-lg" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
