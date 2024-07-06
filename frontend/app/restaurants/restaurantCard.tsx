import React from 'react'
import { Restaurant } from '../models/restaurant'
import Link from 'next/link'
import { relative } from 'path'

type Props = {
    restaurant: Restaurant
}

export default function RestaurantCard({restaurant}: Props) {
  return (
    <Link href={'restaurants/' + restaurant.id} className='rounded border border-white p-2 min-h-24 bg-neutral-800'>
        <h2 className=''>{restaurant.displayName.text}</h2>
    </Link>
  )
}