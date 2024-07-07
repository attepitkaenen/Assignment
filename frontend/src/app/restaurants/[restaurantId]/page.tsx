"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getRestaurants,
  RestaurantState,
  selectRestaurantById,
  selectRestaurants,
} from "@/store/slices/restaurantSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const cleanTypeText = (type: string) => {
  let result = type.charAt(0).toUpperCase() + type.slice(1);
  result = result.replaceAll("_", " ");
  result = result.replace(" restaurant", "");
  return result;
};

export default function RestaurantDetail({ params }: { params: { restaurantId: string } }) {

  const restaurant = useAppSelector((state) =>
    selectRestaurantById(state, params.restaurantId)
  );
  const restaurants = useSelector((state: RestaurantState) => state.restaurants);
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (restaurants.length === 0) {
      dispatch(getRestaurants());
    }
  }, [ restaurants.length]);


  return (
    <div className="m-4 p-4 bg-neutral-800 rounded">
      {restaurant ? (
        <>
          <h1 className="underline text-xl">{restaurant.displayName.text}</h1>
          <h2>tags:</h2>
          <div className="grid grid-cols-2 gap-2">
            {restaurant.types.map((type) => (
              <div key={type} className="border rounded px-2">
                {cleanTypeText(type)}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
