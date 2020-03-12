import { Router } from 'express';
import { UserRouter } from './users';
import AdminRouter from './Admin';

// Init router and path
const router = Router();

// Add routes
router.use('/users', UserRouter);
router.use('/admin',AdminRouter)
// Export the base-router
export default router;