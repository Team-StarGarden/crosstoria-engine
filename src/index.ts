import express, {json, Request, Response} from 'express';
import BaseRouter from './routers';

const app = express();

app.use(json());

app.get('/', (req: Request, res: Response) => {
  res.send({
    msg: 'Hello, World!',
  });
});

//set Router
app.use("/api", BaseRouter);
app.get("*", (req: Request, res: Response) => {
  res.status(404).send({ error: "Not Found" });
});

app.listen(3000, () => {
  console.log('Crosstoria Engine is Listening...');
});
