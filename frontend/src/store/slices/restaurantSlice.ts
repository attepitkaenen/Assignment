import { createSlice, configureStore, PayloadAction, createAsyncThunk, buildCreateSlice, asyncThunkCreator, createSelector } from '@reduxjs/toolkit'
import { RootState } from '@reduxjs/toolkit/query'
import axios from 'axios'


type Restaurant = {
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
  }),
  selectors: {
    selectRestaurants: (state) => state.restaurants
  }
})

const fetchRestaurants = async () => {
    const response = await fetch('http://localhost:4000/places');
    const result = await response.json();
    return result as Restaurant[];
}

export const { getRestaurants } = restaurantSlice.actions;
export const { selectRestaurants } = restaurantSlice.selectors;

const getRes = (state: any) => state.restaurants;
const getResId = (_: RestaurantState, restaurantId: string) => restaurantId;

export const selectRestaurantById = createSelector(
  [getRes, getResId],
  (restaurants: Restaurant[], id: string) => {
    console.log(restaurants);
    console.log(id);
    // return restaurants.find(res => res.id === id)
  }
)


export default restaurantSlice.reducer;