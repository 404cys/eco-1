'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CiSearch, CiUser, CiShoppingCart } from "react-icons/ci";
import { IoIosNotificationsOutline , IoMdHome} from "react-icons/io";
import { GoHome } from "react-icons/go";
import { FaChevronDown, FaMoon, FaSun, FaFacebookSquare, FaInstagram, FaWhatsapp} from "react-icons/fa";

function HeaderMain() {
  const cartItemCount = 3;
  const notfication = 1;

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const suggestions = [
    "Women's Clothing", "Men's Clothing", "Shoes", "Accessories", "Bags",
    "Electronics", "Mobile Phones", "Laptops", "Monitors", "Video Games",
    "Toys", "Kids Toys", "Home Appliances", "Watches", "Sunglasses", 
    "Cameras", "Home Electronics", "TVs", "Headphones", "Medical Devices", 
    "Sports Equipment"
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (!target.closest(".dropdown")) {
        setIsCartOpen(false);
        setIsNotifOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);
    if (query.length === 0) {
      setFilteredSuggestions([]);
    } else {
      setFilteredSuggestions(suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase())));
    }
  };

  const closeSuggestions = () => {
    setFilteredSuggestions([]);  
  };

  return (
    <header className="border-b p-3 bg-whitedark:bg-gray-950  dark:text-white">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
       <div className="flex items-center justify-between gap-2 w-full sm:w-auto">
        <Link href="/">
          <div className="text-xl font-bold">Logo</div>
        </Link>
        <div className="flex gap-2  sm:flex">
          <Link href="link">
            <div className="rounded-xl dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600 bg-gray-300 p-2 hover:bg-gray-400 transition">
              <FaFacebookSquare className="text-lg cursor-pointer" />
            </div>
          </Link>
          <Link href="link">
            <div className="rounded-xl dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600 bg-gray-300 p-2 hover:bg-gray-400 transition">
              <FaInstagram className="text-lg cursor-pointer" />
            </div>
          </Link>
          <Link href="link">
            <div className="rounded-xl dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600 bg-gray-300 p-2 hover:bg-gray-400 transition">
              <FaWhatsapp className="text-lg cursor-pointer" />
            </div>
          </Link>
        </div>
      </div>
  
       <div className="w-full sm:w-auto">
        <div className="relative">
          <input
            className="border rounded-md px-10 py-2 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-950  dark:text-white"
            type="text"
            placeholder="Search What You Want..."
            value={query}
            onChange={handleSearchInput}
          />
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 text-2xl" />
          
          {filteredSuggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-md mt-1 z-10">
              <div className="p-2 text-blue-700 dark:text-gray-200 font-bold">Suggestions</div>
              <button onClick={closeSuggestions} className="absolute top-2 right-2 text-blue-700 dark:text-gray-300">X</button>
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => {
                    setQuery(suggestion);
                    setFilteredSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
  
          {filteredSuggestions.length === 0 && query.length > 0 && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 text-2xl"
              onClick={() => setQuery("")}
            >
              &times;
            </button>
          )}
        </div>
      </div>
  
       <div className="flex items-center gap-4 sm:flex-none hidden sm:flex">
        <Link href="/profile" className="text-gray-700 dark:text-white hover:text-black">
          <CiUser className="text-3xl cursor-pointer" />
        </Link>
  
        <div className="relative">
          <button onClick={() => setIsCartOpen(!isCartOpen)}>
            <CiShoppingCart className="text-3xl cursor-pointer" />
          </button>
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartItemCount}
            </span>
          )}
          {isCartOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-50">
              <p className="text-gray-700 dark:text-gray-200">🛒 You Have {cartItemCount} Item</p>
              <Link href="products/carts" className="block mt-2 text-blue-500 hover:underline">
                View Cart →
              </Link>
            </div>
          )}
        </div>
  
        <div className="relative">
          <button onClick={() => setIsNotifOpen(!isNotifOpen)}>
            <IoIosNotificationsOutline className="text-3xl cursor-pointer" />
          </button>
          {notfication > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {notfication}
            </span>
          )}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-50">
              <p className="text-gray-700 dark:text-gray-200">🔔 {notfication}</p>
              <Link href="/notifications" className="block mt-2 text-blue-500 hover:underline">
                View All →
              </Link>
            </div>
          )}
        </div>
  
        <div className="relative w-36">
          <select
            className="appearance-none w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-950  text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="العربية">العربية</option>
            <option value="الكردية">الكردية</option>
          </select>
          <FaChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none" />
        </div>
  
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 dark:text-white transition-all">
          {darkMode ? <FaSun className="text-yellow-500 text-xl" /> : <FaMoon className="text-gray-800 text-xl" />}
        </button>
      </div>
    </div>
  
     <div className="sm:hidden fixed bottom-0 left-0 right-0 border-2 rounded-md bg-white dark:bg-gray-900 p-3 shadow-md z-10 ">
      <div className="flex justify-around">
        <Link href="/">
          <GoHome className="text-3xl " />
        </Link>
        <Link href="/profile">
          <CiUser className="text-3xl " />
        </Link>
        <div className="relative">
          <button onClick={() => setIsCartOpen(!isCartOpen)}>
            <CiShoppingCart className="text-3xl" />
          </button>
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartItemCount}
            </span>
          )}
        </div>
        <div className="relative">
          <button onClick={() => setIsNotifOpen(!isNotifOpen)}>
            <IoIosNotificationsOutline className="text-3xl" />
          </button>
          {notfication > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {notfication}
            </span>
          )}
        </div>
        
      </div>
    </div>
  </header>
  
  );
}

export default HeaderMain;
