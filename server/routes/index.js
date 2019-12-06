import express from 'express';
import applicationRoute from './applicationRoute';
import userRoute from './userRoute';
import identityRoute from './identityRoute';

const router = express.Router();

router.use('/api/v1', applicationRoute);
router.use('/api/v1', userRoute);
router.use('/api/v1', identityRoute);

export default router;