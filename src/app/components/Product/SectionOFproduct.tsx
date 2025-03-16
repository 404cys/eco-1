'use client'
import Link from "next/link";
import Image from "next/image";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const categories = [
  { id: 1, name: "electronics", img: "/img/joystick.png" },
  { id: 2, name: "jewelery", img: "/img/jewelery.png" },
  { id: 3, name: "men's clothing", img: "/img/OIF.jpeg" },
  { id: 4, name: "women's clothing", img: "/img/OIPwomen's.jpeg" },
];

export default function SectionOFproduct() {
  return (
    <div className="grid sm:grid-cols-2  lg:grid-cols-4 gap-2 p-6 ">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/products/category/${encodeURIComponent(category.name)}`}
          className="block w-full dark:bg-gray-900 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 capitalize dark:text-slate-50">
              {category.name}
            </h3>

            <Image
              src={category.img}
              alt={category.name}
              width={250}
              height={250}
              className="w-20 h-20 object-contain rounded-lg"
            />
          </div>

          <div className="flex justify-start items-center gap-1">
            <p className="text-gray-700 dark:text-slate-50">Shop Now</p>
            <MdOutlineKeyboardDoubleArrowRight className="mt-1 dark:text-slate-50" />
          </div>
        </Link>
      ))}
    </div>
  );
}
