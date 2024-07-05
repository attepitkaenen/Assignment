import React from 'react'
import { Restaurant } from '../models/restaurant'

type Props = {
    restaurant: Restaurant
}

export default function RestaurantCard({restaurant}: Props) {
  return (
    <div className='rounded border border-white p-2'>
        <h2 className=''>{restaurant.displayName.text}</h2>
    </div>
  )
}