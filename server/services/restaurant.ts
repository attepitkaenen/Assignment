import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import got from "got";
import { Restaurant, RestaurantArray, RestaurantArrayType, RestaurantType } from "../schemas/restaurant.js";

type GoogleSearchNearbyResponse = {
    places: []
}

const getAllRestaurants = async () => {
    try {
        const res = await got
            .post('https://places.googleapis.com/v1/places:searchNearby', {
                json: {
                    "includedTypes": ["restaurant"],
                    "maxResultCount": 10,
                    "locationRestriction": {
                      "circle": {
                        "center": {
                          "latitude": 37.7937,
                          "longitude": -122.3965},
                        "radius": 500.0
                      }
                    }
                  },
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': 'AIzaSyC3RfG3w1CfXIx6RTs565y_PHkClo6zJg8',
                    'X-Goog-FieldMask': 'places.id,places.displayName,places.types'
                  }
            })
            .json();
        return res as GoogleSearchNearbyResponse;
    } catch (err) {
        console.log(err);
    }
}


const getRestaurantById = async (id: string) => {
    try {
        const res = await got
            (`https://places.googleapis.com/v1/places/${id}`, {
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': 'AIzaSyC3RfG3w1CfXIx6RTs565y_PHkClo6zJg8',
                    'X-Goog-FieldMask': 'id,displayName,types'
                  }
            })
            .json();
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const restaurantRoutes = async (app: FastifyInstance) => {
    app.get<{ Reply: RestaurantArrayType }>("/", {schema: { response: { 200:  RestaurantArray } } }, async (request: FastifyRequest, reply: FastifyReply) => {
        const res = await getAllRestaurants();

        if (!res) {
            reply.status(404)
        }
        else {
            reply.status(200).send(res.places);
        }
    })
    
    app.get<{ Reply: RestaurantType }>("/:id", {schema: { response: { 200: Restaurant } } }, async (request: FastifyRequest, reply: FastifyReply) => {
        const query = request.params as any;
        const res = await getRestaurantById(query.id);

        reply.status(200).send(res);
    })
}