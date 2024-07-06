import { Restaurant } from '@/app/models/restaurant';
import { useRouter } from 'next/router';
import React from 'react'

const getRestaurants = async (restaurantId: string) => {
  const response = await fetch(`http://localhost:4000/places/${restaurantId}`);
  return response.json();
}

const cleanTypeText = (type: string) => {
  let result = type.charAt(0).toUpperCase() + type.slice(1);
  result = result.replaceAll("_", " ");
  result = result.replace(" restaurant", "");
  return result;
}

export default async function RestaurantDetail({ params }: { params: { restaurantId: string }}) {
  const restaurant = await getRestaurants(params.restaurantId) as Restaurant;
  return (
    <div className='m-4 p-4 bg-neutral-800 rounded'>
        <h1 className='underline text-xl'>{restaurant.displayName.text}</h1>
        <h2>tags:</h2>
        <div className='grid grid-cols-2 gap-2'>
          {restaurant.types.map(type => (
            <div className='border rounded px-2'>{cleanTypeText(type)}</div>
          ))} 
        </div>
    </div>
  )
}
