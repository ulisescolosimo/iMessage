import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema'
import dotenv from 'dotenv';
import {getSession} from 'next-auth/react'
import { GraphQLContext } from './util/types';

interface MyContext {
    token?: String;
}

async function startApolloServer() {
    dotenv.config()
    const app = express();

    const httpServer = http.createServer(app);

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    })

    const server = new ApolloServer<MyContext>({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    app.use(
        '/graphql',
        cors<cors.CorsRequest>({
            origin: 'http://localhost:3000',
            credentials: true,
        }),
        json(),
        expressMiddleware(server, {
            context: async ({ req, res }): Promise<GraphQLContext> => {
                const session = await getSession({ req })
                return { session }
            },
        }),
    );

    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

startApolloServer().catch((error) => console.log(error))
