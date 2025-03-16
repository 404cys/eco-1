'use client'
import React from 'react'
import Link from 'next/link'
import { CiLocationOn ,CiHeart  } from "react-icons/ci";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TiMessages } from "react-icons/ti";

function HeaderTop() {
  return (
    <div className='border-b w-full p-2 pr-12 bg-gray-100 flex justify-between items-center dark:text-white  dark:bg-gray-900'>
        <div className='flex justify-between gap-1'>
            <h1 className="text-xs sm:text-xxs">Welcom Abdulrahman</h1>
            <CiHeart />
        </div>
        <div className='flex justify-around gap-2 items-center text-xs sm:text-xxs'>
            <div className='flex justify-between gap-1'>
                <CiLocationOn />
                <Link href={"sd"}> Store Location </Link>
            </div>
            <div className='flex justify-between gap-1'>
                <MdOutlineLocalOffer /> 
                <Link href={"sd"}> Offer Shopping </Link>
            </div>
            <div className='flex justify-between gap-1'>
                <TiMessages /> 
                <Link href={"sd"}>Connect</Link>
            </div>
        </div>
    </div>
  )
}

export default HeaderTop
