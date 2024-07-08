import { Static, Type } from '@sinclair/typebox'

export const Restaurant = Type.Object({
    id: Type.String(),
    types: Type.Array(Type.String()),
    displayName: Type.Object({ text: Type.String(), languageCode: Type.String() }),
    editorialSummary: Type.Optional(Type.Object({ text: Type.String(), languageCode: Type.String() }))
})

export const RestaurantArray = Type.Array(Restaurant)

export type RestaurantArrayType = Static<typeof RestaurantArray>
export type RestaurantType = Static<typeof Restaurant>