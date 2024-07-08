
import { Restaurant } from '@/app/types/restaurant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const restaurantApi = createApi({
reducerPath: 'restaurantApi',
baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333/api' }),
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