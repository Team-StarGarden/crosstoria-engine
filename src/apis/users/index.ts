import { Router } from 'express';
import { authorize, availableID, register, setPassphrase } from './user.ctrl';

export const UserRouter = Router();

UserRouter.post('/register', register);
UserRouter.post('/availableID', availableID);
UserRouter.post('/setPassphrase', setPassphrase);
UserRouter.post('/authorize', authorize);
