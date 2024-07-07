import React from "react";
import Link from "next/link";
import { relative } from "path";
import { Restaurant } from "@/store/slices/restaurantSlice";

type Props = {
  restaurant: Restaurant;
};

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <Link
      href={"restaurants/" + restaurant.id}
      className="rounded border border-white p-2 min-h-24 bg-neutral-800"
    >
      <h2 className="">{restaurant.displayName.text}</h2>
    </Link>
  );
}
