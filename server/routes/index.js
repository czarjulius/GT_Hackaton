import express from 'express';
import applicationRoute from './applicationRoute';
import userRoute from './userRoute';
import identityRoute from './identityRoute';
import templateRoute from './templateRoute';

const router = express.Router();

router.use('/api/v1', applicationRoute);
router.use('/api/v1', userRoute);
router.use('/api/v1', identityRoute);
router.use('/api/v1', templateRoute);

export default router;