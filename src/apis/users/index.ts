import { Router } from 'express';
import { authorize, availableID, register, setPassphrase, unAuthorize, update, userInfo } from './user.ctrl';

export const UserRouter = Router();

UserRouter.post('/register', register);
UserRouter.post('/availableID', availableID);
UserRouter.post('/setPassphrase', setPassphrase);
UserRouter.post('/authorize', authorize);
UserRouter.post('/update', update);
UserRouter.get('/unauthorize', unAuthorize);
UserRouter.get('/userInfo', userInfo);
