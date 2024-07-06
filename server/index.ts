import fastify from "fastify";
import { restaurantRoutes } from "./services/restaurant.js";
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'


const app = fastify({
    logger: true
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(restaurantRoutes, {prefix: '/api/restaurants'});

const main = async () => {
    await app.listen({
        port: 3333,
        host: "0.0.0.0",
    });
}


main();
