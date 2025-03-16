"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";   
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper-custom.css";

const ads = [
  { id: 1, image: "/img/shopping-trolleys-packets-tags.jpg", title: "Offer 50%", link: "/offers/1" },
  { id: 2, image: "/img/sale-concept-with-shopping-carts.jpg", title: "Offer 50%", link: "/offers/2" },
  { id: 3, image: "/img/high-view-shopping-cart-filled-with-letters.jpg", title: "Offer 50%", link: "/offers/3" },
];

const AdsSlider = () => {
  return (
    <div className="relative w-full cursor-pointer">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{
          clickable: true,
          renderBullet: (index, className) => `<span class="${className} custom-pagination"></span>`,  
        }}
        autoplay={{ delay: 3000 }}
        loop
        className=" shadow-lg rounded overflow-hidden"
      >
        {ads.map((ad, index) => (
          <SwiperSlide key={ad.id}>
            <Link href={ad.link} passHref legacyBehavior>
              
                <div className="relative w-full h-60">
                   <Image
                    src={ad.image}
                    alt={ad.title}
                    fill
                    className="object-cover "
                    priority={index === 0}
                  />

                   <div className="absolute bottom-4 left-5 p-4 rounded-lg">
                    <h2 className="text-Black text-xl font-bold">{ad.title}</h2>
                    <Link href={ad.link} passHref>
                      <button className="mt-3 bg-white text-black px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition">
                        Shop Now
                      </button>
                    </Link>
                  </div>

                </div>
             </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdsSlider;
