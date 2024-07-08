
import { Restaurant } from '@/app/types/restaurant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// to use the mockAPI change baseUrl from process.env.NEXT_PUBLIC_RESTAURANT_API_URL to process.env.NEXT_PUBLIC_MOCK_API_URL'
export const restaurantApi = createApi({
reducerPath: 'restaurantApi',
baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_RESTAURANT_API_URL }),
endpoints: (builder) => ({
  getRestaurants: builder.query<Restaurant[], void>({
    query: () => 'restaurants',
  }),
  getRestaurantById: builder.query<Restaurant, string>({
    query: (id) =>`restaurants/${id}`
  })
}),
});

// Export hooks for usage in functional components
export const { useGetRestaurantsQuery, useGetRestaurantByIdQuery } = restaurantApi;