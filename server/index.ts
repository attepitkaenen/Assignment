import fastify from "fastify";
import { restaurantRoutes } from "./services/restaurant.js";
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import cors from '@fastify/cors'

const app = fastify({
    logger: true
}).withTypeProvider<TypeBoxTypeProvider>();


app.register(cors, {
    origin: (origin, cb) => {
        if (typeof origin == 'string')
        {
            const hostname = new URL(origin).hostname
            
            if(hostname === "localhost"){
                //  Request from localhost will pass
                cb(null, true)
                return
            }
        }
        // Generate an error on other origins, disabling access
        cb(new Error("Not allowed"), false)
    }
})
app.register(restaurantRoutes, {prefix: '/api/restaurants'});


const main = async () => {
    await app.listen({
        port: 3333,
        host: "0.0.0.0",
    });
}


main();
