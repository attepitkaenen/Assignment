import React from "react";
import Link from "next/link";
import { Restaurant } from "../types/restaurant";

type Props = {
  restaurant: Restaurant;
};

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <Link
      href={"restaurants/" + restaurant.id}
      className="rounded border border-white p-2 min-h-24 bg-neutral-800 flex flex-col justify-between lg:hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <div>
        <h2 className="">{restaurant.displayName.text}</h2>
        {restaurant.editorialSummary ? 
        <p className="text-sm text-gray-400">{restaurant.editorialSummary.text.slice(0, 40) + '...'}</p> :
        <p></p>
        }
      </div>
      {restaurant.currentOpeningHours ? 
      restaurant.currentOpeningHours.openNow ? <p className="bg-green-700 p-1 w-min rounded">Open</p> : <p className="bg-red-700 p-1 w-min rounded">Closed</p>
      :
      <p className="text-red-700">Unable to get open status</p>
      }
    </Link>
  );
}
