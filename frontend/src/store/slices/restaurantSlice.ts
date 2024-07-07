import { buildCreateSlice, asyncThunkCreator, createSelector } from '@reduxjs/toolkit'

export type Restaurant = {
    id: string,
    types: string[],
    displayName: {
      text: string,
      languageCode: string
    }
}

export type RestaurantState = {
    status: string,
    restaurants: Restaurant[],
    errorMessage: string
}

const initialState: RestaurantState = {
    status: "starting",
    restaurants: [],
    errorMessage: ""
}

const createAppSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
})

const restaurantSlice = createAppSlice({
  name: 'restaurants',
  initialState,
  reducers: (create) => ({
    getRestaurants: create.asyncThunk(
        async () => {
          const response = await fetchRestaurants();
          return response;
        },
        {
          pending: (state) => {
            state.status = "loading";
          },
          fulfilled: (state, action) => {
            state.status = "success";
            state.restaurants = action.payload;
          },
          rejected: (state) => {
            state.status = "failed";
          },
        },
      ),
  })
})

const fetchRestaurants = async () => {
    const response = await fetch('http://localhost:4000/places');
    const result = await response.json();
    return result as Restaurant[];
}

export const { getRestaurants } = restaurantSlice.actions;

export const selectRestaurants = (state: RestaurantState) => state.restaurants;

export const selectRestaurantById = (state: RestaurantState, restaurantId: string) =>
  state.restaurants.find((restaurant : Restaurant) => restaurant.id === restaurantId);

export default restaurantSlice.reducer;