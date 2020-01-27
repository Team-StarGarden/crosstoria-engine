import {Request, Response, Router} from 'express';
import {getConnection} from 'typeorm';
import {Users} from '../entity/Users';

// Init shared
const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  let data = req.body;
  console.log(data);
  if ('userName' in data && 'email' in data && 'age' in data) {
    try {
      await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values({
        email: data.email,
        age: data.age,
        userName: data.userName,
        userState: 'outstanding Authozation',
        gender: 'unSelected',
      })
      .execute();
      res.status(401).send({
        result: 'success',
      });
      // TODO: send Password initializing E-mail
    } catch (error) {
      if (error.code == 'ER_DUP_ENTRY') {
        res.status(401).send({
          error: 'ER_DUP_ENTRY',
        });
      } else {
        res.status(451).send({
          error: 'invalid',
        });
      }
    }
  } else {
    res.status(401).send({
      error: 'invalid_request',
    });
  }
});

router.get('/availableID', async (req: Request, res: Response) => {
  let ID = req.body.id;
  let idCount = await getConnection()
  .createQueryBuilder()
  .select('email')
  .from(Users, 'users')
  .where('users.email = :Id', {Id: ID})
  .getCount();
  res.status(200).send(
    idCount == 0
      ? {
        result: 'valid',
      }
      : {
        result: 'unavailable',
      },
  );
});

router.post('/setPassword', async (req: Request, res: Response) => {
  res.status(401).send({
    error: 'Not Defined',
  });
});

router.post('/authorize', async (req: Request, res: Response) => {
  let email = req.body.email;
  let password = req.body.pwd;
  let count = await getConnection()
  .createQueryBuilder()
  .select('email')
  .from(Users, 'users')
  .where('users.email = :email AND users.passphrase = :PassPhrase', {
    email: email,
    PassPhrase: null,
  })
  .getCount();
  if (count != 0) {
    res.status(200).send({
      result: 'failed',
    });
  } else {
    res.status(200).send({
      result: 'success',
    });
  }
});

export default router;
