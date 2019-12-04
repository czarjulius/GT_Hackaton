import express from 'express';
import applicationRoute from './applicationRoute';

const router = express.Router();

router.use('/api/v1', applicationRoute);

export default router;