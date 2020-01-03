import { Router, Response, Request} from 'express';
import UserRouter from './Users'
// Init router and path
const router = Router();

// Add routes
router.use('/users', UserRouter);

// Export the base-router
export default router;
