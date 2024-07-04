import { fastify, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import got from 'got';


const app: FastifyInstance = fastify({
    logger: true
});

export const getAllRestaurants = async () => {
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
                    'X-Goog-Api-Key': 'AIzaSyALYGdAbjfG41Ia4l8j2ZGAz-eJDF82ucg',
                    'X-Goog-FieldMask': 'places.id,places.displayName,places.types'
                  }
            })
            .json();
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const getRestaurantById = async (id: string) => {
    try {
        const res = await got
            (`https://places.googleapis.com/v1/places/${id}`, {
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': 'AIzaSyALYGdAbjfG41Ia4l8j2ZGAz-eJDF82ucg',
                    'X-Goog-FieldMask': 'id,displayName,types'
                  }
            })
            .json();
        return res;
    } catch (err) {
        console.log(err);
    }
}


const restaurantRoutes = async (app: FastifyInstance) => {
    app.get("", async (request: FastifyRequest, reply: FastifyReply) => {
        return getAllRestaurants();
    
    })
    
    app.get("/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const query = request.params as any;
    
        return getRestaurantById(query.id);
    })
}

app.register(restaurantRoutes, {prefix: '/api/restaurants'});

const main = async () => {
    await app.listen({
        port: 3000,
        host: "0.0.0.0",
    });
}


main();
