import {Request, Response, Router} from 'express';
import {getConnection} from 'typeorm';
import {Users} from '../entity/Users';

// Init shared
const router = Router();

function filter(str: string): string {
  return str
    .split("'")
    .join('')
    .split("/'")
    .join('')
    .split("'/")
    .join('');
}
router.get('/availableID', async (req: Request, res: Response) => {
  let idCount = 1;
  if ('id' in req.body) {
    const ID = filter(req.body.id);

    idCount = await getConnection()
      .createQueryBuilder()
      .select('email')
      .from(Users, 'users')
      .where('users.email = :Id', {Id: ID})
      .getCount();
  }
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

router.get('/sign-out', (req: Request, res: Response) => {
  delete req.session!.user;
  delete req.session!.email;
  delete req.session!.userState;
  delete req.session!.isAdmin;
  res.status(200).send(null);
});

router.get('/userInfo', async (req: Request, res: Response) => {
  if ('email' in req.body) {
    const item = await getConnection()
      .createQueryBuilder()
      .select('*')
      .from(Users, 'users')
      .where('users.email = :Email', {Email: filter(req.body.email)})
      .getRawOne();
    if (!item) {
      res.status(404).send({error: 'NotFound'});
    } else {
      res.status(200).send({
        email: item.email,
        name: item.userName,
        age: item.name,
        gender: item.openGender || req.session!.email == item.email ? item.gender : null,
        state: item.state,
        pendingDate: item.pendingDate,
      });
    }
  }
});

router.post('/authorize', async (req: Request, res: Response) => {
  let item = null;
  if ('email' in req.body && 'pwd' in req.body) {
    const email = filter(req.body.email);
    const pwd = filter(req.body.pwd);
    item = await getConnection()
      .createQueryBuilder()
      .select('*')
      .from(Users, 'users')
      .where('users.email = :Email and users.passpharse = :Passpharse', {
        Email: email,
        Passpharse: pwd,
      })
      .getRawOne();
  }
  if (!item) {
    res.status(401).send({
      result: 'failed',
    });
  } else {
    req.session!.email = item.email;
    req.session!.user = item.userName;
    req.session!.userState = item.userState;
    req.session!.isAdmin = false;
    res.status(200).send({
      result: 'success',
    });
  }
});

router.post('/register', async (req: Request, res: Response) => {
  const data = req.body;
  if ('userName' in data && 'email' in data && 'age' in data) {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values({
          email: filter(data.email),
          age: parseInt(data.age),
          userName: filter(data.userName),
          userState: 'outstanding Authozation',
          gender: 'unSelected',
        })
        .execute();
      res.status(200).send({
        result: 'excuted',
      });
      // TODO: send Password initializing E-mail
    } catch (error) {
      if (error.code == 'ER_DUP_ENTRY') {
        res.status(409).send({
          error: 'ER_DUP_ENTRY',
        });
      } else {
        res.status(400).send({
          error: 'invalid',
        });
      }
    }
  } else {
    res.status(400).send({
      error: 'invalid_request',
    });
  }
});

router.post('/setPassword', (req: Request, res: Response) => {
  if ('email' in req.session! && 'users' in req.session!) {
    if ('newpwd' in req.body) {
      res.status(404).send({error: 'Not defined'});
    } else {
      res.status(401).send({error: 'unvailable'});
    }
  } else {
    res.status(403).send({
      error: 'Unauthorized',
    });
  }
});

router.post('/update', async (req: Request, res: Response) => {
  const data = req.body;
  if ('age' in data && 'gender' in data && 'userName' in data) {
    try {
      console.log(req.session!.user);
      console.log(req.session!.email);
      await getConnection()
        .createQueryBuilder()
        .update(Users)
        .set({
          age: data.age,
          gender: data.gender,
          userName: data.userName,
        })
        .where('email = :Email and userName = :uName', {
          Email: req.session!.email,
          uName: req.session!.user,
        })
        .execute();
      req.session!.user = data.userName;
      res.status(200).send({
        result: 'Updated',
      });
    } catch (error) {
      res.status(403).send({
        error: 'error',
      });
    }
  } else {
    res.status(403).send({
      error: 'Unauthorized',
    });
  }
});

export default router;
