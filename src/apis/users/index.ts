import { Router } from 'express';
import { register, availableID, setPassphrase, authorize } from './user.ctrl';

export let UserRouter = Router();

UserRouter.post('/register', register);
UserRouter.post('/availableID', availableID);
UserRouter.post('/setPassphrase', setPassphrase);
UserRouter.post('/authorize', authorize);
