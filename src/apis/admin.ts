import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import { Users } from '../entity/Users';

const router = Router();

router.get('userList', (res: Response, req: Request) => {
  if (!req.session?.isAdmin) {
    res.status(403).send({
      error: 'can access only admin',
    });
    return;
  }
  const data = getConnection()
  .createQueryBuilder()
  .select('email')
  .from(Users, 'users');
  res.status(20).send({ data });
});
export default router;
