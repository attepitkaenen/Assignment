"use client";

import { useGetRestaurantByIdQuery } from "@/store/api/restaurantApi";
import React from "react";

const cleanTypeText = (type: string) => {
  let result = type.charAt(0).toUpperCase() + type.slice(1);
  result = result.replaceAll("_", " ");
  result = result.replace(" restaurant", "");
  return result;
};

export default function RestaurantDetail({ params }: { params: { restaurantId: string } }) {

  const { data: restaurant, error, isLoading } = useGetRestaurantByIdQuery(params.restaurantId);
  

  return (
    <div className="m-4 p-4 bg-neutral-800 rounded flex flex-col gap-4 lg:p-10 lg:mx-10 lg:w-[50%] self-center">
      {restaurant ? (
        <>
          <h1 className="underline text-xl">{restaurant.displayName.text}</h1>

          {restaurant.currentOpeningHours ? 
          restaurant.currentOpeningHours.openNow ? <p className="text-green-700">Currently Open!</p> : <p className="text-red-700">Currently Closed!</p>
          :
          <p className="text-red-700">Unable to get open status</p>
          }

          {restaurant.editorialSummary ? <p>{restaurant.editorialSummary.text}</p> : <></>}
          
          <h2>tags:</h2>
          <div className="flex gap-2 flex-wrap">
            {restaurant.types.map((type) => (
              <div key={type} className="border rounded px-2">
                {cleanTypeText(type)}
              </div>
            ))}
          </div>

          <h2>Opening hours:</h2>
          {restaurant.currentOpeningHours ? 
          <div className="grid grid-cols-1 gap-2">
            {restaurant.currentOpeningHours.weekdayDescriptions.map(day => <p key={day}>{day}</p>)}
          </div> :
          <p>Unable to get opening hours.</p>
          }
          
        </>
      ) : (
        <div className="text-center">loading...</div>
      )}
    </div>
  );
}
