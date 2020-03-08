import express, { json, Request, Response } from 'express';
import BaseRouter from './apis';
import * as bodyParser from 'body-parser';
import { config } from './config';

import cors from 'cors';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

const corsOptions: cors.CorsOptions = {
    credentials: true,
    origin: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
    maxAge: 3600
};

export const connection = createConnection()
    .then(async connection => {
        await connection.synchronize();
        const app = express();
        app.use(cors(corsOptions));
        app.use(json());

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.get('/', (req: Request, res: Response) => {
            res.send({
                msg: 'Hello, World!'
            });
        });

        app.use('*', cors(corsOptions));
        //set Router
        app.use('/api', BaseRouter);
        app.get('*', (req: Request, res: Response) => {
            res.status(404).send({ error: 'Not Found' });
        });

        app.listen(config.port, (): void => {
            console.log('Crosstoria Engine is Listening...');
        });
    })
    .catch(error => console.log(error));
