import express, {json, Request, Response} from 'express';
import BaseRouter from './routers';
import {config} from './config';
import session from 'express-session';
import cors from 'cors';
import {createConnection} from 'typeorm';
import 'reflect-metadata';

const cornsOptions: cors.CorsOptions = {
  credentials: true,
  origin: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  maxAge: 3600,
};

export const connection = createConnection()
  .then(async connection => {
    connection.synchronize();
    const app = express();
    app.use(cors(cornsOptions));
    app.use(json());
    app.use(
      session({
        secret: '@#!$^@$crosstoria#@$#$',
        resave: false,
        saveUninitialized: true,
      }),
    );
    app.get('/', (req: Request, res: Response) => {
      res.send({
        msg: 'Hello, World!',
      });
    });

    app.use('*', cors(cornsOptions));
    //set Router
    app.use('/api', BaseRouter);
    app.get('*', (req: Request, res: Response) => {
      res.status(404).send({error: 'Not Found'});
    });

    app.listen(config.port, (): void => {
      console.log('Crosstoria Engine is Listening...');
    });
  })
  .catch(error => console.log(error));
