import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { Users } from '../../entity/Users';
import { insertUser } from './user.func';
import { validate as validateEmail } from '../../util/EmailChecker';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { body: data } = req;
  if ('userName' in data && 'email' in data && 'age' in data) {
    try {
      //check for email form
      if (!validateEmail(data.email)) {
        throw new Error('BAD_REQUEST');
      }
      //check for age
      if (
        !Number.isInteger(data.age) ||
        data.age < 1 ||
        data.age > 2 * 100000 * 10000
      ) {
        throw new Error('BAD_REQUEST');
      }
      await insertUser(data);
      res.status(200).send({
        result: 'success',
      });
      // TODO: send Password initializing E-mail
    } catch (error) {
      if (error.message === 'ER_DUP_ENTRY' || error.code === 'ER_DUP_ENTRY') {
        res.status(409).send({
          error: 'ER_DUP_ENTRY',
        });
      } else if (error.message === 'BAD_REQUEST') {
        res.status(400).send({
          error: 'BAD_REQUEST',
        });
      } else {
        res.status(451).send({
          error: 'invalid',
        });
      }
    }
  } else {
    res.status(400).send({
      error: 'invalid_request',
    });
  }
};

export const availableID = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;
  const idCount = await getConnection()
  .createQueryBuilder()
  .select('email')
  .from(Users, 'users')
  .where('users.email = :Id', { Id: id })
  .getCount();
  res.status(200).send({
    result: idCount === 0 ? 'valid' : 'unavailable',
  });
};

export const setPassphrase = (req: Request, res: Response): void => {
  res.status(401).send({
    error: 'Not Defined',
  });
};

export const authorize = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  const count = await getConnection()
  .createQueryBuilder()
  .select('email')
  .from(Users, 'users')
  .where('users.email = :email AND users.passphrase = :PassPhrase', {
    email: email,
    PassPhrase: null,
  })
  .getCount();
  if (count !== 0) {
    res.status(200).send({
      result: 'failed',
    });
  } else {
    res.status(200).send({
      result: 'success',
    });
  }
};
