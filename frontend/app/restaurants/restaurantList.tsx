import React from 'react'
import { Restaurant } from '../models/restaurant';
import RestaurantCard from './restaurantCard';

const getRestaurants = async () => {
    const response = await fetch("http://localhost:4000/places");
    return response.json();
}

export default async function RestaurantList() {
    const restaurants = await getRestaurants() as Restaurant[];
    return (
        <div className='grid grid-cols-2 gap-2 p-2'>
            {restaurants.map((restaurant) => (
                <RestaurantCard restaurant={restaurant}/>
            ))}
        </div>
    )
}
