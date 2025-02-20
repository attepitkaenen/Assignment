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
                          "latitude": 59.325665364,
                          "longitude": 18.056499774},
                        "radius": 500.0
                      }
                    }
                  },
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': 'AIzaSyC3RfG3w1CfXIx6RTs565y_PHkClo6zJg8',
                    'X-Goog-FieldMask': 'places.id,places.displayName,places.types,places.editorialSummary,places.currentOpeningHours'
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
                    'X-Goog-FieldMask': 'id,displayName,types,editorialSummary,currentOpeningHours'
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
        try {
            const res = await getAllRestaurants();
    
            if (!res) {
                reply.status(404)
            }
            else {
                reply.status(200).send(res.places);
            }
        } 
        catch {
            reply.status(423)
        }
    })
    
    app.get<{ Reply: RestaurantType }>("/:id", {schema: { response: { 200: Restaurant } } }, async (request: FastifyRequest, reply: FastifyReply) => {
        const query = request.params as any;

        try {
            const res = await getRestaurantById(query.id);

            if (!res) {
                reply.status(404)
            }
            else {
                reply.status(200).send(res);
            }
        }
        catch {
            reply.status(423)
        }

    })
}