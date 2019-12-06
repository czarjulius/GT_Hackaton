import express from 'express';
import identityController from '../controllers/identityController';
import upload from '../multer/config';

const router = express.Router();
const uploadArray = [
    {name:'passport', maxCount:1},
    {name:'signature', maxCount:1}
]
router.post('/identity', upload.fields(uploadArray),  identityController.postIdentity);
router.get('/identity', identityController.getAllIdentity);
router.get('/identity/:id', identityController.getSingleId);

export default router;