'use client'
import Link from "next/link";

const navelement = [
  { name: "Home", path: "/" },
  { name: "Electronics", path: "/products/category/electronics" },
  { name: "Men's Clothes", path: "/products/category/men's clothing" },
  { name: "Women's Clothes", path: "/products/category/women's clothing" },
  { name: "Jewelery", path: "/products/category/jewelery" },
];

const Navbar: React.FC = () => {

  return (
    <nav className=" hidden sm:flex text-gray-900 dark:dark:bg-gray-950 dark:shadow-slate-800 shadow-md py-3 items-center">
      <div className="container mx-auto flex justify-between items-center px-4">
        
         <ul className="flex gap-6 text-black dark:text-white">
          {navelement.map((item) => (
            <li key={item.path} className="relative group">
              <Link href={item.path} className="cursor-pointer transition-colors duration-300 dark:hover:text-gray-300 hover:text-gray-800">
                {item.name}
              </Link>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
