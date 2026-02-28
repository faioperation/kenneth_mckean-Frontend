import React, { useEffect, useState } from 'react';
import { Icon } from "@iconify/react";
import { FaRegHeart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export default function Library() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetch('/Favourite.json')
      .then((res) => res.json())
      .then((data) => setFavourites(data)); // JSON structure onujayi data.data nite hobe
  }, []);

  return (
    <div>
      <header className=''>
        <p className='text-2xl text-black px-4 md:p-8'>Library</p>
      </header>
    <div className="p-4 md:p-8 bg-[#F8F8F7] min-h-screen">

      <div className='flex gap-2  max-w-screen justify-end my-4'>
        <button className=' px-4 rounded-lg py-1 border border-gray-200 text-gray-700 flex items-center gap-3  '> <span><FaRegHeart></FaRegHeart></span> My Favourites</button>
        <button className=' px-4 rounded-lg py-1 border border-gray-200 text-gray-700 flex items-center gap-3'> <span> <FaSearch></FaSearch></span> Search</button>
      </div>
      
      {/* Responsive Grid: Mobile-e 1ta, Tablet-e 2ta, Desktop-e 3ta card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favourites?.map((favourite) => (
          <div 
            key={favourite.id} 
            className="card bg-white shadow-sm border border-gray-100 rounded-[2rem] overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            {/* Card Header: Icon, Title & Heart */}
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                {/* Dark Circular Icon */}
                <div className="bg-[#34322D] h-10 w-10 flex items-center justify-center rounded-full text-white">
                  <Icon icon={favourite.author_icon} width="22" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">
                    {favourite.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {favourite.description}
                  </p>
                </div>
              </div>

              {/* Heart/Favorite Icon */}
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Icon 
                  icon={favourite.is_favorite ? "mdi:heart" : "mdi:heart-outline"} 
                  className={favourite.is_favorite ? "text-red-500" : ""}
                  width="24" 
                />
              </button>
            </div>

            {/* Card Body: Main Image */}
            <figure className="px-5 pb-5">
              <img 
                src={favourite.main_image} 
                alt="Post Design" 
                className="w-full h-48 md:h-52 object-cover rounded-[1.5rem]"
              />
            </figure>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
