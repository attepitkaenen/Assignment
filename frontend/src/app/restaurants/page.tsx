'use client'

import RestaurantCard from "./restaurantCard";
import { useGetRestaurantsQuery } from "@/store/api/restaurantApi";



export default function Restaurants() {
    const { data: restaurants, error, isLoading } = useGetRestaurantsQuery();

    return (
        restaurants ?
        (
        <div className='grid grid-cols-2 gap-2 p-2 lg:grid-cols-4 lg:px-24 lg:gap-4'>
            {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
            ))}
        </div>
        ) :
        (
            <div>loading...</div>
        )
    )
}