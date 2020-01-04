import express, {json, Request, Response} from 'express';
import {config} from './config';

const app = express();

app.use(json());

app.get('/', (req: Request, res: Response) => {
  res.send({
    msg: 'Hello, World!',
  });
});

app.listen(config.port, (): void => {
  console.log('Crosstoria Engine is Listening...');
});
