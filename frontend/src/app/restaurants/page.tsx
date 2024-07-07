'use client'

import RestaurantCard from "./restaurantCard";
import { useEffect } from "react";
import { getRestaurants, selectRestaurants } from "@/store/slices/restaurantSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSelector } from "react-redux";



export default function Restaurants() {
    const restaurants = useAppSelector(selectRestaurants);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getRestaurants())
    }, []);

    return (
        restaurants ?
        (<div className='grid grid-cols-2 gap-2 p-2'>
            {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
            ))}
        </div>) :
        (
            <div>loading...</div>
        )
    )
}