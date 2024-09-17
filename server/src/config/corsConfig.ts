import cors, { CorsOptions } from 'cors';

export const corsConfig = cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

export const socketCORSConfig: CorsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
};