import express, {json, Request, Response} from 'express';

const app = express();

app.use(json());

app.get('/', (req: Request, res: Response) => {
  res.send({
    msg: 'Hello, World!',
  });
});

app.listen(3000, () => {
  console.log('Crosstoria Engine is Listening...');
});
